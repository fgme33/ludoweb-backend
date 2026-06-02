const API_URL = '/ludoweb/api';
let carrito = JSON.parse(localStorage.getItem('ludo_carrito')) || [];

document.addEventListener('DOMContentLoaded', () => {
    renderizarListaSolicitud();
    const form = document.getElementById('form-solicitud');
    if (form) form.addEventListener('submit', enviarSolicitud);
});

function renderizarListaSolicitud() {
    const listaGroup = document.querySelector('.list-group');
    if (!listaGroup) return;
    listaGroup.innerHTML = '';

    if (carrito.length === 0) {
        listaGroup.innerHTML = '<li class="list-group-item text-center py-4 text-muted">No has seleccionado ningún juego aún.</li>';
        return;
    }

    carrito.forEach((juego, index) => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
            <div><strong>${juego.titulo}</strong></div>
            <button onclick="eliminarJuego(${index})" class="btn btn-sm btn-outline-danger">Quitar</button>
        `;
        listaGroup.appendChild(li);
    });
}

function eliminarJuego(index) {
    carrito.splice(index, 1);
    localStorage.setItem('ludo_carrito', JSON.stringify(carrito));
    renderizarListaSolicitud();
}

function enviarSolicitud(e) {
    e.preventDefault();

    if (carrito.length === 0) {
        alert("Debes añadir al menos 1 juego.");
        return;
    }

    const stringJuegos = carrito.map(j => j.titulo).join(', ');

    const datosPayload = {
    nombre_cliente: document.getElementById('nombre_cliente').value,
    numero_jugadores: parseInt(document.getElementById('numero_jugadores').value),
    juegos_solicitados: stringJuegos,
    necesita_apoyo: document.getElementById('apoyo').checked ? true : false 
    };

    axios.post(`${API_URL}/solicitudes`, datosPayload)
        .then(response => {
            alert(`¡Solicitud enviada!\nCódigo Asignado: ${response.data.data.codigo}`);
            localStorage.removeItem('ludo_carrito');
            window.location.href = 'home.html';
        })
        .catch(error => {
            alert('Error en el servidor al procesar el préstamo.');
            console.error(error);
        });
}
