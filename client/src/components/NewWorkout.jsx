import { useState, useEffect } from "react";
import useAppContext from "../hooks/useAppContext";

const NewWorkout = () => {
  const initialState = { title: "", load: "", reps: "" };
  const { dispatch, updateWorkout } = useAppContext();

  const [workout, setWorkout] = useState(initialState);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (updateWorkout) setWorkout(updateWorkout);
  }, [updateWorkout]);

  const checkValidity = Object.values(workout)
    .slice(0, 3)
    .some((item) => !item);

  const handleChange = (e) => {
    const { name, value } = e.target;
    !value
      ? e.target.classList.add("error")
      : e.target.classList.remove("error");
    setWorkout({ ...workout, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (checkValidity) {
      setError("Please fill all the fields");
      return;
    }

    if (updateWorkout) {
      const response = await fetch(`/api/workouts/${workout._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(workout),
      });
      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
      }

      if (response.ok) {
        dispatch({ type: "UPDATE_WORKOUT", payload: workout });
        setError(null);
        setWorkout(initialState);
      }
      return;
    }

    const response = await fetch("/api/workouts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(workout),
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }

    if (response.ok) {
      dispatch({ type: "CREATE_WORKOUT", payload: json });
      setError(null);
      setWorkout(initialState);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>Add a New Workout</h3>

        <label htmlFor="title">Title: </label>
        <input
          type="text"
          id="title"
          name="title"
          value={workout.title}
          onChange={handleChange}
          //   className={!workout.title ? "error" : ""}
        />

        <label htmlFor="load">Load (in kg): </label>
        <input
          type="number"
          id="load"
          name="load"
          value={workout.load}
          onChange={handleChange}
          //   className={!workout.load ? "error" : ""}
        />

        <label htmlFor="reps">Reps: </label>
        <input
          type="number"
          id="reps"
          name="reps"
          value={workout.reps}
          onChange={handleChange}
          //   className={!workout.reps ? "error" : ""}
        />

        <button type="submit" /* disabled={checkValidity ? true : false} */>
          {updateWorkout ? "Update" : "Add"}
        </button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};
export default NewWorkout;
