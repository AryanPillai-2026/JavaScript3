function register() {
    const n = document.getElementById('r-name').value;
    const c = parseInt(document.getElementById('r-count').value);
    const evs = document.querySelectorAll('.ev:checked');
    if(!n || isNaN(c) || evs.length === 0) return alert("Fill all fields");
    let total = 0;
    evs.forEach(e => total += parseInt(e.getAttribute('data-p')));
    const summary = document.getElementById('reg-summary');
    summary.innerHTML = `<h3>Confirmed</h3><p>Name: ${n}</p><p>Total: $${total * c}</p>`;
    summary.classList.remove('hidden');
}