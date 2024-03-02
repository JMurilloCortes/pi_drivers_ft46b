import React from "react";
import { Link } from "react-router-dom";
import styles from "./Card.module.css";

const Card = ({ driver }) => {
  return (
    <div className={styles.card}>
      <Link to={`/detail/${driver.id}`}>
        <img
          src={driver.image}
          alt={driver.forename}
        />
      </Link>
      <div>
      <h2>{driver.forename} {driver.surname}</h2>
      <p>
        <b>Teams:</b> {driver.teams}
      </p>
      </div>
    </div>
  );
};

export default Card;
