const { Router } = require('express');
const axios = require('axios');
const { Country, Activity } = require ('../db');


const router = Router();

// Configurar los routers

//Funcion para requerir toda la informacion desde la API:
const getApiInfo = async () => {
    const apiUrl = await axios.get('https://restcountries.com/v3/all')
    const apiInfo = await apiUrl.data.map( e =>{  
            return{
               id: e.cca3,
               name: e.name.common,
               flag: e.flags[1],
               continent: e.region,
               capital: e.capital ? e.capital[0] : "Not found",
               subregion: e.subregion ? e.subregion : "Not found",
               area: e.area ? e.area : "Not found",
               population: e.population ? e.population : "Not found"
            }
    })
    const create = await apiInfo.forEach((e) => {
      if (e) {
        Country.findOrCreate({
          where: {
              id: e.id,
              name: e.name,
              flag: e.flag,
              continent: e.continent,
              capital: e.capital,
              subregion: e.subregion,
              area: e.area,
              population: e.population
          },
        });
      }
    });
    return apiInfo;
}

//Funcion para requerir toda la informcion desde la base de datos:
const getDbInfo = async () => {
    return await Country.findAll({
        include:{
            model: Activity,
            atributes: ['name', 'dificult', 'duration', 'season'],
            through:{
                atributes: [],
            }
        } 
    })
}


//Route Countries & Countries?name:
router.get('/countries', async (req, res) =>{
    const name = req.query.name;
    let countriesAll = await getDbInfo();
    if(name){
        let country = await countriesAll.filter( c => c.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()));
        country.length ?
        res.status(200).send(country) :
        res.status(404).send('Country not found')
    }
    else{
        res.status(200).send(countriesAll);
    }
})


router.get('/countries/:id', async (req, res) =>{
    const id = req.params.id;
    const countriesAll = await getDbInfo()
    if(id){
        let country = await countriesAll.filter(c => c.id.toLocaleLowerCase() === id.toLocaleLowerCase());
        country.length ?
        res.status(200).json(country) :
        res.status(404).send('Country not found by id')
    }
})

router.get('/activities', async (req, res) =>{
  try{
    const activities= await Activity.findAll({
      atributes:['id', 'name','dificult', 'duration', 'season'],
      include: Country
    })
    activities.length >0 ? 
    res.status(200).send(activities):
    res.status(200).send('Activities not found')
  }catch(error){
    res.status(404).send(error);
  }
})


router.post("/activity", async (req, res) => {
    const { name, dificult, duration, season, countries } = req.body;
    
    try{

      const newActivity = await Activity.create({
        name,
        dificult,
        duration,
        season
      });

      countries.forEach(async (c) => {
        const countryActivity = await Country.findOne({
          where:{
            name:c
          }
        })
        await newActivity.addCountry(countryActivity);
      });
      res.status(200).send("Activity created successfully");      
    } 
    
    catch(error){
      res.status(404).send(error);
    }    
});
  



module.exports = {
  router,
  getApiInfo,
  getDbInfo
};
