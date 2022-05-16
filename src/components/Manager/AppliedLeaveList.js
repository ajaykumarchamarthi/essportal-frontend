import React, { useState } from "react";
import classes from "./AppliedLeaveList.module.css";
import ApproveLeaveModal from "./../Modal/ApproveLeaveModal";

function AppliedLeaveList({
  id,
  status,
  firstName,
  lastName,
  category,
  reason,
  detailReason,
  appliedDate,
  dateTo,
  dateFrom,
  numberOfDays,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const openHandler = (event) => {
    event.preventDefault();
    setIsOpen(!isOpen);
  };

  console.log(
    id,
    firstName,
    lastName,
    category,
    status,
    detailReason,
    numberOfDays,
    appliedDate,
    dateFrom,
    dateTo
  );

  return (
    <div className={classes.leaveContainer}>
      <div className={classes.leaveList} key={id}>
        <div className={classes.statusSection}>
          <p>
            Applied On -
            {new Intl.DateTimeFormat("en-GB", {
              year: "numeric",
              month: "long",
              day: "2-digit",
            }).format(new Date(appliedDate))}
          </p>
          <p>
            Status - <span className={classes.status}>{status}</span>
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
              }).format(new Date(dateFrom))}
            </span>
          </p>
          <p>
            Date To -
            <span>
              {new Intl.DateTimeFormat("en-GB", {
                year: "numeric",
                month: "long",
                day: "2-digit",
              }).format(new Date(dateTo))}
            </span>
          </p>
          <p>Number of Days - {numberOfDays}</p>
        </div>
        <button onClick={openHandler} className={classes.btn}>
          Action
        </button>
        {isOpen && (
          <ApproveLeaveModal
            onConfirm={openHandler}
            id={id}
            status={status}
            firstName={firstName}
            lastName={lastName}
            category={category}
            reason={reason}
            detailReason={detailReason}
            appliedDate={appliedDate}
            dateTo={dateTo}
            dateFrom={dateFrom}
            numberOfDays={numberOfDays}
          />
        )}
      </div>
    </div>
  );
}

export default AppliedLeaveList;
