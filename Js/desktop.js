document.addEventListener('DOMContentLoaded', function() {
  // funcional buttoms for document
  function addActionButtons() {
    const cards = document.querySelectorAll('.activity__container .card');
    
    cards.forEach(card => {
      const title = card.querySelector('.card-title').textContent.trim();
      const btnContainer = document.createElement('div');
      btnContainer.className = 'action-buttons mt-3';
      
      if (title === 'Eventos activos') {
        btnContainer.innerHTML = `
          <button class="btn btn-sm btn-outline-secondary btn-pause">
            <i class="fas fa-pause"></i> Pausar
          </button>
          <button class="btn btn-sm btn-outline-danger btn-cancel">
            <i class="fas fa-times"></i> Cancelar
          </button>
        `;
      } else if (title === 'Eventos cancelados') {
        btnContainer.innerHTML = `
          <button class="btn btn-sm btn-outline-success btn-reactivate">
            <i class="fas fa-play"></i> Reactivar
          </button>
          <button class="btn btn-sm btn-outline-danger btn-cancel">
            <i class="fas fa-times"></i> Cancelar
          </button>
        `;
      }
      
      if (btnContainer.innerHTML) {
        card.querySelector('.card-body').appendChild(btnContainer);
      }
    });
  }

  // mannager clicks
  function handleButtonClicks() {
    document.addEventListener('click', function(e) {
      // Pause button
      if (e.target.closest('.btn-pause')) {
        showActionModal('pausar', 'Eventos activos');
      }
      
      // Cancel buttom
      if (e.target.closest('.btn-cancel')) {
        showActionModal('cancelar', 'Eventos activos');
      }
      
      // Reactive buttom
      if (e.target.closest('.btn-reactivate')) {
        showActionModal('reactivar', 'Eventos cancelados');
      }
      
      // Confirm modal
      if (e.target.id === 'confirmActionBtn') {
        const action = document.getElementById('modalAction').value;
        const reason = document.getElementById('reasonText').value;
        
        if (!reason) {
          alert('Por favor ingresa una razón');
          return;
        }
        
        alert(`Acción "${action}" completada. Razón: ${reason}`);
        const modalEl = document.getElementById('actionModal');
        const modal = bootstrap.Modal.getInstance(modalEl);
        modal.hide();
      }
    });
  }

  // show modal action
  function showActionModal(action, eventType) {
    document.getElementById('modalTitle').textContent = `${action.charAt(0).toUpperCase() + action.slice(1)} ${eventType}`;
    document.getElementById('modalAction').value = action;
    document.getElementById('reasonText').value = '';
    

    const eventList = document.getElementById('eventList');
    eventList.innerHTML = `
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Cargando...</span>
      </div>
      <p>Cargando eventos...</p>
    `;
    
    // simulation db
    setTimeout(() => {
      eventList.innerHTML = `
        <ul class="list-group">
          <li class="list-group-item">Evento de ejemplo 1</li>
          <li class="list-group-item">Evento de ejemplo 2</li>
        </ul>
      `;
    }, 1000);
    
    const modal = new bootstrap.Modal(document.getElementById('actionModal'));
    modal.show();
  }

  // modal creation
  function createModal() {
    const modalHTML = `
    <div class="modal fade" id="actionModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalTitle">Acción</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <input type="hidden" id="modalAction">
            <div id="eventList"></div>
            <div class="mt-3">
              <label for="reasonText" class="form-label">Razón:</label>
              <textarea class="form-control" id="reasonText" rows="3"></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            <button type="button" class="btn btn-primary" id="confirmActionBtn">Confirmar</button>
          </div>
        </div>
      </div>
    </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
  }

  // Init
  createModal();
  addActionButtons();
  handleButtonClicks();
});