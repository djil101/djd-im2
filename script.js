const main_image = document.querySelector("#main_image");
const nowContainer = document.querySelector("#uv-now");
const forecastContainer = document.querySelector("#uv-forecast");
const arrow = document.querySelector("#uv-arrow");

// Verfügbare Städte mit Koordinaten
const cities = [
  { name: "Zürich", lat: 47.3769, lon: 8.5417 },
  { name: "Bern", lat: 46.9481, lon: 7.4474 },
  { name: "Chur", lat: 46.8508, lon: 9.5310 } // ✅ ersetzt Genf
];

let currentCityIndex = 0;
let myData = null;

// Uhrzeit umformatieren (z. B. "14 Uhr")
function formatTime(isoString) {
  const date = new Date(isoString);
  const hours = date.getHours();
  return `${hours} Uhr`;
}

// API-Link je nach Stadt
function buildApiUrl(city) {
  return `https://currentuvindex.com/api/v1/uvi?latitude=${city.lat}&longitude=${city.lon}`;
}

// Daten holen
async function fetchData(url) {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (e) {
    console.error("API-Fehler:", e);
    return null;
  }
}

// Stadtname im UI updaten
function updateCityName(name) {
  document.querySelectorAll(".city-switch span:nth-child(2)").forEach(span => {
    span.textContent = name;
  });
}

// UV-Daten anzeigen
function showData() {
    
  if (!myData || !myData.now) return;

  const uviNow = myData.now.uvi;
  const imageNumber = Math.ceil(uviNow / 2);
  const isMobile = window.innerWidth <= 768;

  const imagePath = isMobile
    ? `/img/mobile/gross/${imageNumber}.svg`
    : `/img/desktop/gross/${imageNumber}.svg`;

  // Hauptbild setzen
  main_image.src = imagePath;

  // Pfeil auf Skala setzen
  const clamped = Math.max(1, Math.min(10, uviNow));
  const percent = (clamped - 1) * (100 / 9);
  arrow.style.left = `${percent}%`;

  // Jetzt-Block aktualisieren
  nowContainer.innerHTML = `
    <h1>Jetzt</h1>
    <img src="/img/desktop/anzeigen_sonne_desktop/${imageNumber}.svg" alt="UV jetzt">
    <h1>${uviNow}</h1>
  `;

  // Forecast-Block aufräumen & neu einfügen
  forecastContainer.innerHTML = "";

  for (let i = 0; i < 3; i++) {
    const forecast = myData.forecast[i];
    const forecastNumber = Math.ceil(forecast.uvi / 2);
    const formattedTime = formatTime(forecast.time);

    const card = document.createElement("div");
    card.classList.add("card-column");
    card.innerHTML = `
      <h2>${formattedTime}</h2>
      <img src="/img/mobile/anzeigen_sonne_mobile/${forecastNumber}.svg" alt="UV ${formattedTime}" style="height: 50px;">
      <h2>${forecast.uvi}</h2>
    `;
    forecastContainer.appendChild(card);
  }
}

// Daten für eine bestimmte Stadt laden
async function loadCityData(index) {
  const city = cities[index];
  const url = buildApiUrl(city);
  const data = await fetchData(url);
  if (data) {
    myData = data;
    updateCityName(city.name);
    showData();
  }
}

// Stadtwechsel auslösen
function changeCity(direction) {
  if (direction === "left") {
    currentCityIndex = (currentCityIndex - 1 + cities.length) % cities.length;
  } else if (direction === "right") {
    currentCityIndex = (currentCityIndex + 1) % cities.length;
  }
  loadCityData(currentCityIndex);
}

// Pfeil-Events für beide .city-switch-Container (Mobile + Desktop)
document.querySelectorAll(".city-switch").forEach(switchEl => {
  const spans = switchEl.querySelectorAll("span");
  if (spans.length === 3) {
    spans[0].addEventListener("click", () => changeCity("left"));  // «
    spans[2].addEventListener("click", () => changeCity("right")); // »
  }
});

// Reaktion auf Bildschirmgröße (z. B. Mobile ↔ Desktop Wechsel)
window.addEventListener("resize", () => {
  showData(); // neu rendern je nach Größe
});

// Initial laden
loadCityData(currentCityIndex);
