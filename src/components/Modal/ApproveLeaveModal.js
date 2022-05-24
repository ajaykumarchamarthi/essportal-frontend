import React, { useRef, useContext } from "react";
import classes from "./ApproveLeaveModal.module.css";
import ReactDom from "react-dom";
import Cookies from "js-cookie";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import AuthContext from "../../store/auth-context";
import "react-toastify/dist/ReactToastify.css";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onConfirm} />;
};

const ModalOverlay = (props) => {
  const statusInputRef = useRef();
  const submitCtx = useContext(AuthContext);

  const submitHandler = (event) => {
    event.preventDefault();

    const status = statusInputRef.current.value;

    const token = Cookies.get("jwt");

    const leaveId = props.id;

    fetch(
      `https://essportal-backend.herokuapp.com/api/v1/leave/authorizeLeave`,
      {
        method: "PATCH",
        headers: {
          "content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          leaveId,
          status,
        }),
      }
    )
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
        toast.success(data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        props.setIsOpen(!props.isOpen);
        submitCtx.toggleIsSubmitted();
      })
      .catch((err) => {
        toast.error(err.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };

  return (
    <div className={classes.modal}>
      <div className={classes.container}>
        <div className={classes.title}>
          <h3>Approve Leave</h3>
        </div>
        <div>
          <div className={classes.statusSection}>
            <p>
              Name - {props.firstName} {props.lastName}
            </p>
            <p>
              Applied On -
              {new Intl.DateTimeFormat("en-GB", {
                year: "numeric",
                month: "long",
                day: "2-digit",
              }).format(new Date(props.appliedDate))}
            </p>
            <p>
              Status -<span className={classes.status}>{props.status}</span>
            </p>
            <p>
              Date From -
              <span>
                {new Intl.DateTimeFormat("en-GB", {
                  year: "numeric",
                  month: "long",
                  day: "2-digit",
                }).format(new Date(props.dateFrom))}
              </span>
            </p>
            <p>
              Date To -
              <span>
                {new Intl.DateTimeFormat("en-GB", {
                  year: "numeric",
                  month: "long",
                  day: "2-digit",
                }).format(new Date(props.dateTo))}
              </span>
            </p>
            <p>Number of Days - {props.numberOfDays}</p>
            <p>Reason - {props.category}</p>
            <p>Detailed Reason - {props.detailReason}</p>
          </div>
        </div>
        <form className={classes.form} onSubmit={submitHandler}>
          <div className={classes.action}>
            <label htmlFor="action">Action</label>
            <select ref={statusInputRef} id="action">
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
          <div className={classes.btn}>
            <Button variant="contained" type="submit">
              Action
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

function ApproveLeaveModal(props) {
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
          isOpen={props.isOpen}
          id={props.id}
          firstName={props.firstName}
          lastName={props.lastName}
          category={props.category}
          dateTo={props.dateTo}
          dateFrom={props.dateFrom}
          numberOfDays={props.numberOfDays}
          detailReason={props.detailReason}
          appliedDate={props.appliedDate}
          status={props.status}
        />,
        document.getElementById("overlay-root")
      )}
    </React.Fragment>
  );
}

export default ApproveLeaveModal;
