import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import api from "../../services/api";

const fieldWrapper =
  "flex items-center gap-3 rounded-xl border border-line bg-[var(--bg)] px-3 " +
  "transition-colors focus-within:border-[var(--accent)] focus-within:ring-2 " +
  "focus-within:ring-[var(--accent)]/20";

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
    <main className="grid min-h-screen place-items-center px-4 py-8">
      <div className="w-full max-w-md">
        <form onSubmit={handleLogin} className="bento p-6 sm:p-10">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-[var(--soft)] text-accent">
              <ShieldCheck size={28} />
            </div>

            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Admin Login
            </h1>

            <p className="mt-2 text-sm text-muted">
              Sign in to manage your portfolio
            </p>
          </div>

          <div className="mb-5">
            <label htmlFor="admin-email" className="mb-2 block text-sm font-semibold">
              Email address
            </label>

            <div className={fieldWrapper}>
              <Mail size={18} className="shrink-0 text-muted" />

              <input
                id="admin-email"
                type="email"
                placeholder="Enter your email"
                required
                autoComplete="username"
                className="w-full min-w-0 bg-transparent py-3 outline-none placeholder:text-[var(--muted)]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="admin-password" className="mb-2 block text-sm font-semibold">
              Password
            </label>

            <div className={fieldWrapper}>
              <LockKeyhole size={18} className="shrink-0 text-muted" />

              <input
                id="admin-password"
                type="password"
                placeholder="Enter your password"
                required
                autoComplete="current-password"
                className="w-full min-w-0 bg-transparent py-3 outline-none placeholder:text-[var(--muted)]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <p
              role="alert"
              className="mb-5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-600 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Sign in"}
          </button>

          <Link
            to="/"
            className="mt-6 flex items-center justify-center gap-2 text-sm text-muted transition-colors hover:text-[var(--accent)]"
          >
            <ArrowLeft size={14} />
            Back to portfolio
          </Link>
        </form>
      </div>
    </main>
  );
}

export default Login;