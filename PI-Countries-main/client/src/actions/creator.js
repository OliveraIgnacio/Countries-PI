import axios from 'axios';
import { GET_COUNTRIES, 
        FILTER_BY_CONTINENT, 
        FILTER_BY_SEASON, 
        ORDER_BY_NAME, 
        GET_COUNTRY_BY_NAME,
        ORDER_BY_POPULATION,
        GET_COUNTRY_BY_ID
    } from "./types";


//------------------------------------------------------------------------------------//
export function getCountries(){
    return async function(dispatch){
        const json = await axios.get("http://localhost:3001/countries");
        return dispatch({
            type: GET_COUNTRIES,
            payload: json.data
        })
    }
}

export function getCountryByName(name){
    return async function(dispatch){
        try{
            const json = await axios.get('http://localhost:3001/countries?name=' + name);
            return dispatch({
                type: GET_COUNTRY_BY_NAME,
                payload: json.data
            })
        }
        catch(error){
            console.log(error)
        }
    }
}

export function getCountryByID(id){
    return async function(dispatch){
        try{
            const json = await axios.get('http://localhost:3001/countries/' + id);
            return dispatch({
                type: GET_COUNTRY_BY_ID,
                payload: json.data
            })
        }catch(error){
            console.log(error)
        }
    }
}



export function postActivity(payload){
    return async function(dispatch){
        const json = await axios.post('http://localhost:3001/activity', payload);
        return json;
    }
}

//------------------------------------------------------------------------------------//


export function filterCountriesByContinent(payload){
    return {
        type: FILTER_BY_CONTINENT,
        payload
    }
}

export function filterActivityBySeason(){
    return {
        type: FILTER_BY_SEASON,
    }
}

export function orderByName(payload){
    return{
        type: ORDER_BY_NAME,
        payload
    }
}

export function orderByPopulation(payload){
    return{
        type: ORDER_BY_POPULATION,
        payload
    }
}