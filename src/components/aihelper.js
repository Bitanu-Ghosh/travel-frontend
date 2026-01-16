const API_URL = import.meta.env.VITE_API_URL;

export async function generateItinerary(destination, days, interest) {
  try {
    const response = await fetch(`${API_URL}/api/itinerary`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ destination, days, interest })
    });

    const data = await response.json();

    if (data.itinerary) {
      return data.itinerary
        .split("\n")
        .filter(line => line.trim() !== "");
    } else {
      return ["AI could not generate itinerary"];
    }
  } catch (error) {
    console.error(error);
    return ["Server error. Try again later"];
  }
}
