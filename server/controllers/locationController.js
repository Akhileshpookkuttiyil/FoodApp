import fetch from "node-fetch";

export const reverseGeocode = async (req, res) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ error: "Missing lat or lon" });
  }

  try {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
    const response = await fetch(url, {
      headers: {
        "User-Agent": "MyLocationApp/1.0 (akhileshpookkuttiyil@gmail.com)",
      },
    });

    if (!response.ok) {
      console.error(
        `Nominatim error ${response.status}: ${response.statusText}`
      );
      return res
        .status(response.status)
        .json({ error: "Failed to fetch from Nominatim" });
    }

    const data = await response.json();

    if (!data || !data.address) {
      return res
        .status(404)
        .json({ error: "No address found for coordinates" });
    }

    res.json(data);
  } catch (err) {
    console.error("Internal error during reverse geocoding:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
