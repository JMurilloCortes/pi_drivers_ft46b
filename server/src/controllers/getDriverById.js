const axios = require("axios");
const { Driver, Team } = require("../db");
const { Op } = require("sequelize");
const imageDefault = "https://media.formula1.com/content/dam/fom-website/drivers/2023Drivers/leclerc.jpg.img.640.medium.jpg/1700585208331.jpg";

const isUUID = (str) => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(str);
};

const getDriverById = async (req, res) => {
  try {
    const { idDriver } = req.params;

    if (isUUID(idDriver)) {
      
      const dbDriver = await Driver.findOne({
        where: { id: idDriver },
        include: [{ model: Team, attributes: ["name"] }],
      });

      if (dbDriver) {
        
        const formattedDriver = {
          id: dbDriver.id,
          forename: dbDriver.forename,
          surname: dbDriver.surname,
          description: dbDriver.description || "No description available",
          image: dbDriver.image || imageDefault,
          nationality: dbDriver.nationality || "Not specified",
          dob: dbDriver.dob || "Not specified",
          teams: dbDriver.teams.map((team) => team.name).join(", ") || "No teams",
          created: dbDriver.created,
        };
        return res.json(formattedDriver);
      } else {
        
        return res.status(404).json({ message: "Conductor no encontrado." });
      }
    } else {
      
      const response = await axios.get(`http://localhost:5000/drivers/${idDriver}`);
      const apiDriver = response.data;

      
      const formattedDriver = {
        id: apiDriver.id, 
        forename: apiDriver.name.forename,
        surname: apiDriver.name.surname,
        description: apiDriver.description || "No description available",
        image: apiDriver.image.url || imageDefault,
        nationality: apiDriver.nationality || "Not specified",
        dob: apiDriver.dob || "Not specified",
        teams: apiDriver.teams || "No teams",
        created: apiDriver.created || false,
      };

      
      return res.json(formattedDriver);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener el detalle del conductor." });
  }
};

module.exports = getDriverById;