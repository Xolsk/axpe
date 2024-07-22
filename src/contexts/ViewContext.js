import React, { createContext, useState, useContext } from "react";

const ViewContext = createContext();

// Create a provider component
export function ViewContextProvider({ children }) {
  const [favoriteCounter, setFavoriteCounter] = useState(0);

  const updateFavoriteCounter = (newNumber) => {
    setFavoriteCounter(newNumber);
  };

  return (
    <ViewContext.Provider value={{ favoriteCounter, updateFavoriteCounter }}>
      {children}
    </ViewContext.Provider>
  );
}

export const useViewContext = () => {
  const context = useContext(ViewContext);
  if (!context) {
    throw new Error("useViewContext must be used within a ViewContext");
  }
  return context;
};
