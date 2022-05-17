import React, { useState, useEffect } from "react";
import axois from "axios";
import Profile from "./Profile/Profile";
import classes from "./Users.module.css";
import Cookies from "js-cookie";

function Users() {
  const [leavesList, setLeavesList] = useState([]);

  const user = localStorage.getItem("user");

  const userId = localStorage.getItem("userId");

  const token = Cookies.get("jwt");

  useEffect(() => {
    const getAllLeaves = async () => {
      const response = await axois.get(
        "https://essportal-backend.herokuapp.com/api/v1/leave/getAllLeaves",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { data } = await response.data;

      const filteredLeaves = data.Leaves.filter(
        (leave) => leave.user._id === userId
      );
      setLeavesList(filteredLeaves);
    };
    getAllLeaves();
  }, [userId, token]);

  return (
    <div className={classes.container}>
      <Profile />
      <div className={classes.leaveContainer}>
        {user === ("user" || "admin") &&
          leavesList.map((leave) => {
            return (
              <div className={classes.leaveList} key={leave._id}>
                <div className={classes.statusSection}>
                  <p>
                    Applied On -
                    {new Intl.DateTimeFormat("en-GB", {
                      year: "numeric",
                      month: "long",
                      day: "2-digit",
                    }).format(new Date(leave.appliedDate))}
                  </p>
                  <p>
                    Status -{" "}
                    <span className={classes + `.${leave.status}`}>
                      {leave.status}
                    </span>
                  </p>
                </div>
                <div className={classes.leaveInfo}>
                  <p>
                    Date From -
                    <span>
                      {new Intl.DateTimeFormat("en-GB", {
                        year: "numeric",
                        month: "long",
                        day: "2-digit",
                      }).format(new Date(leave.dateFrom))}
                    </span>
                  </p>
                  <p>
                    Date To -
                    <span>
                      {new Intl.DateTimeFormat("en-GB", {
                        year: "numeric",
                        month: "long",
                        day: "2-digit",
                      }).format(new Date(leave.dateTo))}
                    </span>
                  </p>
                  <p>Number of Days - {leave.numberOfDays}</p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Users;
