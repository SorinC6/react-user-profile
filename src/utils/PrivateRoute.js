import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AppContext } from "./AppProvider";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const { state } = useContext(AppContext);
  console.log(state.test);
  return (
    <Route
      {...rest}
      render={routeProps =>
        !!state.test ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to={"/login"} />
        )
      }
    />
  );
};
