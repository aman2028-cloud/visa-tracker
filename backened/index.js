const express = require("express");
const cors = require("cors");
const alertRoutes = require("./routes/alerts");

const logger = require("./middleware/logger");
const eHandler = require("./utils/error");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(logger);

// test route
app.get("/", (req, res) => {
  res.json({ message: "Visa Alert API running" });
});

app.use("/alerts", alertRoutes);

app.use(eHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
