const API_URL = '/ludoweb/api';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-nuevo-juego');
    if (form) {
        form.addEventListener('submit', guardarJuegoAxios);
    }
});

function guardarJuegoAxios(e) {
    e.preventDefault();

    const datosJuego = {
        titulo: document.getElementById('titulo').value,
        dificultad: document.getElementById('dificultad').value,
        clase: document.getElementById('clase').value,
        edad: document.getElementById('edad').value,
        jugadores: document.getElementById('jugadores').value,
        descripcion: document.getElementById('descripcion').value,
        imagen: document.getElementById('imagen').value.trim() || null,
        disponible: true
    };

    axios.post(`${API_URL}/juegos`, datosJuego)
        .then(response => {
            alert(`¡Excelente! El juego "${response.data.data.titulo}" ha sido agregado con éxito.`);
            document.getElementById('form-nuevo-juego').reset(); 
            window.location.href = 'catalogo.html'; 
        })
        .catch(error => {
            console.error('Error al guardar el juego:', error);
            alert('Hubo un error en el servidor al intentar registrar el juego.');
        });
}
