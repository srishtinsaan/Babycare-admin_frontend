import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Mail } from "lucide-react";

const Auth = () => {
  const navigate = useNavigate();

  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const [savedUsername, setSavedUsername] = useState("");
  const [savedPassword, setSavedPassword] = useState("");

  useEffect(() => {
    async function loadsettings() {
      try {
        const res = await fetch(
          "https://babycare-admin-backend-ulfg.onrender.com/settings"
        );
        const data = await res.json();

        if (data.success) {
          setSavedUsername(data.data.username || "");
          setSavedPassword(data.data.password || "");
        }
      } catch (err) {
        console.log("Load error:", err);
      }
    }

    loadsettings();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    if (inputUsername === savedUsername && inputPassword === savedPassword) {
      localStorage.setItem("token", "dummyToken123");
      navigate("/home");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 via-white to-pink-200">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-[90%] sm:w-[400px]">
        <h1 className="text-3xl font-bold text-pink-500 text-center mb-6">
          BabyCare Admin
        </h1>

        <form onSubmit={handleLogin} className="space-y-5">

          <div className="relative">
            <Mail className="absolute top-3 left-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Username"
              className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none"
              value={inputUsername}
              onChange={(e) => setInputUsername(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute top-3 left-3 text-gray-400" size={20} />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none"
              value={inputPassword}
              onChange={(e) => setInputPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-lg font-semibold shadow-md transition-all"
          >
            Login
          </button>

        </form>
      </div>
    </div>
  );
};

export default Auth;
