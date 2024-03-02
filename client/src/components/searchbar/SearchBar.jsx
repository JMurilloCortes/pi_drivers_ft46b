import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./SearchBar.module.css";
import { Link } from "react-router-dom";
import img from "../../utils/logo.png";

const SearchBar = ({ setDrivers }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedOrigin, setSelectedOrigin] = useState("all");
  const [sortedBy, setSortedBy] = useState("");
  const [sortedAsc, setSortedAsc] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3001/teams")
      .then((response) => {
        setTeams(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener equipos:", error);
      });
  }, []);

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/drivers")
      .then((response) => {
        let filteredDrivers = response.data;

        if (searchTerm.trim() !== "") {
          filteredDrivers = filteredDrivers.filter(
            (driver) =>
              driver.forename &&
              driver.forename.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }

        if (selectedTeam !== "") {
          filteredDrivers = filteredDrivers.filter(
            (driver) =>
              driver.teams &&
              driver.teams.toLowerCase().includes(selectedTeam.toLowerCase())
          );
        }

        if (selectedOrigin === "api") {
          filteredDrivers = filteredDrivers.filter((driver) => !driver.created);
        } else if (selectedOrigin === "db") {
          filteredDrivers = filteredDrivers.filter((driver) => driver.created);
        }

        if (sortedBy) {
          filteredDrivers.sort((a, b) => {
            if (sortedBy === "name") {
              return sortedAsc
                ? (a.forename &&
                    b.forename &&
                    a.forename
                      .toLowerCase()
                      .localeCompare(b.forename.toLowerCase())) ||
                    0
                : (b.forename &&
                    a.forename &&
                    b.forename
                      .toLowerCase()
                      .localeCompare(a.forename.toLowerCase())) ||
                    0;
            } else if (sortedBy === "dob") {
              const dobA = new Date(a.dob);
              const dobB = new Date(b.dob);
              return sortedAsc ? dobA - dobB : dobB - dobA;
            }
            return 0;
          });
        }

        setDrivers(filteredDrivers);
      })
      .catch((error) => {
        console.error("Error al obtener datos de la API:", error);
      });
  }, [
    searchTerm,
    selectedTeam,
    selectedOrigin,
    sortedBy,
    sortedAsc,
    setDrivers,
  ]);

  return (
    <div className={styles.container}>
      <div>
        <Link to="/">
          <img src={img} alt="Logo" />
        </Link>
      </div>
      <div className={styles.searchField}>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <div className={styles.hoverClear} onClick={handleClearSearch}>
            ❌
          </div>
        )}
      </div>

      <select onChange={(e) => setSelectedTeam(e.target.value)}>
        <option value="">Select a team...</option>
        {teams.map((temp) => (
          <option key={temp.id} value={temp.name}>
            {temp.name}
          </option>
        ))}
      </select>
      <div>
        <label>
          <b>Origin:</b>
        </label>
        <select onChange={(e) => setSelectedOrigin(e.target.value)}>
          <option value="all">All</option>
          <option value="api">API</option>
          <option value="db">DB</option>
        </select>
      </div>

      <div>
        <label>
          <b>Order by:</b>
        </label>
        <select onChange={(e) => setSortedBy(e.target.value)}>
          <option value="">N/A</option>
          <option value="name">Name</option>
          <option value="dob">Birthdate</option> {/* Fixed typo here */}
        </select>
        <label>
          <b>Order:</b>
        </label>
        <select onChange={(e) => setSortedAsc(e.target.value === "asc")}>
          <option value="asc">Upward</option>
          <option value="desc">Falling</option>
        </select>
      </div>
      <Link to="/create" className={styles.links}>
        <div className={styles.buttonsDivs}>Create New</div>
      </Link>
    </div>
  );
};

export default SearchBar;
