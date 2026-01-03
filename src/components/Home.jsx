import { Link } from "react-router-dom";
import { DESTINATIONS } from "../data/destinations";

export default function Home() {
  return (
    <section className="container mx-auto py-10">
      <div className="rounded-3xl bg-gradient-to-tr from-blue-600 to-indigo-600 p-8 text-white">
        <h1 className="text-3xl md:text-4xl font-bold">
          Plan smart. Travel smarter.
        </h1>
        <p className="mt-2 text-white/90">
          Find destinations, generate itineraries with AI, and book your next trip.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex gap-5">
          <Link
            to="/destinations"
            className="btn btn-primary bg-white text-black hover:bg-white/90"
          >
            Explore Destinations
          </Link>

          <Link
            to="/contact"
            className="btn btn-primary bg-white text-black hover:bg-white/90"
          >
            Contact Us
          </Link>
        </div>
      </div>

      {/* Popular Picks */}
      <h2 className="mt-10 mb-4 text-xl font-semibold">Popular Picks</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {DESTINATIONS.map((d) => (
          <Link
            key={d.slug}
            to={`/destinations/${d.slug}`}
            className="card overflow-hidden"
          >
            <img
              src={d.image}
              alt={d.name}
              className="h-44 w-full object-cover"
            />
            <div className="mt-3">
              <h3 className="text-lg font-semibold">{d.name}</h3>
              <p className="text-sm text-amber-300">{d.short}</p>
              <div className="mt-3 flex items-center justify-between text-sm">
                <span className="font-medium">From ₹{d.priceFrom}</span>
                <span className="text-fuchsia-400">{d.days} Days</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
