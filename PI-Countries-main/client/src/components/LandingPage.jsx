import React from "react";
import { Link } from "react-router-dom";
import '../css/LandingPage.css'

function LandingPage() {
  return (
    <div className="Container">
        <h1 className="Title">Welcome</h1>
      <Link to='/countries' className="Div">
        <div className="Div">
        <button className="ButtonEnter">Log In</button>  
        </div>
      </Link>
    </div>
  );
}

export default LandingPage;
