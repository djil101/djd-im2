const main_image = document.querySelector("#main_image");
const nowContainer = document.querySelector("#uv-now");
const forecastContainer = document.querySelector("#uv-forecast");

const API_URL = "https://currentuvindex.com/api/v1/uvi?latitude=47.3769&longitude=8.5417"; // Zürich

async function fetchData(url) {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (e) {
    console.error(e);
    return [];
  }
}

const myData = await fetchData(API_URL);

function showData() {
  const uviNow = myData.now.uvi;
  const imageNumber = Math.ceil(uviNow / 2);

  // Bild ändern
  main_image.src = `/img/desktop/Sonne Desktop/${imageNumber}.svg`;

  // Aktuell
  let nowCard = document.createElement("div");
  nowCard.classList.add("card");
  nowCard.innerHTML = `
    <img src="/img/desktop/anzeigen_sonne_desktop/${imageNumber}.svg" alt="UV jetzt">
    <p>${uviNow}</p>
  `;
  nowContainer.appendChild(nowCard);

  // Forecast
  for (let i = 0; i < 3; i++) {
    const time = myData.forecast[i].time;
    const uvi = myData.forecast[i].uvi;
    const num = Math.ceil(uvi / 2);

    let card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <p>${time}</p>
      <img src="/img/mobile/anzeigen_sonne_mobile/${num}.svg" alt="UV Forecast">
      <p>${uvi}</p>
    `;
    forecastContainer.appendChild(card);
  }
}

showData();
