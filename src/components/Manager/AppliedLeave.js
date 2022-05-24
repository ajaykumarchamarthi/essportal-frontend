import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import AppliedLeaveList from "./AppliedLeaveList";
import classes from "./AppliedLeave.module.css";
import AuthContext from "./../../store/auth-context";

function AppliedLeave() {
  const [leaveList, setLeaveList] = useState([]);

  const submitCtx = useContext(AuthContext);

  const reRender = submitCtx.isLeaveSubmitted;

  const token = Cookies.get("jwt");

  useEffect(() => {
    const loadLeaves = async () => {
      console.log("Re-rendered");
      const response = await axios.get(
        "https://essportal-backend.herokuapp.com/api/v1/leave/getAllLeaves",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { data } = await response.data;

      const appliedLeaves = data.Leaves.filter(
        (leave) => leave.status === "Pending"
      );
      setLeaveList(appliedLeaves);
    };
    loadLeaves();
    // eslint-disable-next-line
  }, [reRender]);

  let filteredAppliedLeaves;

  if (leaveList.length > 0) {
    filteredAppliedLeaves = leaveList.map((leave) => (
      <AppliedLeaveList
        id={leave._id}
        firstName={leave.user.firstName}
        lastName={leave.user.lastName}
        category={leave.category}
        status={leave.status}
        dateFrom={leave.dateFrom}
        dateTo={leave.dateTo}
        numberOfDays={leave.numberOfDays}
        detailReason={leave.detailReason}
        appliedDate={leave.appliedDate}
        key={leave._id}
      />
    ));
  } else {
    filteredAppliedLeaves = "No Leave Request Pending";
  }

  return (
    <div>
      <h3>Applied Leave List</h3>
      <div className={classes.leaveRequest}>{filteredAppliedLeaves}</div>
    </div>
  );
}

export default AppliedLeave;
