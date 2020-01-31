import React, { useReducer, createContext } from "react";
// const FETCH_USER_DATA = "FETCH_USER_DATA";
const SET_USER_SECURITY_QUESTIONS = "SET_USER_SECURITY_QUESTIONS";
const SET_USER_INFO = "SET_USER_INFO";

const initialState = {
  userInfo: null,
  userQuestions: null
};

export const AppContext = createContext();

const reducer = (state, { type, payload }) => {
  switch (type) {
    case SET_USER_INFO:
      return {
        ...state,
        userInfo: payload
      };
    case SET_USER_SECURITY_QUESTIONS:
      return {
        ...state,
        userQuestions: payload
      };
    default:
      return state;
  }
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // useEffect(() => {
  //   firebase.getCurrentUserName() &&
  //     firebase.getcurrentUserSecurityQuestions().then(val => {
  //       dispatch({ type: "SET_USER_SECURITY_QUESTIONS", payload: val });
  //     });
  //   firebase.getCurrentUserName() &&
  //     firebase.getUserInfo().then(val => {
  //       dispatch({ type: "SET_USER_INFO", payload: val });
  //     });
  // }, []);

  const value = { state, dispatch };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;
