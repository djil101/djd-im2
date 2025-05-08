const container = document.querySelector("#uvindex");

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
    // show momenta data
    let card = document.createElement("article");
    card.classList.add("card")
    card.innerHTML = `<h2>${myData.now.time}</h2>
            <p>${myData.now.uvi}</p>`
        ;
    container.appendChild(card);




    for (let i = 0; i <= 3; i++) {
        let card = document.createElement("article");
        card.classList.add("card")
        card.innerHTML = `<h2>${myData.forecast[i].time}</h2>
            <p>${myData.forecast[i].uvi}</p>`
            ;
        container.appendChild(card);
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