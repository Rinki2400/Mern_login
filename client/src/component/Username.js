import React from "react";
import avatar from "../assets/profile.png";
import { Link, useNavigate } from "react-router-dom";
import { usernameValidate } from "../helper/validator";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { useAuthStore } from "../store/store";

function Username() {
   const navigate = useNavigate();
  const setUsername = useAuthStore(state => state.setUsername);

  const formik = useFormik({
    initialValues : {
      username : 'example123'
    },
    validate : usernameValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit : async values => {
      setUsername(values.username);
      navigate('/password')
    }
  })


  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="d-flex p-5 justify-content-center align-items-center vh-100 bg-light">
        <div
          className="card shadow p-5"
          style={{ minWidth: "320px", borderRadius: "12px" }}
        >
          <div className="text-center mb-4">
            <h2 className="display-5 fw-bold">Hello Again!</h2>
            <span className="d-block py-2 fs-7 text-secondary">
              Explore More by connecting with us.
            </span>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="d-flex justify-content-center mb-4">
              <img
                src={avatar}
                alt="User Avatar"
                className="rounded-circle border"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="form-label fw-semibold text-secondary"
              >
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Enter username"
                {...formik.getFieldProps("username")}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100 fw-bold py-2"
            >
              Let Go
            </button>
            <div className="text-center py-4">
              <span className="text-secondary">
                Not a Member?{" "}
                <Link
                  className="text-danger fw-semibold text-decoration-none"
                  to="/register"
                >
                  Register Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Username;
