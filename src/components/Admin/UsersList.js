import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../store/auth-context";
import Cookies from "js-cookie";
import axios from "axios";
import classes from "./UsersList.module.css";

function UsersList() {
  const [usersList, setUsersList] = useState([]);

  const submitCtx = useContext(AuthContext);

  const reRender = submitCtx.isUserAdded;

  const token = Cookies.get("jwt");

  useEffect(() => {
    const loadUsers = async () => {
      const response = await axios.get(
        "https://essportal-backend.herokuapp.com/api/v1/users/getAllUsers",
        {
          headers: {
            "content-Type": "application/JSON",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { data } = await response.data;
      const filteredUsers = data.users.filter((user) => user.role === "user");
      setUsersList(filteredUsers);
    };
    loadUsers().catch((err) => alert(err.message));
    // eslint-disable-next-line
  }, [reRender]);

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
