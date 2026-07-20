import { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function ResetPassword() {

  const { token } = useParams();

  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");

  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(

        `YOUR_BACKEND_URL/user/reset-password/${token}`,

        {
          newPassword,
        }

      );

      setMessage(res.data.message);

      setTimeout(() => {

        navigate("/login");

      }, 1500);

    } catch (error) {

      setMessage(error.response?.data?.message || "Something went wrong");

    }

  };

  return (

    <div className="flex min-h-screen items-center justify-center bg-[#eff6e0]">

      <div className="w-full max-w-sm bg-gray-800 p-8 rounded-xl shadow-lg">

        <h2 className="text-2xl text-white text-center font-bold mb-5">

          Reset Password

        </h2>

        {message && (
          <p className="text-center text-green-400 mb-4">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit}>

          <input
            type="password"
            placeholder="New Password"
            className="w-full p-3 rounded-md mb-4"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <button
            className="w-full bg-indigo-500 text-white p-3 rounded-md"
          >
            Reset Password
          </button>

        </form>

      </div>

    </div>

  );
}