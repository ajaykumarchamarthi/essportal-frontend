import React, { useState, useEffect } from "react";
import axois from "axios";
import { useHistory, useLocation } from "react-router-dom";
import Profile from "./Profile/Profile";
import classes from "./Users.module.css";
import Cookies from "js-cookie";
import "./leavestatus.css";

function Users() {
  const [leavesList, setLeavesList] = useState([]);

  const history = useHistory();
  const location = useLocation();

  const filterBy = location.search;

  console.log(filterBy);

  const user = localStorage.getItem("user");

  const userId = localStorage.getItem("userId");

  const token = Cookies.get("jwt");

  const queryChangeHandler = (event) => {
    event.preventDefault();
    const filterBy = event.target.value;
    history.push({
      pathname: "/profile",
      search: `?status=${filterBy}`,
    });
  };

  useEffect(() => {
    const getAllLeaves = async () => {
      const response = await axois.get(
        `https://essportal-backend.herokuapp.com/api/v1/leave/getAllLeaves${filterBy}`,
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
  }, [userId, token, filterBy]);

  return (
    <div className={classes.container}>
      <Profile />
      <div className={classes.leaveContainer}>
        <h3 className={classes.title}>Leave Requests</h3>
        <div className={classes.sortContainer}>
          <div className={classes.options}>
            <label htmlFor="filterby">Filter By</label>
            <select name="filterby" id="filterby" onChange={queryChangeHandler}>
              <option disabled>All</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>
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
                    <span className={leave.status}>{leave.status}</span>
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
