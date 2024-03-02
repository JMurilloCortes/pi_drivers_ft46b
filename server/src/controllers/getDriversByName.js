const axios = require("axios");
const { Driver, Team } = require("../db");
const { Op } = require("sequelize");

const getDriversByName = async (req, res) => {
  const { name } = req.query;

  try {
    const response = await axios.get(`http://localhost:5000/drivers`);
    const apiDrivers = response.data.slice(0, 15);
    const filteredApiDrivers = apiDrivers
      .filter((driver) =>
        driver.name.forename.toLowerCase().includes(name.toLowerCase())
      )
      .map(({ id, name, description, image, nationality, dob, teams }) => ({
        id,
        forename: name.forename,
        surname: name.surname,
        description,
        image: image.url,
        nationality,
        dob,
        teams: teams ? teams.split(", ").join(", ") : [],
      }));

    const dbDrivers = await Driver.findAll({
      where: {
        forename: {
          [Op.iLike]: `%${name}%`,
        },
      },
      include: [
        {
          model: Team,
          attributes: ["name"],
          through: { attributes: [] },
        },
      ],
      limit: 15,
    });

    const formattedDbDrivers = dbDrivers.map((driver) => ({
      id: driver.id,
      forename: driver.forename,
      surname: driver.surname,
      description: driver.description,
      image: driver.image,
      nationality: driver.nationality,
      dob: driver.dob,
      teams: driver.teams
        ? driver.teams.map((team) => team.name).join(", ")
        : null, // Usar team.name en lugar de team.forename
      created: driver.created,
    }));

    let combinedResults = [];

    if (dbDrivers.length > 0) {
      combinedResults = [...formattedDbDrivers];
    }

    if (filteredApiDrivers.length > 0) {
      combinedResults = [...combinedResults, ...filteredApiDrivers];
    }

    if (combinedResults.length > 0) {
      return res.json(combinedResults);
    } else {
      return res
        .status(404)
        .json({
          message: "No se encontraron conductores con el nombre especificado.",
        });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al buscar conductores por nombre." });
  }
};

module.exports = getDriversByName;
