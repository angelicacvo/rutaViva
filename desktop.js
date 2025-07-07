// Datos de ejemplo
const mockData = {
  eventosActivos: 15,
  eventosCancelados: 3,
  eventosInactivos: 7,
  totalEventos: 25,
  emailsRegistrados: 1243,
  mensajesContacto: 56
};

// Función para escanear/actualizar las cartas
function escanearYActualizarCartas() {
  const cards = document.querySelectorAll('.card');
  
  cards.forEach(card => {
    const title = card.querySelector('.card-title').textContent;
    
    // Simular escaneo (delay para efecto visual)
    card.classList.add('escaneando');
    card.style.opacity = '0.7';
    
    setTimeout(() => {
      card.classList.remove('escaneando');
      card.style.opacity = '1';
      card.style.borderLeft = '4px solid #4CAF50'; // Marcar como escaneada
      
      // Actualizar contenido basado en el título de la card
      const textElement = card.querySelector('.card-text');
      switch(title) {
        case 'Eventos activos':
          textElement.textContent = `Eventos activos: ${mockData.eventosActivos}`;
          break;
        case 'Eventos cancelados':
          textElement.textContent = `Eventos cancelados: ${mockData.eventosCancelados}`;
          break;
        case 'Eventos inactivos':
          textElement.textContent = `Eventos inactivos: ${mockData.eventosInactivos}`;
          break;
        case 'Total eventos':
          textElement.textContent = `Total eventos: ${mockData.totalEventos}`;
          break;
        case 'Emails registrados':
          textElement.textContent = `Emails registrados: ${mockData.emailsRegistrados}`;
          break;
        case 'Mensajes de contacto':
          textElement.textContent = `Mensajes recibidos: ${mockData.mensajesContacto}`;
          break;
      }
    }, 500); // Retraso simulado para el "escaneo"
  });
  
  console.log('Todas las cartas han sido escaneadas y actualizadas.');
}

// Ejecutar al cargar la página (o cuando lo necesites)
document.addEventListener('DOMContentLoaded', escanearYActualizarCartas);

// Opcional: Botón para re-escanear manualmente
const botonEscanear = document.createElement('button');
botonEscanear.textContent = 'Escanear Cartas';
botonEscanear.className = 'btn btn-warning my-3';
botonEscanear.onclick = escanearYActualizarCartas;

// Añadir botón al contenedor de actividades (opcional)
document.querySelector('.activity-summary').prepend(botonEscanear);