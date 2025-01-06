import axios from "axios";
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast, Bounce, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const APIURL = import.meta.env.VITE_API_KEY;

  const [Show,setShow] = useState('Show')
  const [Confirm,setConfirm] = useState('Show')
  const Username = useRef();
  const Email = useRef();
  const Password = useRef();
  const ConfirmPasword = useRef();

  const navigate = useNavigate();

  const SendData = async (event) => {
    event.preventDefault();
    const username = Username.current.value;
    const email = Email.current.value;
    const password = Password.current.value;
    const confirmpassoword = ConfirmPasword.current.value;
    if (password == confirmpassoword) {
      if (
        username != "" &&
        email != "" &&
        password != "" &&
        confirmpassoword != ""
      ) {
        if (username.length <= 5) {
          toast.warn("Username Is Too Sort", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Zoom,
          });
        }
        else if (username.length >= 13) {
          toast.warn("Username Is Too Long", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Zoom,
          });
        } else {
          const data = await axios.post(
            `${APIURL}/Authentication/Signup`,
            { username, email, password }
          );
          if (data.data == "existed") {
            toast.error("Email Already In Use", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              transition: Zoom,
            });
          } else if (data.data == "created") {
            navigate("/Login");
          }
        }
      } else {
        console.log("data is incomplete");
      }
    } else {
      console.log("passoword not match");
    }
  };

  const ShowPassword = async () => {
    if (Password.current.type == "password") {
      Password.current.type = "text";
      setShow('Hide')
    } else {
      Password.current.type = "password";
      setShow('Show')
    }
  };

  const ShowConfirmPassword = async () => {
    if (ConfirmPasword.current.type == "password") {
      ConfirmPasword.current.type = "text";
      setConfirm('Hide')
    } else {
      ConfirmPasword.current.type = "password";
      setConfirm('Show')
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-blue-700 text-center mb-6">
          Create an Account
        </h2>
        <form onSubmit={(event) => SendData(event)}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              ref={Username}
              placeholder="John Doe"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              required
            />
          </div>

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
              placeholder="example@email.com"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              required
            />
          </div>


          <div className="mb-4 relative">
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
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              required
            />
            <button
              type="button"
              onClick={ShowPassword}
              className="absolute right-3 top-10 text-blue-600 hover:text-blue-800 focus:outline-none text-sm font-medium"
            >
              {Show}
            </button>
          </div>

          <div className="mb-6 relative">
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              ref={ConfirmPasword}
              placeholder="********"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              required
            />
            <button
              type="button"
              onClick={ShowConfirmPassword}
              className="absolute right-3 top-10 text-blue-600 hover:text-blue-800 focus:outline-none text-sm font-medium"
            >
              {Confirm}
            </button>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-6 flex items-center">
          <div className="border-t border-gray-300 flex-grow"></div>
          <span className="mx-4 text-sm text-gray-500">or</span>
          <div className="border-t border-gray-300 flex-grow"></div>
        </div>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <span className="text-blue-600 hover:underline focus:outline-none">
            <Link to={"/Login"}>Log in</Link>
          </span>
        </p>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </div>
  );
};

export default Signup;
