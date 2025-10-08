import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";

const Login = () => {
  const [emailId, setEmailId] = useState("karan.aujla@example.com");
  const [password, setPassword] = useState("Karan#12");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [error, setError] = useState();
  const [isLogin, setIsLogin] = useState(true);
  const [toast, setToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res.data));
      setToastMessage("Login Successfull !");
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 3000);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      setError(err?.response?.data.error || "Something went wrong !");
    }
  };
  const handleSignup = async () => {
    if (!firstName.trim() || !lastName.trim()) {
      setError("First name and Last name are required");
      return;
    }

    if (!emailId.trim()) {
      setError("Email is required");
      return;
    } else if (!/\S+@\S+\.\S+/.test(emailId)) {
      setError("Email is invalid");
      return;
    }

    if (!password) {
      setError("Password is required");
      return;
    } else if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    // Clear previous error if validation passes
    setError("");

    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );
      setToastMessage("Profile Created Successfullu");
      dispatch(addUser(res.data?.data));
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 3000);

      setTimeout(() => {
        navigate("/profile");
      }, 1000);
    } catch (err) {
      setError(err?.response?.data.error || "Something went wrong !");
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="card bg-neutral-content w-80 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl">
            {isLogin ? "Login" : "Signup"}
          </h2>

          {!isLogin && (
            <>
              <fieldset className="fieldset">
                <h2 className="text-sm font-medium">First Name</h2>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="input"
                  placeholder="Enter Your First Name"
                />
              </fieldset>
              <fieldset className="fieldset">
                <h2 className="text-sm font-medium">Last Name</h2>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="input"
                  placeholder="Enter Your Last Name"
                />
              </fieldset>
            </>
          )}
          <fieldset className="fieldset">
            <h2 className="text-sm font-medium">Email ID</h2>
            <input
              type="text"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              className="input"
              placeholder="Enter Your Email"
            />
          </fieldset>
          <fieldset className="fieldset">
            <h2 className="text-sm font-medium">Password</h2>
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              placeholder="Enter Your Password"
            />
          </fieldset>
          {error && <p className="text-red-500">{error}</p>}
          <div className="card-actions justify-center">
            <button
              className="btn btn-primary"
              onClick={isLogin ? handleLogin : handleSignup}>
              {isLogin ? "Login" : "Signup"}
            </button>
          </div>
          <p className="text-sm text-gray-600">
            {isLogin ? (
              <>
                Don’t have an account?{" "}
                <span
                  className="text-blue-600 cursor-pointer"
                  onClick={() => setIsLogin(false)}>
                  Signup
                </span>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <span
                  className="text-blue-600 cursor-pointer"
                  onClick={() => setIsLogin(true)}>
                  Login
                </span>
              </>
            )}
          </p>
        </div>
      </div>
      {toast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
Login;
