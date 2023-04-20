import React, { createContext, useContext, useReducer } from 'react';

// Prepare the data layer
export const StateContext = createContext();

// Wrap our app and provide the data layer
export const StateProvider = ({ reducer, beginState, children }) => (
  <StateContext.Provider value={useReducer(reducer, beginState)}>
    {children}
  </StateContext.Provider>
);

// Pull information from the data layer
export const useStateValue = () => useContext(StateContext);
