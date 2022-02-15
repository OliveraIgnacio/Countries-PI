import { GET_COUNTRIES, 
        FILTER_BY_CONTINENT, 
        ORDER_BY_NAME, 
        GET_COUNTRY_BY_NAME, 
        POST_ACTIVITY,
        ORDER_BY_POPULATION,
        GET_COUNTRY_BY_ID,
        FILTER_BY_SEASON

    } from "../actions/types";

const initialState = {
    countries: [], //variable q se modifica con los filter
    countriesAll: [], // varaiable constante
    countriesWithActivities: [],
    detail: []
};

function reducer(state= initialState, {type, payload}) {
    switch(type){
        case GET_COUNTRIES:
            return{
                ...state,
                countries: payload,
                countriesAll: payload
            }

        case GET_COUNTRY_BY_NAME:
            return{
                ...state,
                countries: payload
            }
        
        case GET_COUNTRY_BY_ID:
            return{
                ...state,
                detail: payload
            }
        

        case POST_ACTIVITY:
        return{
            ...state
        } 

        case FILTER_BY_CONTINENT:
            const allCountries = state.countriesAll
            {
                if(payload === 'default'){return{...state}}
            }
            const countriesFiltered = payload === 'All' ? allCountries : allCountries.filter(c => c.continent === payload)
            return{
                ...state,
                countries: countriesFiltered
            }


        case FILTER_BY_SEASON:
            console.log('chau')
            const filterByCountriesWhitActivities = state.countries.filter(c => c.Activities.length > 0) //Traigo solo los paises con actividades cargada
            console.log(filterByCountriesWhitActivities)
            
            return {
                ...state,
                countries: filterByCountriesWhitActivities
            }



        case ORDER_BY_NAME:
            {
                if(payload === 'default'){return{...state}}
            }
            let orderType = payload === 'asc' ?
                state.countries.sort(function (a,b) {
                    if(a.name > b.name){
                        return 1;
                    }
                    if(b.name > a.name) {
                        return -1;
                    }
                    return 0;
                }) :
                state.countries.sort(function (a,b) {
                    if(a.name > b.name){
                        return -1;
                    }
                    if(b.name > a.name) {
                        return 1;
                    }
                    return 0;
                })
            return{
                ...state,
                countries: orderType
            }
        
        
        case ORDER_BY_POPULATION:
            {
                if(payload === 'default'){return{...state}}
            }
            let order = payload === 'men' ?
                state.countries.sort(function (a,b) {
                    if(a.population > b.population){
                        return 1;
                    }
                    if(b.population > a.population) {
                        return -1;
                    }
                    return 0;
                }) :
                state.countries.sort(function (a,b) {
                    if(a.population > b.population){
                        return -1;
                    }
                    if(b.population > a.population) {
                        return 1;
                    }
                    return 0;
                })
            return{
                ...state,
                countries: order
            }
            
        default:
            return state;
    }
}

export default reducer;