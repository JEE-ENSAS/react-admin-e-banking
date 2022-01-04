// import { Navigate } from "react-router-dom";
import React from "react";
import { Redirect, Route } from "react-router-dom";

// function PrivateRoute({ children, currentUser, authPages = false }) {
//   if (!authPages) {
//     return auth ? children : <Navigate to="/auth/login" />;
//   } else {
//     return auth ? <Navigate to="/" /> : children;
//   }
// }


function PrivateRoute({ children, ...rest }) {
  console.log(children, rest);
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const auth = !!(currentUser.token && currentUser.user);
  return (<Route {...rest} render={({ location }) => auth ? (children) : (<Redirect to={{ pathname: "/login", state: { from: location } }} />)} />);
}

export default PrivateRoute;
