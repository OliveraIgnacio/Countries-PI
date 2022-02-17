import React from 'react'
import '../css/Home.css'
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCountries } from '../actions/creator'
import Card from './Card';
import Paginado from './Paginado';
import {filterCountriesByContinent, orderByName, orderByPopulation, filterActivityBySeason} from '../actions/creator'


const Home = () => {
  const dispatch = useDispatch();
  const allCountries = useSelector(state => state.countries)

  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage] = useState(10);
  const indexOfLastCountry = currentPage * countriesPerPage //6
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage //0
  const currentCountry = allCountries.slice(indexOfFirstCountry, indexOfLastCountry)
  const [render, setRender] = useState('') // genera un render al cambiar el state ''



  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber)
  }
  useEffect(()=>{
    dispatch(getCountries())
  }, [dispatch])

  

  //Filter & sort
  const handleFilterContinent= (e) =>{ 
    e.preventDefault()
    dispatch(filterCountriesByContinent(e.target.value))
    setCurrentPage(1)
  }

  const handleFilterSeason= (e) =>{ 
    e.preventDefault()
    dispatch(filterActivityBySeason())
    setCurrentPage(1)
  }
  
  const handleSort= (e) =>{ 
    e.preventDefault();
    dispatch(orderByName(e.target.value))
    setCurrentPage(1);
    setRender(`ordenado ${e.target.value}`)
  }
  
  const handleSortPopulation= (e) =>{ 
    e.preventDefault();
    dispatch(orderByPopulation(e.target.value))
    setCurrentPage(1);
    setRender(`ordenado ${e.target.value}`)
  }
  
  return (
    <div className='containerHome'>
      <div>
        <Paginado
          countriesPerPage={countriesPerPage}
          allCountries={allCountries.length}
          paginado={paginado}
        />
        <button onClick={() => dispatch(getCountries())} className='buttonClean'>Clean Filters</button>

        <select onChange={e => handleFilterContinent(e)} className='selectFilter'>
          <option value='default'>Filter by Continent</option>
          <option value='All'>All</option>
          <option value='Americas'>Americas</option>
          <option value='Europe'>Europe</option>
          <option value='Asia'>Asia</option>
          <option value='Africa'>Africa</option>
          <option value='Oceania'>Oceania</option>
        </select>

        <button onClick={handleFilterSeason} className='buttonClean'>Get Activities</button>

        <select onChange={e => handleSort(e)} className='selectFilter'>
          <option value='default'>Sort Alphabeth by</option>
          <option value='asc'>A - Z</option>
          <option value='desc'>Z - A</option>
        </select>

        <select onChange={e => handleSortPopulation(e)} className='selectFilter'>
          <option value='default'>Sort Population by</option>
          <option value='may'>Higher population</option>
          <option value='men'>Lower Population</option>
        </select>
        
      </div>
       
        
      <div className='cards'>

        { currentCountry.map ((c) => {
          return(
            <div key={c.id}>
            <Link style={{textDecoration:'none'}} to= {"/countries/" + c.id}>
            <Card
            flag = {c.flag}
            name = {c.name}
            continent= {c.continent}
            capital={c.capital}
            key = {c.id}
            />
            </Link>
            </div>) 
              
          })
        }      
      
      </div>



    </div>
  )
}



export default Home; 
