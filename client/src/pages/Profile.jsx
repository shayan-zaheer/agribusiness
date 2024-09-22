import { useEffect, useState } from "react";
import { getNearestCity } from "../utils/haversine";

function Profile() {
  const [locationMessage, setLocationMessage] = useState("");
  const [nearestCity, setNearestCity] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, showError);
    } else {
      setLocationMessage("Geolocation is not supported by this browser.");
    }
  }, []);

  async function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log(latitude, longitude)
    
    const nearest = await getNearestCity(latitude, longitude);
    if (nearest) {
      setNearestCity(nearest);
    } else {
      setLocationMessage("No city found nearby.");
    }
  }

  function showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        setLocationMessage("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        setLocationMessage("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        setLocationMessage("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        setLocationMessage("An unknown error occurred.");
        break;
      default:
        setLocationMessage("An error occurred.");
    }
  }

  return (
    <div>
      <h1>Profile</h1>
      <p>{locationMessage}</p>
      {nearestCity && (
        <p>City: {nearestCity.name}, {nearestCity.province}</p>
      )}
    </div>
  );
}

export default Profile;
