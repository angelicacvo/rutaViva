//get events from db
const eventsURL = "http://localhost:3000/events"

fetch("http://localhost:3000/events")
    .then(response => response.json())
    .then(data => start(data))
    .catch(error => console.error("Error al obtener productos:", error));

function start(data) {
    table = document.getElementById("events");
    table.innerHTML = "";
    data.forEach(event => {
        table.innerHTML += `<tr>
            <th>${event.id}</th>
            <th>${event.title}</th>
            <td${event.description}</td>
            <td>${event.state}</td>
            <td>${event.date}</td>
            <td>
              <div class="btn-group" role="group">
                <button
                  type="button"
                  class="btn btn-primary dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Acciones
                </button>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="#">Editar</a></li>
                  <li><a class="dropdown-item" href="#">Eliminar</a></li>
                </ul>
              </div>
            </td>
          </tr>`
    });

}
