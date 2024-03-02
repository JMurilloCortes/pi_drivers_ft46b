const axios = require("axios");
const { Driver, Team } = require("../db");
require("dotenv").config();
const URL = "http://localhost:5000/drivers/";
const imageDefault = "https://img.freepik.com/fotos-premium/retrato-piloto-f1-casco-piloto-formula-parado-pista-carreras-despues-competencia_777271-15995.jpg";

const getAllDrivers = async (req, res) => {
  try {
   
    const [apiResponse, dbDrivers] = await Promise.all([
      axios.get(URL),
      Driver.findAll({
        include: [
          {
            model: Team,
            attributes: ["name"],
            through: { attributes: [] },
          },
        ],
      }),
    ]);

    const apiDrivers = apiResponse.data.map((driver) => ({
      id: driver.id,
      forename: driver.name ? driver.name.forename : "Not specified",
      surname: driver.name ? driver.name.surname : "Not specified",
      description: driver.description || "Not contain a description",
      image: driver.image ? driver.image.url || imageDefault : imageDefault,
      nationality: driver.nationality || "Not specified",
      dob: driver.dob || "Not specified",
      teams: driver.teams ? driver.teams.split(", ").join(", ") : "Not contain teams",
      created: driver.created || false,
    }));

    const formattedDbDrivers = dbDrivers.map((driver) => ({
      id: driver.id,
      forename: driver.forename || "Not specified",
      surname: driver.surname || "Not specified",
      description: driver.description || "Not contain a description",
      image: driver.image || imageDefault,
      nationality: driver.nationality || "Not specified",
      dob: driver.dob || "Not specified",
      teams: driver.teams.map((temp) => temp.name).join(", "),
      created: driver.created,
    }));

    const combinedResults = [...formattedDbDrivers, ...apiDrivers];
    res.json(combinedResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al obtener los conductores.",
    });
  }
};

module.exports = getAllDrivers;