import React, { useState } from "react";
import avatar from "../assets/profile.png";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { profileValidation } from "../helper/validator";
import useFetch from "../hooks/fetch.hook";
import { updateUser } from '../helper/helper';
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/store";

function Profile() {
  const [file, setFile] = useState();
  const { username } = useAuthStore((state) => state.auth);
  const navigate = useNavigate();
  const [{ isLoading, apiData, serverError }] = useFetch(`/api/user/${username}`);

  const formik = useFormik({
    initialValues: {
      firstName: apiData?.firstName || "",
      lastName: apiData?.lastName || "",
      email: apiData?.email || "",
      mobile: apiData?.mobile || "",
      address: apiData?.address || "",
    },
    enableReinitialize: true,
    validate: profileValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      const updatedValues = { ...values, profile: file || apiData?.profile || "", username };

      try {
        toast.loading("Updating...");
        await updateUser(updatedValues);
        toast.dismiss();
        toast.success(<b>Updated Successfully!</b>);
        navigate("/");
      } catch (error) {
        toast.dismiss();
        toast.error(<b>User details not updated!</b>);
      }
    },
  });

  function onUpload(event) {
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => setFile(reader.result);
    reader.onerror = err => console.error("Image load error:", err);
  }

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="text-center">
          <div className="spinner-border text-primary me-2" role="status"></div>
          Loading...
        </div>
      </div>
    );
  }

  if (serverError) {
    return <h1 className="text-danger text-center mt-5">{serverError.message}</h1>;
  }

  function userLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="card p-4 w-50">
        <div className="text-center mb-3">
          <h4 className="display-5 fw-bold">Profile</h4>
          <p className="text-muted">You can update your details here.</p>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className="text-center">
            <label htmlFor="profile">
              <img
                src={file || apiData?.profile || avatar}
                className="rounded-circle border"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
                alt="avatar"
              />
            </label>
            <input
              onChange={onUpload}
              type="file"
              id="profile"
              name="profile"
              className="form-control mt-3"
            />
          </div>

          <div className="row mt-4">
            <div className="col">
              <input {...formik.getFieldProps("firstName")} className="form-control" type="text" placeholder="First Name" />
            </div>
            <div className="col">
              <input {...formik.getFieldProps("lastName")} className="form-control" type="text" placeholder="Last Name" />
            </div>
          </div>

          <div className="row mt-3">
            <div className="col">
              <input {...formik.getFieldProps("mobile")} className="form-control" type="text" placeholder="Mobile No." />
            </div>
            <div className="col">
              <input {...formik.getFieldProps("email")} className="form-control" type="text" placeholder="Email*" />
            </div>
          </div>

          <div className="mt-3">
            <input {...formik.getFieldProps("address")} className="form-control" type="text" placeholder="Address" />
          </div>

          <button className="btn btn-primary w-100 mt-4" type="submit">
            Update
          </button>

          <div className="text-center mt-3">
            <span className="text-muted">
              Come back later?{" "}
              <button onClick={userLogout} className="btn btn-link text-danger">
                Logout
              </button>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;