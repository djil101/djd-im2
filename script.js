const main_image = document.querySelector("#main_image"); 
const nowContainer = document.querySelector("#uv-now");
const forecastContainer = document.querySelector("#uv-forecast");
const arrow = document.querySelector("#uv-arrow");

const API_URL = "https://currentuvindex.com/api/v1/uvi?latitude=47.3769&longitude=8.5417";

function formatTime(isoString) {
  const date = new Date(isoString);
  const hours = date.getHours();
  return `${hours} Uhr`;
}

async function fetchData(url) {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (e) {
    console.error("API-Fehler:", e);
    return null;
  }
}

const myData = await fetchData(API_URL);

function showData() {
  if (!myData || !myData.now) return;

  const uviNow = myData.now.uvi;
  const imageNumber = Math.ceil(uviNow / 2);
  main_image.src = `/img/desktop/gross/${imageNumber}.svg`;

  // Pfeilposition auf der Skala anpassen
  const clamped = Math.max(1, Math.min(10, uviNow));
  const percent = (clamped - 1) * (100 / 9); // gleichmässige Aufteilung für 1–10
  arrow.style.left = `${percent}%`;

  nowContainer.innerHTML = `
  <div class="card-column">
    <h1>Jetzt</h1>
    <img src="/img/desktop/anzeigen_sonne_desktop/${imageNumber}.svg" alt="UV jetzt" class="uv-icon">
    <h1>${uviNow}</h1>
  </div>
`;

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

showData();
