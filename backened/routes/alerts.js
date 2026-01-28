const express = require("express");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();

const dataPath = path.join(__dirname, "../data/alerts.json");

const readAlerts = () => {
  const data = fs.readFileSync(dataPath, "utf-8");
  return JSON.parse(data);
};

const writeAlerts = (alerts) => {
  fs.writeFileSync(dataPath, JSON.stringify(alerts, null, 2));
};


// Get request
router.get("/", (req, res) => {
  let alerts = readAlerts();

  const { country, status } = req.query;

  if (country) {
    alerts = alerts.filter(
      (a) => a.country.toLowerCase() === country.toLowerCase()
    );
  }

  if (status) {
    alerts = alerts.filter(
      (a) => a.status.toLowerCase() === status.toLowerCase()
    );
  }

  res.status(200).json(alerts);
});

// post request
router.post("/", (req, res) => {
  const { country, city, visaType } = req.body;

  if (!country || !city || !visaType) {
    return res.status(400).json({
      message: "country, city and visaType are required"
    });
  }

  const alerts = readAlerts();

  const newAlert = {
    id: uuidv4(),
    country,
    city,
    visaType,
    status: "Active",
    createdAt: new Date().toISOString()
  };

  alerts.push(newAlert);
  writeAlerts(alerts);

  res.status(201).json(newAlert);
});


// get by id

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const alerts = readAlerts();
  const alertIndex = alerts.findIndex((a) => a.id === id);

  if (alertIndex === -1) {
    return res.status(404).json({ message: "Alert not found" });
  }

  alerts[alertIndex].status = status || alerts[alertIndex].status;
  writeAlerts(alerts);

  res.status(200).json(alerts[alertIndex]);
});




router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const alerts = readAlerts();
  const filteredAlerts = alerts.filter((a) => a.id !== id);

  if (alerts.length === filteredAlerts.length) {
    return res.status(404).json({ message: "Alert not found" });
  }

  writeAlerts(filteredAlerts);
  res.status(204).send();
});


module.exports = router;
