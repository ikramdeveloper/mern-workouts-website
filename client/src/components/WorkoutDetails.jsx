import { formatDistanceToNow } from "date-fns";
import useAppContext from "../hooks/useAppContext";

const WorkoutDetails = ({ workout }) => {
  const { dispatch, setUpdateWorkout } = useAppContext();

  const handleUpdate = async () => {
    setUpdateWorkout(workout);
  };

  const handleDelete = async () => {
    const response = await fetch(`/api/workouts/${workout._id}`, {
      method: "DELETE",
    });
    await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: workout._id });
    }
  };

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Reps: </strong>
        {workout.reps}
      </p>
      <p>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      <span onClick={handleDelete}>Delete</span>
      <span onClick={handleUpdate}>Update</span>
    </div>
  );
};
export default WorkoutDetails;
