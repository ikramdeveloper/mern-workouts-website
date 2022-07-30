import { useEffect } from "react";
import { WorkoutDetails, NewWorkout } from "../components";
import useAppContext from "../hooks/useAppContext";

const Home = () => {
  const { workouts, dispatch } = useAppContext();

  useEffect(() => {
    const getWorkouts = async () => {
      const response = await fetch("/api/workouts");
      const data = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: data });
      }
    };

    getWorkouts();
  }, [dispatch]);

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((item) => (
            <WorkoutDetails key={item._id} workout={item} />
          ))}
      </div>
      <NewWorkout />
    </div>
  );
};
export default Home;
