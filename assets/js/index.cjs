const API_KEY = "X9J8SSSKA93WJLRGZR6KMT62N"

document.getElementById('city-form').addEventListener('submit', async function (event) {
  event.preventDefault();

  const formData = {
    city: document.querySelector('input[name="city"]').value,
    unit: document.querySelector('select[name="units"]').value,
  };

  try {
    const res = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${formData.city}?unitGroup=${formData.unit}&key=${API_KEY}&contentType=json`);
    const json = await res.json();

    if (!json.currentConditions) {
      console.error("API error:", json);
      alert(`Weather data unavailable. ${json.message || 'Check your API key or location.'}`);
      return;
    }

    const current = json.currentConditions;
    const div = document.getElementById('city-weather');

    const content = `<p>
      <strong>Weather in ${formData.city}:</strong><br>
      🌡️ Temp: ${current.temp}${formData.unit === "US" ? "°F" : "°C"}<br>
      💧 Humidity: ${current.humidity}%<br>
      🌬️ Wind Speed: ${current.windspeed} ${formData.unit === "metric" ? "km/h" : "miles/h"}
      </p>
    `;

    div.innerHTML = content;
  } catch (error) {
    console.error('Erreur:', error);
    alert('Connexion Failed.');
  }
});
