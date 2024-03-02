const express = require("express");
const router = express.Router();

const getAllDrivers = require("../controllers/getAllDrivers");
const getDriversByName = require("../controllers/getDriversByName");
const getDriverById = require("../controllers/getDriverById");
const createDriver = require("../controllers/createDriver");
const getAllTeams = require("../controllers/getAllTeams");

router.get("/drivers", getAllDrivers);

router.get("/drivers/name", getDriversByName);

router.get("/drivers/:idDriver", getDriverById);

router.post("/drivers", createDriver);

router.get("/teams", getAllTeams);

module.exports = router;
