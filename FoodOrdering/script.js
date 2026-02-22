let order = [];

function add(name, price) {
    const item = order.find(i => i.name === name);
    if (item) {
        item.qty++;
    } else {
        order.push({ name, price, qty: 1 });
    }
    renderOrder();
}

function renderOrder() {
    const list = document.getElementById('order-list');
    const btn = document.getElementById('checkout-btn');
    list.innerHTML = "";
    let total = 0;
    
    order.forEach((item, i) => {
        total += item.price * item.qty;
        list.innerHTML += `
            <div style="display:flex; justify-content:space-between; padding:5px 0;">
                <span>${item.name} (x${item.qty}) - $${item.price * item.qty}</span>
                <button style="width:auto; padding:2px 8px;" onclick="remove(${i})">x</button>
            </div>`;
    });
    
    document.getElementById('f-total').innerText = total;
    btn.style.display = order.length > 0 ? "block" : "none";
}

function remove(index) {
    order.splice(index, 1);
    renderOrder();
}

function showCheckout() {
    document.getElementById('menu-view').classList.add('hidden');
    document.getElementById('checkout-view').classList.remove('hidden');
}

function hideCheckout() {
    document.getElementById('checkout-view').classList.add('hidden');
    document.getElementById('menu-view').classList.remove('hidden');
}

function confirmOrder() {
    const name = document.getElementById('f-name').value;
    const addr = document.getElementById('f-addr').value;
    const phone = document.getElementById('f-phone').value;
    const email = document.getElementById('f-email').value;

    if (name && addr && phone.length >= 10 && email.includes('@')) {
        showReceipt(name, addr, phone, email);
    } else {
        alert("Please complete all fields correctly.");
    }
}

function showReceipt(name, addr, phone, email) {
    document.getElementById('checkout-view').classList.add('hidden');
    const view = document.getElementById('receipt-view');
    const details = document.getElementById('receipt-details');
    
    let total = 0;
    let itemsHtml = "<ul>";
    order.forEach(item => {
        itemsHtml += `<li>${item.name} x ${item.qty} - $${item.price * item.qty}</li>`;
        total += item.price * item.qty;
    });
    itemsHtml += "</ul>";

    details.innerHTML = `
        <p><strong>Customer:</strong> ${name}</p>
        <p><strong>Deliver To:</strong> ${addr}</p>
        <p><strong>Contact:</strong> ${phone} | ${email}</p>
        <hr>
        <p><strong>Ordered Items:</strong></p>
        ${itemsHtml}
        <p><strong>Total Paid: $${total}</strong></p>
    `;
    
    view.classList.remove('hidden');
}