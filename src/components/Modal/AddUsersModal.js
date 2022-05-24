import React, { useContext } from "react";
import ReactDom from "react-dom";
import Cookies from "js-cookie";
import classes from "./AddUsersModal.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AuthContext from "../../store/auth-context";

const schema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup.string().email().required("Email is required"),
  password: yup.string().min(8, "Password must atleast be 8 Characters long!"),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords does not match"),
});

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onConfirm} />;
};

const ModalOverlay = (props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: yupResolver(schema) });

  const submitCtx = useContext(AuthContext);

  const submitHandler = (data, event) => {
    event.preventDefault();
    const firstName = data.firstName;
    const lastName = data.lastName;
    const email = data.email;
    const password = data.password;
    const passwordConfirm = data.passwordConfirm;

    const token = Cookies.get("jwt");

    const userId = localStorage.getItem("userId");

    fetch("https://essportal-backend.herokuapp.com/api/v1/users/signup", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
        passwordConfirm,
        userId,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            const errorMessage = `${data.message}`;
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        alert(data.status);
        submitCtx.toggleIsUserAdded();
        props.setIsOpen(false);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className={classes.modal}>
      <div className={classes.container}>
        <div className={classes.title}>
          <h3>Create a Employee Login</h3>
        </div>
        <form className={classes.form} onSubmit={handleSubmit(submitHandler)}>
          <div>
            <TextField
              id="outlined-basic"
              label="First Name"
              variant="outlined"
              margin="normal"
              style={{ width: 300 }}
              type="text"
              name="firstName"
              {...register("firstName", {
                required: true,
              })}
            />
            <p className={classes.error}>{errors.firstName?.message}</p>
          </div>
          <div>
            <TextField
              id="outlined-basic"
              margin="normal"
              name="lastName"
              label="Last Name"
              variant="outlined"
              style={{ width: 300 }}
              type="text"
              {...register("lastName", {
                required: true,
              })}
            />
            <p className={classes.error}>{errors.lastName?.message}</p>
          </div>
          <div>
            <TextField
              name="email"
              id="outlined-basic"
              margin="normal"
              label="Email"
              variant="outlined"
              style={{ width: 300 }}
              type="email"
              {...register("email", {
                required: true,
              })}
            />
            <p className={classes.error}> {errors.email?.message}</p>
          </div>
          <div>
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              margin="normal"
              style={{ width: 300 }}
              type="password"
              name="password"
              {...register("password", {
                required: true,
              })}
            />
            <p className={classes.error}> {errors.password?.message}</p>
          </div>
          <div>
            <TextField
              name="passwordConfirm"
              id="outlined-basic"
              label="Confirm Password"
              variant="outlined"
              margin="normal"
              style={{ width: 300 }}
              type="password"
              {...register("passwordConfirm", {
                required: true,
              })}
            />
            <p className={classes.error}> {errors.passwordConfirm?.message}</p>
          </div>
          <div className={classes.btn}>
            <Button variant="contained" type="submit">
              Create
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

function AddUsersModal(props) {
  return (
    <React.Fragment>
      {ReactDom.createPortal(
        <Backdrop onConfirm={props.onConfirm} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDom.createPortal(
        <ModalOverlay
          onConfirm={props.onConfirm}
          setIsOpen={props.setIsOpen}
        />,
        document.getElementById("overlay-root")
      )}
    </React.Fragment>
  );
}

export default AddUsersModal;
