

const apiKey = "ce1179f06940c8ccf6e4252f85456207"; // replace with OpenWeatherMap key

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherResult");
const loading = document.getElementById("loading");

searchBtn.addEventListener("click", getWeather);

async function getWeather() {
  const city = cityInput.value.trim();
  if (!city) {
    alert("Please enter a city name!");
    return;
  }

  loading.style.display = "block";
  weatherResult.innerHTML = "";

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();

    if (data.cod !== 200) {
      weatherResult.innerHTML = `<p>❌ City not found</p>`;
      loading.style.display = "none";
      return;
    }

    const { main, weather, name } = data;
    const temp = main.temp;
    const desc = weather[0].description;
    const icon = weather[0].icon;

    weatherResult.innerHTML = `
      <h2>${name}</h2>
      <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="icon">
      <p>${desc}</p>
      <p>🌡 ${temp} °C</p>
    `;

    setBackground(desc);

  } catch (error) {
    weatherResult.innerHTML = `<p>Error fetching data.</p>`;
  } finally {
    loading.style.display = "none";
  }
}

function setBackground(desc) {
  let body = document.body;

  if (desc.includes("cloud")) {
    body.style.backgroundImage = "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb')";
  } else if (desc.includes("rain")) {
    body.style.backgroundImage = "url('https://images.unsplash.com/photo-1527766833261-b09c3163a791')";
  } else if (desc.includes("clear")) {
    body.style.backgroundImage = "url('https://images.unsplash.com/photo-1502082553048-f009c37129b9')";
  } else if (desc.includes("snow")) {
    body.style.backgroundImage = "url('https://images.unsplash.com/photo-1608889175123-1c62024b02a8')";
  } else {
    body.style.backgroundImage = "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb')";
  }
}
