import { useEffect } from "react";
import "./index.css";

function App() {
  useEffect(() => {
    getInfo();
  }, []);

  const getInfo = async () => {
    try {
      const response = await fetch("https://ipapi.co/json/");
      const ipData = await response.json();

      console.log("IP Information");
      console.log(ipData);

      if (!navigator.geolocation) {
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          const mapUrl = `https://www.google.com/maps?q=${lat},${lon}`;

          console.log(mapUrl);

          await fetch("http://localhost:5000/api/location", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ip: ipData.ip,
              city: ipData.city,
              country: ipData.country_name,
              latitude: lat,
              longitude: lon,
              mapUrl,
            }),
          });

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