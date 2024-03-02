import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./Detail.module.css";

function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [driver, setDriver] = useState({});

  const URL = "http://localhost:3001/drivers";

  useEffect(() => {
    axios(`${URL}/${id}`)
      .then(({ data }) => {
        if (data.forename) {
          setDriver(data);
        } else {
          window.alert("No hay conductores con ese ID");
        }
      })
      .catch((error) => {
        console.error("Error al obtener los detalles del conductor:", error);
      });
  }, [id]);

  const truncateDescription = (description) => {
    if (description) {
      return description.length > 500
        ? `${description.slice(0, 500)}...`
        : description;
    }
    return "";
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.container}>
      <div onClick={handleBack} className={styles.buttonsDivs}>
        <b>Back</b>
      </div>

      <div>
        <div>
          <h1 className={styles.colorTittle}>Details of driver</h1>
        </div>
        <div className={styles.forma}>
          <div>
            <img src={driver.image} alt={driver.forename} />
          </div>
          <div className={styles.cajaTexto}>
            <h1>
              {driver.forename} {driver.surname}
            </h1>
            <p>
              <b>Id:</b> {driver.id}
            </p>
            <p>
              <b>Nationality:</b> {driver.nationality}
            </p>
            <p>
              <b>Birthdate:</b> {driver.dob}
            </p>
            <p>
              <b>Description:</b> {truncateDescription(driver.description)}
            </p>
            <p>
              <b>Teams:</b> {driver.teams}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
