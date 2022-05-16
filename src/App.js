import React, { useContext, Suspense } from "react";
import AuthContext from "./store/auth-context";
import Header from "./components/Navigation/Header";
import LandingPage from "./components/Landing Page/LandingPage";
import Login from "./components/Auth/Login/Login";
import ForgotPassword from "./components/Auth/ForgotPassword/ForgotPassword";
import ResetPassword from "./components/Auth/ResetPassword/ResetPassword";
import { Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LoadingSpinner from "./components/UI/LoadingSpinner";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const RequestLeave = React.lazy(() =>
  import("./components/Users/RequestLeave")
);

const Users = React.lazy(() => import("./components/Users/Users"));
const Manager = React.lazy(() => import("./components/Manager/Manager"));
const Admin = React.lazy(() => import("./components/Admin/Admin"));

function App() {
  const authCtx = useContext(AuthContext);

  const user = localStorage.getItem("user");

  return (
    <>
      <Header />
      <div className="wrapper">
        <Suspense fallback={<LoadingSpinner />}>
          <Switch>
            <Route path="/" exact>
              <LandingPage />
            </Route>
            {authCtx.isLoggedIn && user === "user" && (
              <Route path="/leaverequest">
                <RequestLeave />
              </Route>
            )}
            {authCtx.isLoggedIn && user === "user" && (
              <Route path="/profile">
                <Users />
              </Route>
            )}
            {authCtx.isLoggedIn && user === "admin" && (
              <Route path="/admin">
                <Admin />
              </Route>
            )}
            {authCtx.isLoggedIn && user === "manager" && (
              <Route path="/manager">
                <Manager />
              </Route>
            )}
            <Route path="/login">
              {!authCtx.isLoggedIn ? <Login /> : <Redirect to="/" />}
            </Route>
            {!authCtx.isLoggedIn && (
              <Route path="/forgotpassword">
                <ForgotPassword />
              </Route>
            )}
            {!authCtx.isLoggedIn && (
              <Route path="/resetpassword/:token" exact>
                <ResetPassword />
              </Route>
            )}
            <Route path="*">
              <Redirect to="/" />
            </Route>
          </Switch>
          <ToastContainer autoClose={3000} />
        </Suspense>
      </div>
    </>
  );
}

export default App;
