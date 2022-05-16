import React, { useState, useEffect } from "react";
import axios from "axios";
import classes from "./UsersList.module.css";

function UsersList() {
  const [usersList, setUsersList] = useState([]);

  console.log(usersList);

  useEffect(() => {
    const loadUsers = async () => {
      const response = await axios.get(
        "https://essportal-backend.herokuapp.com/api/v1/users/getAllUsers"
      );
      const { data } = await response.data;
      setUsersList(data.users);
    };
    loadUsers();
  }, []);

  return (
    <div>
      <h3>Users List</h3>
      <div className={classes.table}>
        <table className="table table-striped table-bordered table-responsive">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {usersList.map((user) => (
              <tr key={user._id}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UsersList;
