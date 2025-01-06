import axios from "axios";
import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";

const Login = () => {
  const APIURL = import.meta.env.VITE_API_KEY;

  const Username = useRef();
  const Email = useRef();
  const Password = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    const remove = async () => {
      localStorage.removeItem("Password");
      localStorage.removeItem("Username");
      localStorage.removeItem("token");
    };
    remove();
  });

  const VerifyUser = async (event) => {
    event.preventDefault();

    const username = Username.current.value;
    const email = Email.current.value;
    const password = Password.current.value;

    if (username !== "" && email !== "" && password !== "") {
      const response = await axios.post(
        `${APIURL}/Authentication/Login`,
        {
          username,
          email,
          password,
        }
      );
      if (response.data == "authorized") {
        const token = "isAuthenticated";

        const encryptedUsername = CryptoJS.AES.encrypt(
          username,
          "encrypt009"
        ).toString();
        const encryptedPassword = CryptoJS.AES.encrypt(
          password,
          "encrypt009"
        ).toString();
        const encryptedToken = CryptoJS.AES.encrypt(
          token,
          "encrypt009"
        ).toString();

        console.log("Encrypted Username:", encryptedUsername);
        console.log("Encrypted Password:", encryptedPassword);
        console.log("Encrypted Token:", encryptedToken);

        sessionStorage.setItem("Username", encryptedUsername);
        sessionStorage.setItem("Password", encryptedPassword);
        sessionStorage.setItem("token", encryptedToken);

        navigate('/AdminUsersPage');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-50 to-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">
          Welcome Back
        </h2>
        <form onSubmit={(event) => VerifyUser(event)}>
          {/* Username */}
          <div className="mb-4">
            <label
              htmlFor="Username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="Username"
              ref={Username}
              placeholder="Enter Your Username"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              ref={Email}
              placeholder="Enter Your Email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              ref={Password}
              placeholder="********"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 bg-indigo-600 text-white font-medium rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Log In
          </button>
        </form>

        {/* Divider */}
        <div className="mt-6 flex items-center">
          <div className="border-t border-gray-300 flex-grow"></div>
          <span className="mx-4 text-sm text-gray-500">or</span>
          <div className="border-t border-gray-300 flex-grow"></div>
        </div>

        {/* Forgot Password */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Forgot your password?{" "}
          <a
            href="#"
            className="text-indigo-600 hover:underline focus:outline-none"
          >
            Reset it
          </a>
        </p>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{" "}
          <span className="text-indigo-600 hover:underline focus:outline-none">
            <Link to={"/Signup"}>Sign up</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
