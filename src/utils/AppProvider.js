import React, { useReducer, createContext, useEffect } from "react";
// const FETCH_USER_DATA = "FETCH_USER_DATA";


const initialState = {

};

export const AppContext = createContext();

const reducer = (state, { type, payload }) => {

    default:
      return state;
  }
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);


  const value = { state, dispatch };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;
