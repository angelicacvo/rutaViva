//Get subs from database (db.json)
fetch("http://localhost:3000/subs")
    .then(response => response.json())
    .then(data => start(data))
    .catch(error => console.error("Error al obtener productos:", error));

//Generate table content with subs emails
function start(data){
    table = document.getElementById("subscribers");
    table.innerHTML = "";
    data.forEach((sub,index) => {
        table.innerHTML += `<tr>
                              <td>${sub.email}</td>
                              <td>
                                <div class="btn-group" role="group">
                                  <button type="button" class="btn btn-primary del" data-id="${sub.id}">Eliminar</button>
                                </div>
                              </td>
                            </tr>`;
    });
}

//Delete email
const tbody = document.getElementById('subscribers');

tbody.addEventListener('click', (e) => {
  if (e.target && e.target.classList.contains('del')) {
    const id = e.target.getAttribute('data-id');

    const confirmDelete = confirm(`¿Estás seguro de que deseas eliminar el correo`);
    if (!confirmDelete) return;

    if (id) {
      fetch(`http://localhost:3000/subs/${id}`, {
        method: 'DELETE',
      })
      .then(response => {
        if (response.ok) {
          alert('Correo eliminado correctamente.');
          console.log('Correo eliminado correctamente.');
        } else {
          alert('Error al eliminar');
          console.error('Error al eliminar');
        }
      })
      .catch(error => {
        console.error('Error en la red:', error);
      });
    }
  }
});
