import axios from "axios";
import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {

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
        if(password == confirmpassoword)
        {
            if(username != "" && email != "" && password != "" && confirmpassoword != "")
            {
                const data = await axios.post('http://localhost:3000/Authentication/Signup',{username,email,password})
                if(data.data == "existed")
                {
                    console.log("existed");
                }
                else if(data.data == "created")
                {
                    navigate('/SignupSuccess')
                }
            }
            else
            {
                console.log("data is incomplete");
            }
        }
        else
        {
            console.log("passoword not match");
        }
        
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-blue-700 text-center mb-6">
          Create an Account
        </h2>
        <form onSubmit={(event)=>SendData(event)}>
          {/* Name */}
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
              placeholder="example@email.com"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
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
          </div>

          {/* Confirm Password */}
          <div className="mb-6">
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
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Sign Up
          </button>
        </form>

        {/* Divider */}
        <div className="mt-6 flex items-center">
          <div className="border-t border-gray-300 flex-grow"></div>
          <span className="mx-4 text-sm text-gray-500">or</span>
          <div className="border-t border-gray-300 flex-grow"></div>
        </div>

        {/* Social Login */}
        

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <span
            className="text-blue-600 hover:underline focus:outline-none"
          >
            <Link to={'/Login'}>
            Log in
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
