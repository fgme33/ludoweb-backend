const API_URL = '/ludoweb/api';

document.addEventListener('DOMContentLoaded', () => {
    
    const urlParams = new URLSearchParams(window.location.search);
    const juegoId = urlParams.get('id');

    if (juegoId) {
        
        axios.get(`${API_URL}/juegos/${juegoId}`)
            .then(response => {
                const juego = response.data;
                
                
                document.querySelector('h1.display-6').innerText = juego.titulo;
                document.getElementById('dificultad').innerText = juego.dificultad;
                document.getElementById('edad').innerText = juego.edad;
                document.getElementById('jugadores').innerText = juego.jugadores;
                document.getElementById('clasificacion').innerText = juego.clase;
                document.getElementById('descripcion-juego').innerText = juego.descripcion;
                
                // Configurar el botón de agregar
                const btnAgregar = document.querySelector('.card-body button');
                if(!juego.disponible) {
                    btnAgregar.innerText = "No disponible";
                    btnAgregar.className = "btn btn-danger w-100 py-3 fw-bold disabled";
                } else {
                    btnAgregar.onclick = () => agregarDesdeDetalle(juego.id, juego.titulo, juego.dificultad);
                }
            })
            .catch(error => console.error('Error al cargar detalle:', error));
    }
});

function agregarDesdeDetalle(id, titulo, dificultad) {
    let carrito = JSON.parse(localStorage.getItem('ludo_carrito')) || [];
    if (carrito.some(j => j.id === id)) {
        alert("Este juego ya está en tu lista.");
        return;
    }
    if (carrito.length >= 3) {
        alert("Límite de 3 juegos alcanzado.");
        return;
    }
    carrito.push({ id, titulo, dificultad });
    localStorage.setItem('ludo_carrito', JSON.stringify(carrito));
    alert(`${titulo} añadido.`);
    window.location.href = 'catalogo.html';
}
