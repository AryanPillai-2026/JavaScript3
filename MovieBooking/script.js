let selectedSeats = [];
function validateUser() {
    const name = document.getElementById('username').value;
    const mob = document.getElementById('mobile').value;
    const mail = document.getElementById('email').value;
    if(name && mob.length >= 10 && mail.includes('@')) {
        document.getElementById('user-section').classList.add('hidden');
        document.getElementById('booking-section').classList.remove('hidden');
        renderSeats();
    } else alert("Invalid Details");
}
function renderSeats() {
    const grid = document.getElementById('seating-grid');
    for(let i=1; i<=20; i++) {
        const s = document.createElement('div');
        s.className = 'seat';
        s.innerText = i;
        if(i % 5 === 0) s.classList.add('booked');
        s.onclick = () => {
            if(s.classList.contains('booked')) return;
            s.classList.toggle('selected');
            if(s.classList.contains('selected')) selectedSeats.push(i);
            else selectedSeats = selectedSeats.filter(x => x !== i);
            document.getElementById('total-price').innerText = selectedSeats.length * document.getElementById('movie-select').value;
        };
        grid.appendChild(s);
    }
}
function showConfirmation() {
    if(selectedSeats.length === 0) return alert("Select a seat");
    const sect = document.getElementById('summary-section');
    sect.innerHTML = `<div class="summary-box"><h3>Summary</h3><p>Seats: ${selectedSeats.join(', ')}</p><p>Total: $${document.getElementById('total-price').innerText}</p></div>`;
    document.getElementById('booking-section').classList.add('hidden');
    sect.classList.remove('hidden');
}