const axios = require("axios");
const { Team } = require("../db");

const getAllTeams = async (req, res) => {
  try {
    const teamsFromDB = await Team.findAll();

    if (teamsFromDB.length > 0) {
      return res.json(teamsFromDB);
    } else {
      const response = await axios.get("http://localhost:5000/drivers");
      const apiDrivers = response.data;

      const uniqueTeams = new Set();

      apiDrivers.forEach((driver) => {
        if (driver.teams && typeof driver.teams === "string") {
          const teams = driver.teams.split(", ");
          teams.forEach((team) => uniqueTeams.add(team));
        }
      });

      const teamsArray = Array.from(uniqueTeams).sort();

      const createdTeams = await Team.bulkCreate(
        teamsArray.map((name) => ({ name }))
      );

      return res.json(createdTeams);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = getAllTeams;
