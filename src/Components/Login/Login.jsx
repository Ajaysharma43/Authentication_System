import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-50 to-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">
          Welcome Back
        </h2>
        <form>
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
              placeholder="example@email.com"
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
          <span
            className="text-indigo-600 hover:underline focus:outline-none"
          >
            <Link to={'/Signup'}>
            Sign up
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
