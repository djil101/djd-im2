const container = document.querySelector("#uvindex");
const main_image = document.querySelector("#main_image img");
const nowContainer = document.querySelector("#uv-now");
const forecastContainer = document.querySelector("#uv-forecast");

const API_URL = "https://currentuvindex.com/api/v1/uvi?latitude=40.6943&longitude=-73.9249";

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
    let imageNumber = Math.ceil((myData.now.uvi / 2));
    console.log(imageNumber);
    // show momenta data
    let card = document.createElement("article");
    card.classList.add("card")
    card.innerHTML = `<h2>${myData.now.time}</h2>
    <img src="/img/desktop/anzeigen_sonne_desktop/${imageNumber}.svg">
            <p>${myData.now.uvi}</p>`
        ;
        nowContainer.appendChild(card); 

    main_image.src = `/img/desktop/gross/${imageNumber}.svg`;



    for (let i = 0; i <= 3; i++) {
        let forecastImageNumber = Math.ceil((myData.forecast[i].uvi / 2));
        let card = document.createElement("article");
        card.classList.add("card")
        card.innerHTML = `<h2>${myData.forecast[i].time}</h2>
        <img src="/img/mobile/anzeigen_sonne_mobile/${forecastImageNumber}.svg">
            <p>${myData.forecast[i].uvi}</p>`
            ;
        forecastContainer.appendChild(card);
        
    }

    // myData.forecast.forEach((element) => {
    //     let card = document.createElement("article");
    //     card.classList.add("card")
    //     card.innerHTML =  `<h2>${element.time}</h2>
    //     <p>${element.uvi}</p>`
    //     ;
    //     container.appendChild(card);
    // })
}

showData();