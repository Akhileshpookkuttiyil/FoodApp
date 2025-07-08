import axios from "axios";

const getCoordinatesFromAddress = async (address) => {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const res = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${apiKey}`
  );

  const location = res.data?.results?.[0]?.geometry?.location;
  return location ? { lat: location.lat, lng: location.lng } : null;
};
