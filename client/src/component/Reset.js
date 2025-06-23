import React from "react";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { useFormik } from "formik";
import { resetPassword } from "../helper/helper"; // Make sure this path matches your project structure

function Reset() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPass: "",
    },
    validateOnBlur: false,
    validateOnChange: false,

    onSubmit: async (values) => {
      if (values.password !== values.confirmPass) {
        toast.error("Passwords do not match");
        return;
      }

      try {
        const username = localStorage.getItem("username"); // Or replace with context/store as needed
        const { status } = await resetPassword({
          username,
          password: values.password,
        });

        if (status === 201) {
          toast.success("Password reset successfully");
          navigate("/login");
        } else {
          toast.error("Failed to reset password");
        }
      } catch (err) {
        toast.error("Something went wrong");
      }
    },
  });

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="d-flex p-5 justify-content-center align-items-center vh-100 bg-light">
        <div className="card shadow p-5" style={{ minWidth: "320px", borderRadius: "12px" }}>
          <div className="text-center mb-4">
            <h2 className="display-5 fw-bold">Reset</h2>
            <span className="d-block py-2 fs-7 text-secondary">
              Enter new password.
            </span>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter new password"
                {...formik.getFieldProps("password")}
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                className="form-control"
                id="confirmPass"
                placeholder="Re-enter password"
                {...formik.getFieldProps("confirmPass")}
              />
            </div>
            <button type="submit" className="btn btn-primary w-100 fw-bold py-2">
              Reset
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Reset;