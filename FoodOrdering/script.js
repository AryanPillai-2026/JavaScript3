let order = [];
function add(n, p) {
    order.push({n, p});
    let t = 0;
    const list = document.getElementById('order-list');
    list.innerHTML = "";
    order.forEach(i => {
        t += i.p;
        list.innerHTML += `<div>${i.n}</div>`;
    });
    document.getElementById('f-total').innerText = t;
}
function confirm() {
    if(document.getElementById('f-addr').value && order.length > 0) {
        alert("Ordered Successfully!");
        location.reload();
    } else alert("Details missing");
}