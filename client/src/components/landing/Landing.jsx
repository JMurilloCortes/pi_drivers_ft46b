import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import styles from "./Landing.module.css";
import img from "../../utils/logo.png";

function Landing() {
  return (
    <div className={styles.landingContainer}>
      <div className={styles.tittleLanding}>
        <h2>🏁 Learn about drivers F1 and their teams 🏁</h2>
      </div>
      <div>
        <Link to={"/home"}>
          <img src={img} alt="Logo" />
        </Link>
      </div>
    </div>
  );
}

export default Landing;