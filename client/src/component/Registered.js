import React, { useState } from "react";
import avatar from "../assets/profile.png";
import { Link, useNavigate } from "react-router-dom";
import { registerValidation } from "../helper/validator";
// import { registerUser } from '../helper/helper'
import  { Toaster } from "react-hot-toast";
import { useFormik } from "formik";

function Registered() {
  const navigate = useNavigate();
  const [file, setFile] = useState();

  const formik = useFormik({
    initialValues: {
      email: "doyol56239@cnogs.com",
      username: "example123",
      password: "admin@123",
    },
    validate: registerValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      // setUsername(values.username);
      navigate("/");
    },
  });

  // Handle file upload and set file state
  function onUpload(event) {
    const file = event.target.files[0];
    if (file) {
      setFile(URL.createObjectURL(file));
    }
  }
return (
    <>
        <Toaster position="top-center" reverseOrder={false} />
        <div className="d-flex p-5 justify-content-center align-items-center vh-100 bg-light">
            <div
                className="card shadow p-5"
                style={{ minWidth: "320px", borderRadius: "12px" }}
            >
                <div className="text-center mb-4">
                    <h2 className="display-5 fw-bold">Registered</h2>
                    <span className="d-block py-2 fs-7 text-secondary">
                        Happy to join you!
                    </span>
                </div>
                <form onSubmit={formik.handleSubmit} noValidate>
                    <div className="d-flex justify-content-center mb-4">
                        <label htmlFor="profile">
                            <img
                                src={file || avatar}
                                alt="User Avatar"
                                style={{
                                    width: "105px",
                                    height: "100px",
                                    objectFit: "cover",
                                    border: "4px solid #f8f9fa",
                                    borderRadius: "50%",
                                    boxShadow: "0 0.5rem 1rem rgba(0, 0, 0, 0.15)",
                                    cursor: "pointer",
                                    transition: "border-color 0.2s"
                                }}
                                onMouseOver={e => (e.currentTarget.style.borderColor = "#e9ecef")}
                                onMouseOut={e => (e.currentTarget.style.borderColor = "#f8f9fa")}
                            />
                        </label>
                        <input
                            onChange={onUpload}
                            type="file"
                            id="profile"
                            name="profile"
                            style={{ display: "none" }}
                        />
                    </div>
                    <div className="mb-4">
                        <div className="mb-3 input-group">
                            <span className="input-group-text">
                                <i className="bi bi-person"></i>
                            </span>
                            <input
                                type="text"
                                className={`form-control${formik.errors.username ? " is-invalid" : ""}`}
                                id="username"
                                placeholder="Enter username"
                                {...formik.getFieldProps("username")}
                            />
                        </div>
                        <div className="mb-3 input-group">
                            <span className="input-group-text">
                                <i className="bi bi-envelope"></i>
                            </span>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Enter email"
                                {...formik.getFieldProps("email")}
                            />
                        </div>
                        <div className="mb-3 input-group">
                            <span className="input-group-text">
                                <i className="bi bi-lock"></i>
                            </span>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Enter password"
                                {...formik.getFieldProps("password")}
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary w-100 fw-bold py-2"
                        disabled={formik.isSubmitting}
                    >
                        Register
                    </button>
                    <div className="text-center py-4">
                        <span className="text-secondary">
                            Already Register?{" "}
                            <Link
                                className="text-danger fw-semibold text-decoration-none"
                                to="/"
                            >
                                login Now
                            </Link>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    </>
);
}

export default Registered;
