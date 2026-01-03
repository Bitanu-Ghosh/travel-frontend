import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged out successfully 👋");
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex gap-6 items-center">
      {/* Left side */}
      <Link to="/" className="hover:text-gray-300">
        Home
      </Link>

      {token && (
        <Link to="/destinations" className="hover:text-gray-300">
          Destinations
        </Link>
      )}

      {token && (
        <Link to="/dashboard" className="hover:text-gray-300">
          Dashboard
        </Link>
      )}

      <Link to="/contact" className="hover:text-gray-300">
        Contact
      </Link>

      {/* Right side */}
      <div className="ml-auto flex gap-4">
        {!token ? (
          <>
            <Link to="/login" className="hover:text-gray-300">
              Login
            </Link>
            <Link to="/signup" className="hover:text-gray-300">
              Signup
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
