function enroll() {
    const n = document.getElementById('s-name').value;
    const id = document.getElementById('s-id').value;
    const selected = document.querySelectorAll('.crs:checked');
    if(!n || !id || selected.length === 0) return alert("Fill all details");
    let fee = 0;
    selected.forEach(c => fee += parseInt(c.value));
    const msg = document.getElementById('final-msg');
    msg.innerHTML = `<h3>Success</h3><p>${n} (${id})</p><p>Total Fee: $${fee}</p>`;
    msg.classList.remove('hidden');
}
