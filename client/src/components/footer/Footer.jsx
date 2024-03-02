import React from 'react';
import styles from "./Footer.module.css";
import imageLinkedin from "../../utils/linkedin.svg";
import imageFacebook from "../../utils/facebook.svg";
import imageInstagram from "../../utils/instagram.svg";
import imageGithub from "../../utils/github.svg";

function Footer() {
  return (
    <div className={styles.container}>
      <div><b>© Copyright 2024 | Driver Spa | Design and development: Jerry Murillo</b></div>
      <div>
        <a href="https://www.linkedin.com/in/jerry-murillo/" target="_blank"><img className={styles.linkedin} src={imageLinkedin} alt="LinkedIn" /></a>
        <a href="https://www.facebook.com/jerry.murillo.9822" target="_blank"><img className={styles.facebook} src={imageFacebook} alt="Facebook" /></a>
        <a href="https://www.instagram.com/jerrymurilloc/" target="_blank"><img className={styles.instagram} src={imageInstagram} alt="Instagram" /></a>
        <a href="https://github.com/JMurilloCortes" target="_blank"><img className={styles.github} src={imageGithub} alt="Github" /></a>
      </div>
    </div>
  )
}

export default Footer;
