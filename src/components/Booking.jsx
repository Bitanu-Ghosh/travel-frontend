import { useParams } from "react-router-dom";
import { useState } from "react";

export default function Booking() {
  const { id } = useParams();
  const [form, setForm] = useState({ name: "", email: "", travelers: 1 });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => { e.preventDefault(); alert(`Booking confirmed for ${form.name}! 🎉`); };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Book Destination #{id}</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Your Name" className="border p-2 rounded w-full" />
        <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" className="border p-2 rounded w-full" />
        <input name="travelers" type="number" value={form.travelers} onChange={handleChange} placeholder="No. of Travelers" className="border p-2 rounded w-full" />
        <button className="bg-green-600 text-white px-4 py-2 rounded">Confirm Booking</button>
      </form>
    </div>
  );
}
