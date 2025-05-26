const main_image = document.querySelector("#main_image");
const nowContainer = document.querySelector("#uv-now");
const forecastContainer = document.querySelector("#uv-forecast");

const API_URL = "https://currentuvindex.com/api/v1/uvi?latitude=47.3769&longitude=8.5417";

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

  // Jetzt
  nowContainer.innerHTML = `
    <h2>Jetzt</h2>
    <img src="/img/desktop/anzeigen_sonne_desktop/${imageNumber}.svg" alt="UV jetzt">
    <h2>${uviNow}</h2>
  `;

  // Prognose
  forecastContainer.innerHTML = "";
  for (let i = 0; i < 3; i++) {
    const forecast = myData.forecast[i];
    const forecastNumber = Math.ceil(forecast.uvi / 2);

    const card = document.createElement("div");
    card.classList.add("card-column");
    card.innerHTML = `
      <h2>${forecast.time}</h2>
      <img src="/img/mobile/anzeigen_sonne_mobile/${forecastNumber}.svg" alt="UV ${forecast.time}">
      <h2>${forecast.uvi}</h2>
    `;
    forecastContainer.appendChild(card);
  }
}

showData();
