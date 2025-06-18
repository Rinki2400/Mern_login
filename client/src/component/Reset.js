import React from "react";
// import avatar from '../assets/profile.png';
import {  useNavigate } from 'react-router-dom'
// import { resetPasswordValidation } from '../helper/validator' 
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
// import { useAuthStore } from '../store/store'

function Reset() {
  const navigate= useNavigate()
  // const setUsername = useAuthStore(state => state.setUsername);
  const formik = useFormik({
    initialValues: {
      confirmPass: '',
      password:"",

    },
    //  validate : resetPasswordValidation,
    validateOnBlur: false,
    validateOnChange: false,
   
    onSubmit : values => {
      // setUsername(values.username);
      navigate('/password')
    }
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
                            type="text"
                            className="form-control"
                            id="password"
                            placeholder="Enter new password"
                            {...formik.getFieldProps('password')}
                        />
                    </div>
                    <div className="mb-4">
                     
                        <input
                            type="text"
                            className="form-control"
                            id="confirmPass"
                            placeholder="Re-enter password"
                            {...formik.getFieldProps('confirmPass')}
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