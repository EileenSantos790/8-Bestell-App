

function Init() {
    let donutContainer = document.getElementById('Donuts');

    donuts.forEach((donut) => {

        let donutHTML = `
            <div class="donutContainer">
                <div>
                    <h2>${donut.name}</h2>
                    <p>${donut.description}</p>
                    <p>Price: ${donut.price.toFixed(2)}</p>
                </div>
                <div><img class="imgDonut" src="${donut.image}" alt="${donut.name}"></div>
            </div>
        `;
        donutContainer.innerHTML += donutHTML;
        console.log(2, donutHTML);
    });
}