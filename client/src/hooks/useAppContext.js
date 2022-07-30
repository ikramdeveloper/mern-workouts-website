import { useContext } from "react";

import { AppContext } from "../context/AppContext";

const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw Error("useAppContext hook must be used inside AppContextProvider");
  }
  return context;
};

export default useAppContext;
