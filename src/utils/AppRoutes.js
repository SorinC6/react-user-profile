import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../components/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import UserProfile from "../components/UserProfile";
import EditProfile from "../components/editProfile/EditProfile";
// import PrivateRoute from "./PrivateRoute";

export const AppRoutes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/profile" component={UserProfile} />
      <Route path="/edit" component={EditProfile} />
    </Switch>
  );
};

export default AppRoutes;
