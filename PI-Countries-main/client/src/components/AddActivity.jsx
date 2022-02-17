import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCountries, postActivity } from "../actions/creator";
import "../css/AddActivity.css";

function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "Name is required";
  }
  if (parseInt(input.duration) === 0 || input.duration === "") {
    errors.duration = "Select the duration to your activity";
  }
  if (!input.dificult || input.dificult === "0") {
    errors.dificult = "Select a dificult for your activity!";
  }
  if (!input.season || input.season === 'Season') {
    errors.season = "Season is required for your activity (summer, winter...)";
  }
  if (input.countries.length === 0) {
    errors.countries = "Select one or more countries";
  }
  return errors;
}

export default function AddActivity() {
  const dispatch = useDispatch();
  const history = useHistory();
  const countries = useSelector((state) => state.countries);

  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    dificult: "",
    duration: "",
    season: "",
    countries: [],
  });

  useEffect(() => {
    //Trae todas los paises al montar el componente para ya poder usarlos en el select
    dispatch(getCountries());
  }, [dispatch]);

  useEffect(() => {
    setErrors(validate(input));
  }, []);

  function handleChange(e) {
    setInput((prevData) => {
      const state = {
        ...prevData,
        [e.target.name]: e.target.value,
      };

      const validations = validate(state);
      setErrors(validations);

      return state;
    });
  }

  function handleSelectSeason(e) {
    setInput({
      ...input,
      season: e.target.value,
    });

    setErrors(
      validate({
        ...input,
        season: e.target.value,
      })
    );
  }

  function handleSelectCountries(e) {
    setInput({
      ...input,
      countries: [...input.countries, e.target.value],
    });

    setErrors(
      validate({
        ...input,
        countries: [...input.countries, e.target.value],
      })
    );
  }

  function handleDelete(c) {
    setInput({
      ...input,
      countries: input.countries.filter((country) => country !== c),
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if(Object.values(errors).length > 0){
      alert('Fill in the information to create the activity')
    }else{

      dispatch(postActivity(input));
      alert("Activity created!");
      
      setInput({
        name: "",
        dificult: "",
        duration: "",
        season: "",
        countries: [],
      });
      
      history.push("/countries"); //una vez creada la activity me redirige al home
    }
  }

  return (
    <div className="containerForm">
      <form onSubmit={(e) => handleSubmit(e)} className="form">
        <h1 className="title">Create Activity</h1>

        <div className="div">
          <label>Name:</label>
          <input
            type="text"
            value={input.name}
            name="name"
            placeholder="Activity name"
            onChange={(e) => handleChange(e)}
            className="inputSearch"
          />

          {/* {errors.name && <p className="errors">{errors.name}</p>} */}
        </div>

        <div className="div">
          <label>Duration:</label>
          <input
            type="text"
            value={input.duration}
            name="duration"
            placeholder="10 days, 1 Week, 3 months"
            onChange={(e) => handleChange(e)}
            className="inputSearch"
          />

          {/* {errors.duration && <p className="errors">{errors.duration}</p>} */}
        </div>

        <div className="div">
          <label>Difficulty:</label>
          <input
            type="number"
            min="1"
            max="5"
            value={input.dificult}
            name="dificult"
            placeholder="1 to 5"
            onChange={(e) => handleChange(e)}
            className="inputSearch"
          />

          {/* {errors.dificult && <p className="errors">{errors.dificult}</p>} */}
        </div>

        <div className="div">
          <label>Season:</label>
          <select
            onClick={(e) => handleSelectSeason(e)}
          >
            <option className="defaultValue">Season</option>
            <option name="season" value="winter">
              Winter
            </option>
            <option name="season" value="autumn">
              Autumn
            </option>
            <option name="season" value="spring">
              Spring
            </option>
            <option name="season" value="summer">
              Summer
            </option>
          </select>
        </div>
        {/* {errors.season && <p className="errors">{errors.season}</p>} */}

        <div className="div">
          <label>Country:</label>
          <select
            onChange={(e) => handleSelectCountries(e)}
          >
            <option className="defaultValue">Please Choose...</option>
            {countries.map((c) => {
              return (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              );
            })}
          </select>

          <div>
            {input.countries.map((c) => {
              return (
                <div key={c} className='arrayCountries'>
                  <h4>{c}</h4>
                  <button onClick={() => handleDelete(c)} className='buttonDelete'>Delete Country</button>
                </div>
              );
            })}
          </div>

          {/* {errors.countries && <p className="errors">{errors.countries}</p>} */}
        </div>

            <button type="submit" className="buttonSubmit"> Create</button>
      </form>
    </div>
  );
}
