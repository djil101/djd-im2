const main_image = document.querySelector("#main_image");
const nowContainer = document.querySelector("#uv-now");
const forecastContainer = document.querySelector("#uv-forecast");
const arrow = document.querySelector("#uv-arrow");
const dotsMobile = document.querySelector(".dots.mobile-only");
const dotsDesktop = document.querySelector(".dots.desktop-only");
const leftContainer = document.querySelector(".left");

const cities = [
  { name: "Zürich", lat: 47.3769, lon: 8.5417 },
  { name: "Chur", lat: 46.8508, lon: 9.531 },
  { name: "Bern", lat: 46.9481, lon: 7.4474 },
];

let currentCityIndex = 0;
let myData = null;

function formatTime(isoString) {
  const date = new Date(isoString);
  const hours = date.getHours();
  return `${hours} Uhr`;
}

function buildApiUrl(city) {
  return `https://currentuvindex.com/api/v1/uvi?latitude=${city.lat}&longitude=${city.lon}`;
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

function updateCityName(name) {
  document
    .querySelectorAll(".city-switch span:nth-child(2)")
    .forEach((span) => {
      span.classList.add("fade");
      setTimeout(() => {
        span.textContent = name;
        span.classList.remove("fade");
      }, 200);
    });
}
function getBackgroundColorForImage(imageNumber) {
  switch (imageNumber) {
    case 1:
      return "#0246C2";
    case 2:
      return "#72B932";
    case 3:
      return "#FAAB13";
    case 4:
      return "#E05B02";
    case 5:
      return "#7A0505";
    default:
      return "#000000";
  }
}
function showData() {
  if (!myData || !myData.now) return;

  // Fading
  main_image.style.opacity = 0;
  nowContainer.style.opacity = 0;
  forecastContainer.style.opacity = 0;
  arrow.style.opacity = 0;
  dotsMobile.style.opacity = 0;
  dotsDesktop.style.opacity = 0;

  const isMobile = window.innerWidth <= 768;
  const uviNow = myData.now.uvi;
  const imageNumber = Math.ceil(uviNow / 2);
  const cityName = cities[currentCityIndex].name.toLowerCase();

  main_image.src = isMobile
    ? `/img/mobile/gross/${imageNumber}.svg`
    : `/img/desktop/gross/${imageNumber}.svg`;

  leftContainer.style.backgroundColor = getBackgroundColorForImage(imageNumber);
  dotsMobile.src = `/img/mobile/punkte_${cityName}_mobile.svg`;
  dotsDesktop.src = `/img/desktop/punkte_${cityName}_desktop.svg`;

  const clamped = Math.max(1, Math.min(10, uviNow));
  arrow.style.left = `${(clamped - 1) * (100 / 9)}%`;

  nowContainer.innerHTML = `
    <h1>Jetzt</h1>
    <img src="/img/desktop/anzeigen_sonne_desktop/${imageNumber}.svg" alt="UV jetzt">
    <h1>${uviNow}</h1>
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

  setTimeout(() => {
    main_image.style.opacity = 1;
    nowContainer.style.opacity = 1;
    forecastContainer.style.opacity = 1;
    arrow.style.opacity = 1;
    dotsMobile.style.opacity = 1;
    dotsDesktop.style.opacity = 1;
  }, 150);
}

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

function changeCity(direction) {
  if (direction === "left") {
    currentCityIndex = (currentCityIndex - 1 + cities.length) % cities.length;
  } else {
    currentCityIndex = (currentCityIndex + 1) % cities.length;
  }
  loadCityData(currentCityIndex);
}

document.querySelectorAll(".city-switch").forEach((switchEl) => {
  const spans = switchEl.querySelectorAll("span");
  if (spans.length === 3) {
    spans[0].addEventListener("click", () => changeCity("left"));
    spans[2].addEventListener("click", () => changeCity("right"));
  }
});

window.addEventListener("resize", () => {
  showData();
});

loadCityData(currentCityIndex);
