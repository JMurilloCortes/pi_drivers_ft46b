const { Driver, Team } = require("../db");

const createDriver = async (req, res) => {
  const { forename, surname, description, image, nationality, dob, created, teams } = req.body;

  try {
    if (!teams || !Array.isArray(teams) || teams.length === 0) {
      return res.status(400).json({ message: "Se debe proporcionar al menos un equipo para el conductor." });
    }

    const foundTeams = await Team.findAll({
      where: {
        name: teams,
      },
    });

    if (foundTeams.length !== teams.length) {
      return res.status(400).json({ message: "Uno o más equipos proporcionados no existen." });
    }

    const newDriver = await Driver.create({
      forename,
      surname,
      description,
      image,
      nationality,
      dob,
      created: true,
    });

    await newDriver.addTeams(foundTeams);

    return res.status(201).json({ message: "Conductor creado exitosamente." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al crear el conductor." });
  }
};

module.exports = createDriver;

