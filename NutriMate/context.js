import React, { createContext, useState } from "react";

// Create the context
export const MealsContext = createContext();

export const MealsProvider = ({ children }) => {
  // Shared state for all meals and user details
  const [allMeals, setAllMeals] = useState([]);
   const [favorites, setFavorites] = useState([]); 
  const [userDetails, setUserDetails] = useState({
    age: 0,
    gender: "",
    bmi: 0,
  });

  return (
    <MealsContext.Provider value={{ allMeals, setAllMeals, userDetails, setUserDetails, favorites, setFavorites  }}>
      {children}
    </MealsContext.Provider>
  );
};
