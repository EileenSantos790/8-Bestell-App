let cartData = {};
let subtotal = 0;
let deliveryCost = 2.5;


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
                <div>
                    <img src="./assets/icons/plus.png" 
                        alt="Add to cart" 
                        class="addToCart" 
                        onclick="addtoCart(${donuts.indexOf(donut)});">
                    <img class="imgDonut" src="${donut.image}" alt="${donut.name}">
                </div>
            </div>
        `;
        donutContainer.innerHTML += donutHTML;
        console.log(2, donutHTML);
    });
}

function updateCart() {

    let cartHTML = '';

    if (Object.keys(cartData).length === 0) {
        cartHTML = '<p class="cart-item">Der Warenkorb ist leer!</p>';
        document.getElementById('subtotal').textContent = '0.00 €';
        document.getElementById('deliveryCost').textContent = '0.00 €';
        document.getElementById('totalPrice').textContent = '0.00 €';
    } else {
        for (let itemName in cartData) {
            let item = cartData[itemName];
            let itemTotal = item.quantity * item.price;
            cartHTML += `
                <div class="cart-item">
                    <span>${item.quantity}×</span>
                    <span>${itemName}</span>
                    <span>${itemTotal.toFixed(2)} €</span>
                    <img src="./assets/icons/loschen.png" 
                    alt="Löschen"
                    class="deleteIcon" 
                    onclick="deleteItem('${itemName}');">
                </div>
            `;
        }

        document.getElementById('subtotal').textContent = `${subtotal.toFixed(2)} €`;
        document.getElementById('deliveryCost').textContent = `${deliveryCost.toFixed(2)} €`;
        const total = subtotal + deliveryCost;
        document.getElementById('totalPrice').textContent = `${total.toFixed(2)} €`;
    }

    document.getElementById('cartItems').innerHTML = cartHTML;
}