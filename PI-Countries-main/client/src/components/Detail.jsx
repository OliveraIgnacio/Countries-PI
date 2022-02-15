import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCountryByID } from "../actions/creator";
import "../css/Detail.css";

function Detail(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCountryByID(props.match.params.id));
  }, [dispatch]);

  const detail = useSelector((state) => state.detail);
  const activityClass = detail[0]?.Activities.length === 0 ? 'errorActivity' : 'gridInferior'
  return (
    <div className="container">
      {detail.length > 0 ? (
        <div className="cardDetail">
          <div>
            <div className="flexSuperior">
              <img src={detail[0].flag} alt="flag" />

              <div className="countryDetail">
                <h2>{detail[0].name}</h2>
                <br />
                <h3>{detail[0].id}</h3>
                <br />
                <h4>Continent: {detail[0].continent}</h4>
                <h4>Capital: {detail[0].capital}</h4>
                <h4>Subregion: {detail[0].subregion}</h4>
                <h4>Area: {detail[0].area} km2</h4>
                <h4>Population: {detail[0].population}</h4>
              </div>
            </div>

            <br />

            <div>
              <h3
                style={{
                  color: "white",
                  justifyContent: "left",
                  marginLeft: "15px",
                }}
              >
                Activities:{" "}
              </h3>
              <br />
              <div className={activityClass}>
                {detail[0].Activities.length === 0 ? (
                  <h4>Dont have any activity created</h4>
                  ) : (
                    detail[0].Activities.map((a) => (
                      <div key={a.id} className="cardActivity">
                      <br />
                      <h4>{a.name}</h4>
                      <h5>Dificult: {a.dificult}</h5>
                      <h5>Duration: {a.duration}</h5>
                      <h5>Season: {a.season}</h5>
                    </div>
                  ))
                  )}
              </div>
            </div>
          </div>

          <div>
            <Link to="/countries">
              <button className="buttonBack">Back</button>
            </Link>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Detail;
