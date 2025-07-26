let cartData = {};
let subtotal = 0;
let deliveryCost = 2.5;

function Init() {
    loadLocalStorageCart();
    renderDonuts();
    updateCart();
}

function loadLocalStorageCart() {
    const storedCart = localStorage.getItem('cartData');
    const storedSubtotal = localStorage.getItem('subtotal');

    if (storedCart && storedSubtotal) {
        cartData = JSON.parse(storedCart);
        subtotal = parseFloat(storedSubtotal);
    } else {
        cartData = {};
        subtotal = 0;
    }
}

function renderDonuts() {
    let donutContainer = document.getElementById('Donuts');
    donuts.forEach((donut,i) => {
        donutContainer.innerHTML += generateDonutHTML(donut, i);
    });
}

function generateDonutHTML(donut, index) {
    const count = cartData[donut.name]?.quantity || 0;
    return `
        <div class="donutContainer">
            <div>
                <h3>${donut.name}</h3>
                <p>${donut.description}</p>
                <p>Preis: ${donut.price.toFixed(2)}</p>
            </div>
            <div class="imgAddToCart"><button class="addToCart" onclick="addtoCart(${index});"><span id="cartCount-${index}">${count}</span></button><img class="imgDonut" src="${donut.image}" alt="${donut.name}"></div>
        </div>
    `;
}

function updateCart() {
    subtotal = 0;
    let cartHTML;
    if (Object.keys(cartData).length === 0) {
        cartHTML = renderEmptyCart();
    } else {
        cartHTML = renderFullCart();
    }
    document.getElementById('cartItems').innerHTML = cartHTML;
    localStorage.setItem('cartData', JSON.stringify(cartData));
    localStorage.setItem('subtotal', subtotal.toFixed(2));

    cartCount();
}

function renderEmptyCart() {
    document.getElementById('subtotal').textContent = '0.00 €';
    document.getElementById('deliveryCost').textContent = '0.00 €';
    document.getElementById('totalPrice').textContent = '0.00 €';
    return '<p class="cart-item">Der Warenkorb ist leer!</p>';
}

function renderFullCart() {
    let html = '';
        for (let itemName in cartData) {
            let item = cartData[itemName];
            let itemTotal = item.quantity * item.price;
            subtotal+= itemTotal;
            const i= donuts.findIndex (donut => donut.name === itemName);
            html += generateCartItemHTML(item, itemName, itemTotal, i);
        }
    updateCartTotals();
    return html;
}

function generateCartItemHTML(item, itemName, itemTotal, donutIndex) {
    return `
        <div class="cart-item">
            <span class="plusMinusCart" onclick="deleteItem ('${itemName}')">&#8722;</span>
            <span>${item.quantity}×</span>
            <span class="plusMinusCart" onclick="addtoCart(${donutIndex})">&#43;</span>
            <span>${itemName}</span>
            <span>${itemTotal.toFixed(2)} €</span>
            <img src="./assets/icons/loschen.png" alt="Löschen" class="deleteIcon" onclick="deleteBin('${itemName}');">
        </div>
    `;
}

function updateCartTotals() {
    document.getElementById('subtotal').textContent = `${subtotal.toFixed(2)} €`;
    document.getElementById('deliveryCost').textContent = `${deliveryCost.toFixed(2)} €`;
    const total = subtotal + deliveryCost;
    document.getElementById('totalPrice').textContent = `${total.toFixed(2)} €`;
}