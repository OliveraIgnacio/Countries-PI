import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {getCountryByName} from '../actions/creator'
import '../css/SearchBar.css'

function SearchBar() {
    const dispatch = useDispatch();
    const[value, setValue] = useState('');

    function handleChange(e){
        e.preventDefault();
        setValue(e.target.value)
    }
    
    function handleSubmit(e){
        e.preventDefault();
        dispatch(getCountryByName(value))
        setValue('');
    }

    return (
        <div className='ContainerSearch'>
            <input 
                value={value}
                type='text' 
                placeholder='Search country...'
                onChange={(e)=> handleChange(e)}
                className='InputSearch'
            />
            <button 
                type='submit'
                onClick={(e)=> handleSubmit(e)}
                className='InputSubmit'
                >Search</button>
        </div>
    )
}

export default SearchBar