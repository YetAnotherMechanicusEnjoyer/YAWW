const API_KEY = "X9J8SSSKA93WJLRGZR6KMT62N";

const map = L.map('map').setView([20, 0], 3);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

map.on('click', async (e) => {
  const lat = e.latlng.lat;
  const lon = e.latlng.lng;

  if (isNaN(lat) || isNaN(lon)) {
    console.error("Invalid lat/lon:", lat, lon);
    return;
  }

  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lon}/today?unitGroup=metric&key=${API_KEY}&include=current`;

  try {
    const res = await fetch(url);
    const json = await res.json();

    if (!json.currentConditions) {
      console.error("API error:", json);
      alert(`Weather data unavailable. ${json.message || 'Check your API key or location.'}`);
      return;
    }

    const current = json.currentConditions;
    const popupContent = `
      <strong>Weather at (${lat.toFixed(2)}, ${lon.toFixed(2)}):</strong><br>
      🌡️ Temp: ${current.temp}°C<br>
      💧 Humidity: ${current.humidity}%<br>
      🌬️ Wind Speed: ${current.windspeed} km/h
    `;

    L.popup()
      .setLatLng([lat, lon])
      .setContent(popupContent)
      .openOn(map);
  } catch (error) {
    console.error("Error fetching weather: ", error);
    alert("Could not load weather data.");
  }
});
