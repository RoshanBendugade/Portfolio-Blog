import { useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem(
        "token",
        response.data.token
      );

      navigate("/admin");
    } catch (error) {
      alert("Invalid Credentials");
      console.error(error);
    }
  };

  return (
    <section className="min-h-screen flex justify-center items-center bg-slate-950">

      <form
        onSubmit={handleLogin}
        className="bg-slate-900 rounded-2xl p-10 w-[450px]"
      >

        <h1 className="text-4xl font-bold text-white mb-8">
          Admin Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded mb-4"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded mb-8"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          className="w-full bg-orange-500 py-3 rounded text-white"
        >
          Login
        </button>

      </form>

    </section>
  );
}

export default Login;