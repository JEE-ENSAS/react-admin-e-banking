import React, { Suspense, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { CContainer, CSpinner } from "@coreui/react";

import routes from "../routes";
import PrivateRoute from "src/helpers/PrivateRoute";
import { useDispatch } from "react-redux";
import { fetchAllUsers } from "src/actions/userActions";

const AppContent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, []);

  return (
    <CContainer lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Switch>
          {routes.map((route, idx) => {
            return !route.private ? (
              <Route
                key={idx}
                path={route.path}
                exact={route.exact}
                name={route.name}
                render={(props) => (
                  <>
                    <route.component {...props} />
                  </>
                )}
              />
            ) : (
              <PrivateRoute
                exact={route.exact}
                name={route.name}
                path={route.path}
                key={idx}
              >
                <route.component />
              </PrivateRoute>
            );
          })}

          <Redirect from="/" to="/dashboard" />
        </Switch>
      </Suspense>
    </CContainer>
  );
};

export default React.memo(AppContent);
