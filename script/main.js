function addtoCart (index) {
    const donut = donuts[index];

    if (cartData[donut.name]) {
        cartData[donut.name].quantity += 1;
    } else {
        cartData[donut.name] = {
            quantity: 1,
            price: donut.price,
        }
    }
    subtotal += donut.price;
    openCart();
    updateCart();
}

function deleteItem(itemName) { 
    let item = cartData[itemName];
    item.quantity -= 1;
    subtotal -= item.price;

    if (item.quantity === 0) {
        delete cartData[itemName];
    }
    updateCart();
}

function deleteBin(itemName) {
    delete cartData[itemName];

    updateCart();
}

function toggleCart() {
    let cartElement = document.getElementById('cart');
    cartElement.classList.toggle('show');

    updateCart();
}

function openCart() {
    let cartElement = document.getElementById('cart');
    cartElement.classList.add('show');
}

function closeCart() {
    let cartElement = document.getElementById('cart');
    cartElement.classList.remove('show');
}

function clearLocalStorage() {

    cartData = {};
    subtotal = 0;

    localStorage.removeItem('cartData');
    localStorage.removeItem('subtotal');

    updateCart();

    let message = document.getElementById('message');
    message.textContent = 'Vielen Dank für Ihre Bestellung!';
    setTimeout(() => {
        message.textContent = '';
        closeCart();
    }, 3000);
}