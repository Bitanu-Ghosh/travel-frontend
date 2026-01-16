import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

export default function Dashboard() {
  const [trips, setTrips] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    fetch(`${API_URL}/api/myTrips`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(async (res) => {
        if (res.status === 401) {
          // 🔥 token invalid / expired
          localStorage.removeItem("token");
          navigate("/login");
          return [];
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setTrips(data);
        } else {
          setTrips([]);
        }
      })
      .catch(() => {
        alert("Failed to load trips");
      });
  }, [navigate]);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    if (!window.confirm("Delete this trip?")) return;

    const res = await fetch(`${API_URL}/api/trip/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!res.ok) {
      alert("Delete failed");
      return;
    }

    setTrips(trips.filter(trip => trip._id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Your Saved Trips</h1>

      {trips.length === 0 ? (
        <p>No trips saved yet.</p>
      ) : (
        <div className="space-y-4">
          {trips.map(trip => (
            <div
              key={trip._id}
              className="border p-4 rounded shadow flex flex-col gap-3"
            >
              <div>
                <h2 className="text-xl font-semibold">{trip.destination}</h2>
                <p className="text-gray-500">
                  {trip.days} days | Interest: {trip.interest}
                </p>

                <ul className="list-disc pl-6 mt-2">
                  {trip.plan.map((p, idx) => (
                    <li key={idx}>{p}</li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handleDelete(trip._id)}
                className="bg-red-600 text-white px-4 py-2 rounded w-fit"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
