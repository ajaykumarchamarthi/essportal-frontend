import React, { useContext } from "react";
import AuthContext from "../../store/auth-context";
import { AiOutlineLogin } from "react-icons/ai";
import { AiOutlineLogout } from "react-icons/ai";
import { IoTicketOutline } from "react-icons/io5";
import { RiAdminLine } from "react-icons/ri";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { FaUserTie } from "react-icons/fa";
import { NavLink, Link } from "react-router-dom";
import classes from "./Mobile.module.css";

function Mobile({ isOpen, setIsOpen }) {
  const authCtx = useContext(AuthContext);
  const user = localStorage.getItem("user");
  return (
    <div className={classes.mobile}>
      <div onClick={() => setIsOpen(!isOpen)} className={classes.closeIcon}>
        <AiOutlineClose size={24} />
      </div>
      <div className={classes.mobileOption}>
        <ul className={classes.mobileOptions}>
          {authCtx.isLoggedIn && user === "user" && (
            <li className={classes.nav}>
              <NavLink
                to="/leaverequest"
                exact
                activeClassName={classes.active}
              >
                <div className={classes.navIcon}>
                  <IoTicketOutline size={30} />
                  <span>Leave Request</span>
                </div>
              </NavLink>
            </li>
          )}
          {authCtx.isLoggedIn && user === "user" && (
            <li className={classes.nav}>
              <NavLink to="/profile" activeClassName={classes.active}>
                <div className={classes.navIcon}>
                  <AiOutlineUser size={30} />
                  <span>Profile</span>
                </div>
              </NavLink>
            </li>
          )}
          {authCtx.isLoggedIn && user === "admin" && (
            <li className={classes.nav}>
              <NavLink to="/admin" activeClassName={classes.active}>
                <div className={classes.navIcon}>
                  <RiAdminLine size={30} />
                  <span>Admin</span>
                </div>
              </NavLink>
            </li>
          )}
          {authCtx.isLoggedIn && user === "manager" && (
            <li className={classes.nav}>
              <NavLink to="/manager" activeClassName={classes.active}>
                <div className={classes.navIcon}>
                  <FaUserTie size={30} />
                  <span>Manager</span>
                </div>
              </NavLink>
            </li>
          )}
          {!authCtx.isLoggedIn && (
            <li className={classes.nav}>
              <Link to="/login">
                <div className={classes.navIcon}>
                  <AiOutlineLogin size={30} />
                  <span>Login</span>
                </div>
              </Link>
            </li>
          )}
          {authCtx.isLoggedIn && (
            <li className={classes.nav} onClick={() => authCtx.logout()}>
              <div className={classes.navIcon}>
                <AiOutlineLogout size={30} />
                <span>Logout</span>
              </div>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Mobile;
