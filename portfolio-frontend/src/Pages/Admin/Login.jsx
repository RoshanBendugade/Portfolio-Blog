
import { useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/auth/login", {
        email,
        password,
      });

      const token = response.data?.token;

      if (!token) {
        throw new Error("Authentication token was not returned.");
      }

      localStorage.setItem("token", token);
      navigate("/admin", { replace: true });

    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Login failed. Please check your credentials."
      );
      console.error("Login error:", error);
    } finally {
      setLoading(false);
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
          required
          className="w-full p-3 rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          required
          className="w-full p-3 rounded mb-6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <p className="text-red-400 text-sm mb-4">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 py-3 rounded text-white"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </section>
  );
}

export default Login;
