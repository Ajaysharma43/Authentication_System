import React from "react";
import { useNavigate } from "react-router-dom";

const SignupSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-50 to-green-100">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <h2 className="text-2xl font-semibold text-green-700 mb-6">
          Signup Successful!
        </h2>
        <p className="text-gray-600 mb-6">
          Thank you for signing up. You can now log in to access your account.
        </p>
        <button
          onClick={() => navigate("/login")}
          className="px-4 py-2 bg-green-600 text-white font-medium rounded-md shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Go to Login Page
        </button>
      </div>
    </div>
  );
};

export default SignupSuccess;
