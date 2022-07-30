const mongoose = require("mongoose");

const Workout = require("../models/workout");

// get all workouts
const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find().sort({ createdAt: -1 });
    res.status(200).json(workouts);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// get single workout
const getSingleWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }

  try {
    const workout = await Workout.findById(id);
    if (!workout)
      return res
        .status(400)
        .json({ error: `No workout matched with ${id} id` });

    res.status(200).json(workout);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// create workout
const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body;
  // let emptyFields = [];

  // if (!title) emptyFields.push("title");
  // if (!reps) emptyFields.push("reps");
  // if (!load) emptyFields.push("load");

  // if (emptyFields.length > 0) {
  //   return res
  //     .status(400)
  //     .json({ error: "Please fill all the fields", emptyFields });
  // }

  try {
    const workout = await Workout.create({ title, load, reps });

    res.status(200).json(workout);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// update workout
const updateWorkout = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid id" });
  }

  try {
    const workout = await Workout.findOneAndUpdate(
      { _id: id },
      { $set: req.body }
    );
    if (!workout) {
      return res
        .status(404)
        .json({ error: `No workout matched with ${id} id` });
    }

    res.status(200).json(workout);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// delete workout
const deleteWorkout = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }

  try {
    const workout = await Workout.findOneAndDelete({ _id: id });
    if (!workout) {
      return res
        .status(404)
        .json({ error: `No workout matched with ${id} id` });
    }
    res.status(200).json(workout);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  getWorkouts,
  getSingleWorkout,
  createWorkout,
  updateWorkout,
  deleteWorkout,
};
