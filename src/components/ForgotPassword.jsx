import { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPassword } from "../actions/authAction";

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-100 to-blue-100">
      <div className="w-full max-w-md bg-red-900 rounded-2xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-white text-center mb-2">
          Forgot Password
        </h1>

        <p className="text-gray-300 text-center mb-6">
          Enter your email address to receive a password reset link.
        </p>

        {message && (
          <div className="bg-green-100 text-green-700 p-3 rounded-lg mb-4 text-center">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 rounded-lg border border-gray-300 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Send Reset Link
          </button>
        </form>

        <div className="text-center mt-5">
          <Link
            to="/login"
            className="text-blue-400 hover:text-blue-300"
          >
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}