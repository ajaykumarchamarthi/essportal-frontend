import React, { useEffect, useState } from "react";
import classes from "./Profile.module.css";
import Cookies from "js-cookie";
import axios from "axios";

function Profile() {
  const [currentUser, setCurrentUser] = useState({});
  const userId = localStorage.getItem("userId");

  const token = Cookies.get("jwt");

  useEffect(() => {
    const loadUsers = async () => {
      const response = await axios.get(
        "https://essportal-backend.herokuapp.com/api/v1/users/getAllUsers",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { data } = await response.data;
      const actualUser = data.users.filter((user) => user._id === userId);
      setCurrentUser(actualUser[0]);
    };

    loadUsers();
  }, [userId, token]);

  return (
    <div>
      <div className={classes.container}>
        <div className={classes.profile}>
          <h5>
            Name - {currentUser.firstName} {currentUser.lastName}
          </h5>
          <h5>Email - {currentUser.email}</h5>
          <h5>Role - {currentUser.role}</h5>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Profile);
