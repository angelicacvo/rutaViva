// url db
const eventsURL = "http://localhost:3000/events";

// get events
fetch(eventsURL)
  .then(response => response.json())
  .then(data => start(data))
  .catch(error => console.error("Error al obtener eventos:", error));

function start(data) {
  const table = document.getElementById("events");
  table.innerHTML = "";

  data.forEach(event => {
    table.innerHTML += `
      <tr>
        <td>${event.title}</td>
        <td>${event.description}</td>
        <td>${event.state}</td>
        <td>${event.date}</td>
        <td>
          <div class="btn-group" role="group">
            <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              Acciones
            </button>
            <ul class="dropdown-menu">
              <li>
                <a 
                  class="dropdown-item edit-btn"
                  href="#"
                  data-bs-toggle="modal"
                  data-bs-target="#editModal"
                  data-id="${event.id}"
                  data-title="${event.title}"
                  data-description="${event.description}"
                  data-date="${event.date}">
                  Editar
                </a>
              </li>
              <li>
                <a class="dropdown-item del" href="#" data-id="${event.id}">Eliminar</a>
              </li>
            </ul>
          </div>
        </td>
      </tr>
    `;
  });
}

// delete event
const tbody = document.getElementById("events");

tbody.addEventListener("click", e => {
  if (e.target && e.target.classList.contains("del")) {
    const id = e.target.getAttribute("data-id");
    const confirmDelete = confirm("¿Estás seguro de que deseas eliminar el evento?");
    if (!confirmDelete) return;

    if (id) {
      fetch(`${eventsURL}/${id}`, {
        method: "DELETE"
      })
        .then(response => {
          if (response.ok) {
            alert("Evento eliminado correctamente.");
            return fetch(eventsURL)
              .then(res => res.json())
              .then(data => start(data));
          } else {
            alert("Error al eliminar evento.");
          }
        })
        .catch(error => {
          console.error("Error al eliminar:", error);
        });
    }
  }
});

// create event
document.getElementById("createEventBtn").addEventListener("click", () => {
  const newEvent = {
    title: document.getElementById("create-title").value,
    description: document.getElementById("create-description").value,
    date: document.getElementById("create-date").value,
    state: "active"
  };

  fetch(eventsURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newEvent)
  })
    .then(response => {
      if (response.ok) {
        alert("Evento creado correctamente.");
        // Limpiar campos
        document.getElementById("create-title").value = "";
        document.getElementById("create-description").value = "";
        document.getElementById("create-date").value = "";

        return fetch(eventsURL)
          .then(res => res.json())
          .then(data => start(data));
      } else {
        alert("Error al crear evento.");
      }
    })
    .catch(error => {
      console.error("Error al crear evento:", error);
    });
});

document.addEventListener("click", function (e) {
  if (e.target && e.target.classList.contains("edit-btn")) {
    const btn = e.target;
    document.getElementById("edit-id").value = btn.dataset.id;
    document.getElementById("edit-title").value = btn.dataset.title;
    document.getElementById("edit-description").value = btn.dataset.description;
    document.getElementById("edit-date").value = btn.dataset.date;
  }
});

// edit event
document.getElementById("saveChangesBtn").addEventListener("click", () => {
  const id = document.getElementById("edit-id").value;

  const title = document.getElementById("edit-title").value;
  const description = document.getElementById("edit-description").value;
  const date = document.getElementById("edit-date").value;

  const updatedData = {};
  if (title.trim() !== "") updatedData.title = title;
  if (description.trim() !== "") updatedData.description = description;
  if (date.trim() !== "") updatedData.date = date;

  if (Object.keys(updatedData).length === 0) {
    alert("No se ha modificado ningún campo.");
    return;
  }

  fetch(`${eventsURL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updatedData)
  })
    .then(response => {
      if (response.ok) {
        alert("Evento actualizado correctamente.");
        return fetch(eventsURL)
          .then(res => res.json())
          .then(data => start(data));
      } else {
        alert("Error al actualizar");
      }
    })
    .catch(error => console.log("Error al actualizar", error));
});




