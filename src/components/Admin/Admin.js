import React, { useState } from "react";
import classes from "./Admin.module.css";
import Profile from "../Users/Profile/Profile";
import UsersList from "../Admin/UsersList";
import AddUsersModal from "../Modal/AddUsersModal";

function Admin() {
  const [isOpen, setIsOpen] = useState(false);

  const openHandler = (event) => {
    event.preventDefault();
    setIsOpen(!isOpen);
  };

  return (
    <div className={classes.admin}>
      <Profile />
      <div className={classes.addUsers}>
        <button className={classes.btn} onClick={openHandler}>
          Add a Employee
        </button>
        {isOpen && (
          <AddUsersModal onConfirm={openHandler} setIsOpen={setIsOpen} />
        )}
      </div>
      <UsersList />
    </div>
  );
}

export default Admin;
