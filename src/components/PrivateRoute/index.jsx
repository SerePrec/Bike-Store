import React, { useContext } from "react";
import { Route, Redirect } from "react-router";
import { UserContext } from "../../context/UserContext";

const PrivateRoute = ({ children, ...rest }) => {
  const { authUser } = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        authUser ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/myaccount",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
