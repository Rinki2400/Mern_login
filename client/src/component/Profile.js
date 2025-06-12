import React, { useState } from 'react';
import avatar from '../assets/profile.png';
import  { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { profileValidation } from '../helper/validator';
// import { updateUser } from '../helper/helper';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [file, setFile] = useState();
  const navigate = useNavigate();

  // Static user data (replace with actual user data if needed)
  const apiData = {
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    address: '',
    profile: ''
  };

  const formik = useFormik({
    initialValues: {
      firstName: apiData.firstName,
      lastName: apiData.lastName,
      email: apiData.email,
      mobile: apiData.mobile,
      address: apiData.address
    },
    enableReinitialize: true,
    validate: profileValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit : values => {
      // setUsername(values.username);
      navigate('/')
    }
  });

  // Handle file upload and set file state
  function onUpload(event) {
    const file = event.target.files[0];
    if (file) {
      setFile(URL.createObjectURL(file));
    }
  }

  function userLogout() {
    localStorage.removeItem('token');
    navigate('/');
  }

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="card p-4 w-50">
        <div className="text-center">
          <h4 className="display-5 fw-bold">Profile</h4>
          <p className="text-muted">You can update the details.</p>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className="text-center">
            <label htmlFor="profile">
              <img
                src={file || apiData.profile || avatar}
                className="rounded-circle border"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
                alt="avatar"
              />
            </label>
            <input onChange={onUpload} type="file" id="profile" name="profile" className="form-control mt-3" />
          </div>

          <div className="row mt-4">
            <div className="col">
              <input {...formik.getFieldProps('firstName')} className="form-control" type="text" placeholder="First Name" />
            </div>
            <div className="col">
              <input {...formik.getFieldProps('lastName')} className="form-control" type="text" placeholder="Last Name" />
            </div>
          </div>

          <div className="row mt-3">
            <div className="col">
              <input {...formik.getFieldProps('mobile')} className="form-control" type="text" placeholder="Mobile No." />
            </div>
            <div className="col">
              <input {...formik.getFieldProps('email')} className="form-control" type="text" placeholder="Email*" />
            </div>
          </div>

          <div className="mt-3">
            <input {...formik.getFieldProps('address')} className="form-control" type="text" placeholder="Address" />
          </div>

          <button className="btn btn-primary w-100 mt-4" type="submit">Update</button>

          <div className="text-center mt-3">
            <span className="text-muted">
              Come back later? <button onClick={userLogout} className="btn btn-link text-danger">Logout</button>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;
