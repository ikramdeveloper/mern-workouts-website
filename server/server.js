const express = require("express");
require("dotenv").config();

const connectDB = require("./config/db.config");
const workoutRouter = require("./routes/workout");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.use("/api/workouts", workoutRouter);

connectDB().then(() =>
  app.listen(PORT, console.log(`listening on port ${PORT}...`))
);
