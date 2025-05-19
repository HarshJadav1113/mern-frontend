import React, { Suspense, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

// import Users from "./users/pages/Users";
// import Newplace from "./places/pages/Newplace";
// // import Userplaces from "../src/places/pages/Userplaces";
// import Updateplace from "./places/pages/Updateplace";
// import Auth from "./users/pages/Auth";
import Mainnavigation from "./shared/components/Navigation/Mainnavigation";
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hooks";
import LoadingSpinner from "./shared/components/UIComponents/LoadingSpinner";

const Users = React.lazy(() => import("./users/pages/Users"));
const Newplace = React.lazy(() => import("./places/pages/Newplace"));
const Userplaces = React.lazy(() => import("../src/places/pages/Userplaces"));
const Updateplace = React.lazy(() => import("./places/pages/Updateplace"));
const Auth = React.lazy(() => import("./users/pages/Auth"));

const App = () => {
  const { token, login, logout, userId } = useAuth();
  useEffect(() => {
    console.log("Current backend URL:", process.env.REACT_APP_BACKEND_URL);
  }, []);
  let routes;
  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places" exact>
          <Userplaces />
        </Route>
        <Route path="/places/new" exact>
          <Newplace />
        </Route>
        <Route path="/places/:placeId" exact>
          <Updateplace />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places" exact>
          <Userplaces />
        </Route>
        <Route path="/auth" exact>
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}>
      <Router>
        <Mainnavigation />
        <main>
          <Suspense
            fallback={
              <div className="center">
                <LoadingSpinner />
              </div>
            }>
            {routes}
          </Suspense>
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
