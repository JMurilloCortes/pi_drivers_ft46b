import React, { useState, useEffect } from "react";
import SearchBar from "../searchbar/SearchBar";
import Cards from "../cards/Cards";
import Footer from "../footer/Footer";
import Loading from "../loading/Loading";
import styles from "./Home.module.css";

function Home() {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <>
          <SearchBar setDrivers={setDrivers} />
          <Cards drivers={drivers} setDrivers={setDrivers} setLoading={setLoading} loading={loading}/>
          <Footer />
        </>
      )}
    </div>
  );
}

export default Home;