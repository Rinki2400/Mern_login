import React  from "react";
import { useNavigate } from "react-router-dom";

import  { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
// import { useAuthStore } from '../store/store'

function Recover() {
  const navigate = useNavigate();
  // const [OTP, setOTP] = useState();
  // const setUsername = useAuthStore(state => state.setUsername);
  const formik = useFormik({
    initialValues: {
      OTP: "1243344",
    },

    validateOnBlur: false,
    validateOnChange: false,

    onSubmit() {
     
      return navigate("/reset");
    },
  });

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="d-flex p-5 justify-content-center align-items-center vh-100 bg-light">
        <div
          className="card shadow p-5"
          style={{ minWidth: "320px", borderRadius: "12px" }}
        >
          <div className="text-center mb-4">
            <h2 className="display-5 fw-bold">Recovery</h2>
            <span className="d-block py-2 fs-7 text-secondary">
              Enter OTP to recover password.
            </span>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <p className="text-muted small text-left">
                Enter the 6-digit OTP sent to your email address.
              </p>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Enter OTP"
                {...formik.getFieldProps("OTP")}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100 fw-bold py-2"
            >
              Submit
            </button>
            <div className="text-center py-4">
              <span className="text-secondary">
                Can't get OTP?{" "}
                <span
                  className="text-danger fw-semibold text-decoration-none"
                  style={{ cursor: "pointer" }}
                  // onClick={handleResendOTP} // Add your resend handler here
                >
                  Resend
                </span>
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Recover;
