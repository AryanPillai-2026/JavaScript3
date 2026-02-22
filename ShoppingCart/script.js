let cart = [];

function add(price, name) {
    const existing = cart.find(item => item.name === name);
    if (existing) {
        existing.qty++;
    } else {
        cart.push({name: name, price: price, qty: 1});
    }
    update();
}

function update() {
    const div = document.getElementById('cart-content');
    const btn = document.getElementById('checkout-btn');
    div.innerHTML = "";
    let total = 0;
    
    cart.forEach((item, i) => {
        total += item.price * item.qty;
        div.innerHTML += `
            <div style="display:flex; justify-content:space-between; margin-bottom:10px;">
                <span>${item.name} (x${item.qty}) - $${item.price * item.qty}</span>
                <button style="width:auto; padding:2px 10px;" onclick="remove(${i})">Remove</button>
            </div>`;
    });
    
    document.getElementById('cart-total').innerText = total;
    btn.style.display = cart.length > 0 ? "block" : "none";
}

function remove(i) {
    cart.splice(i, 1);
    update();
}

function showCheckout() {
    document.getElementById('shop-view').classList.add('hidden');
    document.getElementById('checkout-view').classList.remove('hidden');
}

function hideCheckout() {
    document.getElementById('checkout-view').classList.add('hidden');
    document.getElementById('shop-view').classList.remove('hidden');
}

function processCheckout() {
    const name = document.getElementById('u-name').value;
    const addr = document.getElementById('u-addr').value;
    const phone = document.getElementById('u-phone').value;
    const email = document.getElementById('u-email').value;

    if (name && addr && phone.length >= 10 && email.includes('@')) {
        displayFinalSummary(name, addr, phone, email);
    } else {
        alert("Please provide valid details for all fields");
    }
}

function displayFinalSummary(name, addr, phone, email) {
    document.getElementById('checkout-view').classList.add('hidden');
    const summaryView = document.getElementById('order-summary-view');
    const detailsDiv = document.getElementById('summary-details');
    
    let itemsHtml = "<ul>";
    let total = 0;
    cart.forEach(item => {
        itemsHtml += `<li>${item.name} x ${item.qty} - $${item.price * item.qty}</li>`;
        total += item.price * item.qty;
    });
    itemsHtml += "</ul>";

    detailsDiv.innerHTML = `
        <p><strong>Customer:</strong> ${name}</p>
        <p><strong>Shipping to:</strong> ${addr}</p>
        <p><strong>Contact:</strong> ${phone} | ${email}</p>
        <hr>
        <p><strong>Items:</strong></p>
        ${itemsHtml}
        <p><strong>Total Amount: $${total}</strong></p>
    `;
    
    summaryView.classList.remove('hidden');
}