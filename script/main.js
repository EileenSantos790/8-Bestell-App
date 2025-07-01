
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
