import React from "react";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import classes from "./RequestLeave.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import * as yup from "yup";

function RequestLeave() {
  const history = useHistory();

  const schema = yup.object().shape({
    category: yup.string().required("Category is required"),
    dateFrom: yup.date().default(function () {
      return new Date();
    }),
    dateTo: yup.date().default(function () {
      return new Date();
    }),
    numberOfDays: yup
      .number()
      .required("Number of days avail leave is required"),
    detailReason: yup.string().required("Detail Reason is required"),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: yupResolver(schema) });

  const submitHandler = (data, event) => {
    event.preventDefault();
    console.log("data", data);
    const { dateFrom, dateTo, numberOfDays, detailReason, category } = data;

    const token = Cookies.get("jwt");

    const userId = localStorage.getItem("userId");

    fetch("https://essportal-backend.herokuapp.com/api/v1/leave/applyLeave", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        category,
        detailReason,
        userId,
        dateTo,
        dateFrom,
        numberOfDays,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = `${data.message}`;
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        toast.success(data.status, {
          position: toast.POSITION.TOP_CENTER,
        });
        history.replace("/profile");
      })
      .catch((err) =>
        toast.error(err.message, {
          position: toast.POSITION.TOP_CENTER,
        })
      );
  };

  return (
    <div className={classes.container}>
      <div className={classes.formTitle}>Apply Leave</div>
      <form className={classes.form} onSubmit={handleSubmit(submitHandler)}>
        <div>
          <label htmlFor="category">Category</label>
          <select
            name="category"
            id="category"
            {...register("category", { required: true })}
          >
            <option value="Casual Leave">Casual Leave</option>
            <option value="Sick Leave">Sick Leave</option>
            <option value="Earned Leave">Earned Leave</option>
          </select>
          <p className={classes.error}>{errors.category?.message}</p>
        </div>
        <div>
          <label htmlFor="dateFrom">Date From</label>
          <input
            type="date"
            id="dateFrom"
            name="dateFrom"
            {...register("dateFrom", { required: true })}
          />
          <p className={classes.error}>{errors.dateFrom?.message}</p>
        </div>
        <div>
          <label htmlFor="dateTo">Date To</label>
          <input
            type="date"
            id="dateTo"
            name="dateTo"
            {...register("dateTo", { required: true })}
          />
          <p className={classes.error}>{errors.dateTo?.message}</p>
        </div>
        <div>
          <label htmlFor="numberOfDays">Number Of Days Avail Leave</label>
          <input
            type="number"
            id="numberOfDays"
            name="numberOfDays"
            min="1"
            {...register("numberOfDays", { required: true })}
          />
          <p className={classes.error}>{errors.numberOfDays}</p>
        </div>
        <div>
          <label htmlFor="detailReason">Detail Reason</label>
          <textarea
            rows="10"
            cols="80"
            id="detailReason"
            name="detailReason"
            {...register("detailReason", { required: true })}
          />
          <p className={classes.error}>{errors.detailReason?.message}</p>
        </div>
        <div className={classes.btn}>
          <button type="submit">Apply Leave</button>
        </div>
      </form>
    </div>
  );
}

export default RequestLeave;
