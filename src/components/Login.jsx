import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔍 DEBUG: check API URL on Vercel
  useEffect(() => {
    console.log("✅ VITE_API_URL =", API_URL);
    if (!API_URL) {
      alert("❌ API URL missing. Check Vercel Environment Variables.");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const loginUrl = `${API_URL}/api/auth/login`;
      console.log("➡️ LOGIN REQUEST TO:", loginUrl);

      const res = await fetch(loginUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      console.log("⬅️ LOGIN RESPONSE:", data);

      if (!res.ok) {
        alert(data.error || "Login failed");
        return;
      }

      // ✅ SAVE TOKEN
      localStorage.setItem("token", data.token);

      console.log(
        "🔐 TOKEN SAVED:",
        localStorage.getItem("token")
      );

      alert("Login successful ✅");
      navigate(redirectTo, { replace: true });

    } catch (err) {
      console.error("❌ LOGIN ERROR:", err);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 border rounded shadow"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 mb-3 rounded"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-4 rounded"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600 text-white p-2 rounded"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="mt-4 text-center">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-purple-600">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
