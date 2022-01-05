import React from "react";
import { Redirect, Route } from "react-router-dom";


function PrivateRoute({ children, ...rest }) {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const auth = currentUser && currentUser.id? true : false; 
  console.log('auth' , auth)
  return (<Route {...rest} render={({ location }) => auth ? (children) : (<Redirect to={{ pathname: "/login", state: { from: location } }} />)} />);
}

export default PrivateRoute;

