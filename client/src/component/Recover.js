import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useAuthStore } from "../store/store";
import { generateOTP, verifyOTP } from "../helper/helper";

function Recover() {
  const navigate = useNavigate();
  const [OTP, setOTP] = useState();
  const username = useAuthStore((state) => state.auth.username);
  useEffect(() => {
    if (username) {
      generateOTP(username).then((OTP) => {
        console.log(OTP);
        OTP
          ? toast.success("OTP has been sent to your email")
          : toast.error("Problem while generating OTP");
      });
    }
  }, [username]);

async function onSubmit(e){
    e.preventDefault();
    try {
      let { status } = await verifyOTP({ username, code : OTP })
      if(status === 201){
        toast.success('Verify Successfully!')
        return navigate('/reset')
      }  
    } catch (error) {
      return navigate('/reset')

    }
  }
  
async function resendOTP() {
  if (!username) {
    toast.error("Username is not available!");
    console.error("Missing username during OTP resend.");
    return;
  }

  const toastId = toast.loading("Sending...");

  try {
    const OTP = await generateOTP(username);
    toast.success("OTP has been sent to your email!", { id: toastId });
    console.log("Resent OTP:", OTP);
  } catch (error) {
    toast.error("Could not send OTP!", { id: toastId });
    console.error("OTP resend error:", error);
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
            <h2 className="display-5 fw-bold">Recovery</h2>
            <span className="d-block py-2 fs-7 text-secondary">
              Enter OTP to recover password.
            </span>
          </div>
          <form onSubmit={onSubmit}>
            <div className="mb-4">
              <p className="text-muted small text-left">
                Enter the 6-digit OTP sent to your email address.
              </p>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Enter OTP"
                onChange={(e) => setOTP(e.target.value)}
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
                  onClick={resendOTP}
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
