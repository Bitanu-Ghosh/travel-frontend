import { Link } from "react-router-dom";
import { DESTINATIONS } from "../data/destinations";

export default function Destinations() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Popular Destinations</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {DESTINATIONS.map(dest => (
          <div key={dest.slug} className="border rounded-lg shadow-md p-4 hover:shadow-lg">
            <img src={dest.image} alt={dest.name} className="w-full h-40 object-cover rounded" />
            <h2 className="text-lg font-semibold mt-2">{dest.name}</h2>
            <p className="text-amber-400">{dest.short}</p>
            <Link to={`/destinations/${dest.slug}`} className="inline-block mt-2 text-blue-600 hover:underline">
              View Details →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
