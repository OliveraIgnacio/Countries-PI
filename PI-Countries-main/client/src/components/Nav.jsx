import React from 'react'
import { NavLink } from 'react-router-dom';
import SearchBar from './SearchBar';
import '../css/Nav.css'

function Nav() {
  return (
    <nav className='Nav'>
      <NavLink to="/" className='ButtonNav'>
        Log Out
      </NavLink>
      <NavLink to="/countries" className='ButtonNav'>
        Home
      </NavLink>


      <NavLink to="/countries/AddActivity" className='ButtonNav'>
        Add Activity
      </NavLink>
      
      <SearchBar className='SearchBarNav'/>
    </nav>
  )
}

export default Nav


