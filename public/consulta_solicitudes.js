const API_URL = '/ludoweb/api';

document.addEventListener('DOMContentLoaded', () => {
    cargarSolicitudes();
});

function cargarSolicitudes() {
    axios.get(`${API_URL}/solicitudes`)
        .then(response => {
            renderizarTablaAdmin(response.data);
        })
        .catch(error => console.error('Error al obtener solicitudes:', error));
}

function renderizarTablaAdmin(solicitudes) {
    const cuerpoTabla = document.getElementById('tabla-solicitudes-cuerpo');
    if (!cuerpoTabla) return;
    cuerpoTabla.innerHTML = '';

    if (solicitudes.length === 0) {
        cuerpoTabla.innerHTML = `<tr><td colspan="6" class="text-center py-4 text-muted">No hay solicitudes en la base de datos.</td></tr>`;
        return;
    }

    solicitudes.forEach(sol => {
        const tr = document.createElement('tr');
        
        let badgeEstadoClass = 'bg-info';
        let botonAccion = '';

        if (sol.estado === 'Pendiente') {
            badgeEstadoClass = 'bg-info';
            botonAccion = `<button onclick="cambiarEstado(${sol.id}, 'Entregado')" class="btn btn-sm btn-success">Entregar</button>`;
        } else if (sol.estado === 'Entregado') {
            badgeEstadoClass = 'bg-success';
            botonAccion = `<button onclick="cambiarEstado(${sol.id}, 'Devuelto')" class="btn btn-sm btn-warning text-dark">Registrar Devolución</button>`;
        } else {
            badgeEstadoClass = 'bg-secondary';
            botonAccion = `<span class="text-muted small">Finalizado</span>`;
        }

        const badgeApoyo = sol.necesita_apoyo ? '<span class="badge rounded-pill bg-warning text-dark">SÍ</span>' : '<span class="text-muted small">No</span>';

        tr.innerHTML = `
            <td class="ps-4 fw-bold text-primary">${sol.codigo}</td>
            <td><strong>${sol.nombre_cliente}</strong><br><small class="text-muted">${sol.numero_jugadores} integrantes</small></td>
            <td>${sol.juegos_solicitados}</td>
            <td class="text-center">${badgeApoyo}</td>
            <td><span class="badge ${badgeEstadoClass}">${sol.estado}</span></td>
            <td class="text-end pe-4">${botonAccion}</td>
        `;
        cuerpoTabla.appendChild(tr);
    });
}


function cambiarEstado(id, nuevoEstado) {
    axios.put(`${API_URL}/solicitudes/${id}/estado`, { estado: nuevoEstado })
        .then(() => {
            cargarSolicitudes(); 
        })
        .catch(error => console.error('Error al actualizar estado:', error));
}
