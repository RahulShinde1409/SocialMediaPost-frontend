import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await forgotPassword(email);
    setMessage(res.message);
  } catch (error) {
    setMessage(error.response?.data?.message || "Something went wrong");
  }
};

    
     const res = await forgotPassword(email);
setMessage(res.message)


  return (
    <div className="flex min-h-screen items-center justify-center bg-[#eff6e0]">
      <div className="w-full max-w-sm bg-gray-800 p-8 rounded-xl shadow-lg">

        <h2 className="text-2xl text-white text-center font-bold mb-5">
          Forgot Password
        </h2>

        {message && (
          <p className="text-center text-green-400 mb-4">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 rounded-md mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            className="w-full bg-indigo-500 text-white p-3 rounded-md"
          >
            Send Reset Link
          </button>

        </form>

        <div className="text-center mt-4">

          <Link
            to="/login"
            className="text-blue-400"
          >
            Back to Login
          </Link>

        </div>

      </div>
    </div>
  );
}