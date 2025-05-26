const main_image = document.querySelector("#main_image");
const nowContainer = document.querySelector("#uv-now");
const forecastContainer = document.querySelector("#uv-forecast");

// Zürich Koordinaten
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

  // Aktueller UV-Wert
  const uviNow = myData.now.uvi;
  const imageNumber = Math.ceil(uviNow / 2);

  // GROSSES Bild links
  main_image.src = `/img/desktop/gross/${imageNumber}.svg`;

  // "Jetzt"-Karte
  let nowCard = document.createElement("div");
  nowCard.classList.add("card");
  nowCard.innerHTML = `
    <img src="/img/desktop/anzeigen_sonne_desktop/${imageNumber}.svg" alt="UV jetzt">
    <p>${uviNow}</p>
  `;
  nowContainer.appendChild(nowCard);

  // Prognosekarten
  for (let i = 0; i < 3; i++) {
    const forecast = myData.forecast[i];
    const forecastNumber = Math.ceil(forecast.uvi / 2);

    let card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <p>${forecast.time}</p>
      <img src="/img/mobile/anzeigen_sonne_mobile/${forecastNumber}.svg" alt="UV ${forecast.time}">
      <p>${forecast.uvi}</p>
    `;
    forecastContainer.appendChild(card);
  }
}

showData();
