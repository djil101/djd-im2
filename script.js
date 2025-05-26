const main_image = document.querySelector("#main_image"); 
const nowContainer = document.querySelector("#uv-now");
const forecastContainer = document.querySelector("#uv-forecast");

const API_URL = "https://currentuvindex.com/api/v1/uvi?latitude=47.3769&longitude=8.5417";

// Zeit formatieren: ISO ➜ „17:00 Uhr“
function formatTime(isoString) {
  const date = new Date(isoString);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes} Uhr`;
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

  // Jetzt-Anzeige
  nowContainer.innerHTML = `
    <h3>Jetzt</h3>
    <img src="/img/desktop/anzeigen_sonne_desktop/${imageNumber}.svg" alt="UV jetzt">
    <h3>${uviNow}</h3>
  `;

  // Prognoseanzeige (formatierte Uhrzeiten)
  forecastContainer.innerHTML = "";
  for (let i = 0; i < 3; i++) {
    const forecast = myData.forecast[i];
    const forecastNumber = Math.ceil(forecast.uvi / 2);
    const formattedTime = formatTime(forecast.time);

    const card = document.createElement("div");
    card.classList.add("card-column");
    card.innerHTML = `
      <h3>${formattedTime}</h3>
      <img src="/img/mobile/anzeigen_sonne_mobile/${forecastNumber}.svg" alt="UV ${formattedTime}">
      <h3>${forecast.uvi}</h3>
    `;
    forecastContainer.appendChild(card);
  }
}

showData();
