import React from "react";
import avatar from '../assets/profile.png';
import { Link, useNavigate } from 'react-router-dom'
import { passwordValidate } from '../helper/validator' 
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
// import { useAuthStore } from '../store/store'

function Password() {
  const navigate= useNavigate()
 
  const formik = useFormik({
    initialValues: {
      username: ''
    },
    validate : passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
   
    onSubmit : values => {
      // setUsername(values.username);
      navigate('/profile')
    }
  });

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="d-flex p-5 justify-content-center align-items-center vh-100 bg-light">
        <div className="card shadow p-5" style={{ minWidth: "320px", borderRadius: "12px" }}>
          <div className="text-center mb-4">
            <h2 className="display-5 fw-bold">Hello ABC</h2>
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
              
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Enter password"
                {...formik.getFieldProps('password')}
              />
            </div>
            <button type="submit" className="btn btn-primary w-100 fw-bold py-2">
             Sign In
            </button>
            <div className="text-center py-4">
              <span className="text-secondary">
                Forgot Password? <Link className="text-danger fw-semibold text-decoration-none" to="/recover">Recover Now</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Password;