
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import api from "../../services/api";

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
        email: email.trim(),
        password,
      });

      const token = response.data?.token;

      if (!token) {
        throw new Error("Authentication token was not returned.");
      }

      localStorage.setItem("token", token);
      navigate("/admin", { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Login failed. Please check your credentials."
      );
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950 px-4 py-8">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleLogin}
          className="w-full rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl sm:p-8 md:p-10"
        >
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-500">
              <ShieldCheck size={30} />
            </div>

            <h1 className="text-2xl font-bold text-white sm:text-3xl">
              Admin Login
            </h1>

            <p className="mt-2 text-sm text-slate-400">
              Sign in to manage your portfolio
            </p>
          </div>

          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Email Address
            </label>

            <div className="flex items-center gap-3 rounded-lg border border-slate-700 bg-slate-800 px-3 focus-within:border-orange-500">
              <Mail size={19} className="shrink-0 text-slate-400" />

              <input
                type="email"
                placeholder="Enter your email"
                required
                autoComplete="username"
                className="w-full min-w-0 bg-transparent py-3 text-white outline-none placeholder:text-slate-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Password
            </label>

            <div className="flex items-center gap-3 rounded-lg border border-slate-700 bg-slate-800 px-3 focus-within:border-orange-500">
              <LockKeyhole size={19} className="shrink-0 text-slate-400" />

              <input
                type="password"
                placeholder="Enter your password"
                required
                autoComplete="current-password"
                className="w-full min-w-0 bg-transparent py-3 text-white outline-none placeholder:text-slate-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <p
              role="alert"
              className="mb-5 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Sign In"}
          </button>

          <p className="mt-6 text-center text-xs text-slate-500">
            Secure portfolio administration
          </p>
        </form>
      </div>
    </main>
  );
}

export default Login;
