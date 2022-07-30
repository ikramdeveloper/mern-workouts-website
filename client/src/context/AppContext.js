import { createContext, useReducer, useState } from "react";

export const AppContext = createContext();

const filteredWorkouts = (workouts, id) =>
  workouts.filter((item) => item._id !== id);

const workoutsReducer = (state, action) => {
  switch (action.type) {
    case "SET_WORKOUTS":
      return {
        workouts: action.payload,
      };

    case "CREATE_WORKOUT":
      return {
        workouts: [action.payload, ...state.workouts],
      };

    case "UPDATE_WORKOUT":
      return {
        workouts: [
          ...filteredWorkouts(state.workouts, action.payload._id),
          action.payload,
        ],
      };

    case "DELETE_WORKOUT":
      return {
        workouts: filteredWorkouts(state.workouts, action.payload),
      };

    default:
      return state;
  }
};

const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutsReducer, {
    workouts: null,
  });
  //   const [isUpdating, setIsUpdating] = useState(false);
  const [updateWorkout, setUpdateWorkout] = useState(null);

  return (
    <AppContext.Provider
      value={{ ...state, dispatch, updateWorkout, setUpdateWorkout }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
