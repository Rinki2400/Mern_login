import React from "react";
import avatar from "../assets/avatar_2.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { passwordValidate } from "../helper/validator";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { verifyPassword } from "../helper/helper";
import useFetch from "../hooks/fetch.hook";
import { useAuthStore } from "../store/store";

function Password() {
  const navigate = useNavigate();
  const { username } = useAuthStore((state) => state.auth);
  const [{ isLoading, apiData, serverError }] = useFetch(
    `/api/user/${username}`
  );
  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validate: passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        toast.loading("Checking...");
        const res = await verifyPassword({
          username,
          password: values.password,
        });

        toast.dismiss();
        toast.success(<b>Login Successfully...!</b>);
 

        const { token } = res.data;
        localStorage.setItem("token", token);
        navigate("/profile");
      } catch (error) {
        toast.dismiss();
        toast.error(<b>Password Not Match!</b>);
      }
    },
  });

  if (isLoading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="text-center">
          <div className="spinner-border text-primary me-2" role="status"></div>
          Loading...
        </div>
      </div>
    );
  if (serverError)
    return <h1 className="text-xl text-red-500">{serverError.message}</h1>;

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="d-flex p-5 justify-content-center align-items-center vh-100 bg-light">
        <div
          className="card shadow p-5"
          style={{ minWidth: "320px", borderRadius: "12px" }}
        >
          <div className="text-center mb-4">
            <h2 className="display-5 fw-bold">
              Hello {apiData?.firstName || apiData?.username || "Guest"}
            </h2>
            <span className="d-block py-2 fs-7 text-secondary">
              Explore More by connecting with us.
            </span>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="d-flex justify-content-center mb-4">
              <img
                src={apiData?.profile || avatar}
                alt="User Avatar"
                className="rounded-circle border"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                className="form-control"
                id="password"
                placeholder="Enter password"
                {...formik.getFieldProps("password")}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100 fw-bold py-2"
            >
              Sign In
            </button>
            <div className="text-center py-4">
              <span className="text-secondary">
                Forgot Password?{" "}
                <Link
                  className="text-danger fw-semibold text-decoration-none"
                  to="/recover"
                >
                  Recover Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Password;
