const API_URL = '/ludoweb/api';
let solicitudesTemporales = JSON.parse(localStorage.getItem('ludo_carrito')) || [];

document.addEventListener('DOMContentLoaded', () => {
    actualizarContador();
    cargarCatalogo();
});


function cargarCatalogo() {
    axios.get(`${API_URL}/juegos`)
        .then(response => {
            renderizarCatalogo(response.data);
        })
        .catch(error => {
            console.error('Error al conectar:', error);
            const grid = document.getElementById('grid-catalogo');
            if (grid) grid.innerHTML = `<div class="alert alert-danger w-100">Error al cargar el catálogo desde el servidor.</div>`;
        });
}

function renderizarCatalogo(juegos) {
    const grid = document.getElementById('grid-catalogo');
    if (!grid) return;
    grid.innerHTML = ''; 

    juegos.forEach(juego => {
        const col = document.createElement('div');
        col.className = 'col';
        
        const badgeColor = juego.disponible ? 'bg-success' : 'bg-danger';
        const badgeTexto = juego.disponible ? 'Disponible' : 'Agotado';
        const botonDeshabilitado = !juego.disponible ? 'disabled' : '';

        col.innerHTML = `
            <div class="card h-100 shadow-sm">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-start mb-2">
                        <h5 class="card-title mb-0 fw-bold">${juego.titulo}</h5>
                        <span class="badge ${badgeColor}">${badgeTexto}</span>
                    </div>
                    <p class="card-text small text-muted text-truncate">${juego.descripcion}</p>
                    <ul class="list-unstyled small mb-3">
                        <li><strong>Dificultad:</strong> ${juego.dificultad}</li>
                        <li><strong>Jugadores:</strong> ${juego.jugadores}</li>
                    </ul>
                </div>
                <div class="card-footer bg-transparent border-top-0 d-grid gap-2">
                    <a href="informacion.html?id=${juego.id}" class="btn btn-outline-secondary btn-sm">Detalles</a>
                    <button onclick="agregarAlCarrito(${juego.id}, '${juego.titulo}', '${juego.dificultad}', ${juego.disponible})" class="btn btn-primary btn-sm" ${botonDeshabilitado}>
                        Agregar a Solicitud
                    </button>
                </div>
            </div>
        `;
        grid.appendChild(col);
    });
}

function agregarAlCarrito(id, titulo, dificultad, disponible) {
    if (!disponible) return;
    if (solicitudesTemporales.some(j => j.id === id)) {
        alert("Este juego ya está en tu lista.");
        return;
    }
    if (solicitudesTemporales.length >= 3) {
        alert("Límite de 3 juegos alcanzado.");
        return;
    }

    solicitudesTemporales.push({ id, titulo, difficulty: dificultad });
    localStorage.setItem('ludo_carrito', JSON.stringify(solicitudesTemporales));
    actualizarContador();
}

function actualizarContador() {
    const contador = document.getElementById('contador');
    if (contador) contador.innerText = solicitudesTemporales.length;
}
