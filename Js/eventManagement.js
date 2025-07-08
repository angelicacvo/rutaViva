const eventsURL = "http://localhost:3000/events";

// On page load
document.addEventListener("DOMContentLoaded", () => {
	loadEvents();

	// Button logic (create or update)
	document.getElementById("saveEventBtn").addEventListener("click", () => {
		const modal = document.getElementById("exampleModal");
		const eventId = modal.getAttribute("data-event-id");

		if (eventId) {
			handleUpdate(eventId);
		} else {
			handleSave();
		}
	});
});

// Load events from server
function loadEvents() {
	fetch(eventsURL)
		.then((res) => res.json())
		.then((data) => renderTable(data))
		.catch((err) => console.error("❌ Error loading events:", err));
}

// Render table rows
function renderTable(events) {
	const table = document.getElementById("events");
	table.innerHTML = `
		<tr>
			<th>Imagen</th>
			<th>Título</th>
			<th>Descripción</th>
			<th>Estado</th>
			<th>Fecha</th>
			<th>Acciones</th>
		</tr>
	`;

	events.forEach((event) => {
		table.innerHTML += `
			<tr>
				<td>
					${event.image ? `<img src="${event.image}" alt="Event Image" style="width: 80px; height: auto; border-radius: 6px;">` : "Sin imagen"}
				</td>
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
							<li><button class="dropdown-item" onclick="editEvent('${event.id}')">Editar</button></li>
							<li><button class="dropdown-item" onclick="deleteEvent('${event.id}')">Eliminar</button></li>
						</ul>
					</div>
				</td>
			</tr>
		`;
	});
}

// Create new event
function handleSave() {
	const title = document.getElementById("eventTitle").value.trim();
	const description = document.getElementById("eventDescription").value.trim();
	const date = document.getElementById("eventDate").value.trim();
	const file = document.getElementById("formFile").files[0];

	if (!title || !description || !date || !file) {
		alert("Por favor, completa todos los campos y selecciona una imagen.");
		return;
	}

	const reader = new FileReader();
	reader.onload = async function (e) {
		const newEvent = {
			title,
			description,
			date,
			state: "Activo",
			image: e.target.result
		};

		try {
			const res = await fetch(eventsURL, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(newEvent)
			});

			if (!res.ok) throw new Error("Error al guardar evento");

			alert("✅ Evento guardado correctamente");

			bootstrap.Modal.getInstance(document.getElementById("exampleModal")).hide();
			clearForm();
			loadEvents();
		} catch (err) {
			console.error(err);
			alert("❌ No se pudo guardar el evento");
		}
	};
	reader.readAsDataURL(file);
}

// Edit an event (fill form and open modal)
function editEvent(id) {
	fetch(`${eventsURL}/${id}`)
		.then(res => res.json())
		.then(event => {
			document.getElementById("eventTitle").value = event.title;
			document.getElementById("eventDescription").value = event.description;
			document.getElementById("eventDate").value = event.date;
			document.getElementById("formFile").value = "";

			const modal = document.getElementById("exampleModal");
			modal.setAttribute("data-event-id", id);
			modal.setAttribute("data-event-img", event.image || "");

			new bootstrap.Modal(modal).show();
		})
		.catch(err => {
			console.error("❌ No se pudo cargar el evento:", err);
			alert("❌ Error al cargar el evento.");
		});
}

// Update existing event
function handleUpdate(id) {
	const title = document.getElementById("eventTitle").value.trim();
	const description = document.getElementById("eventDescription").value.trim();
	const date = document.getElementById("eventDate").value.trim();
	const fileInput = document.getElementById("formFile");
	const file = fileInput.files[0];
	const modal = document.getElementById("exampleModal");
	const existingImage = modal.getAttribute("data-event-img");

	if (!title || !description || !date) {
		alert("Por favor, completa todos los campos.");
		return;
	}

	const updateWithImage = (imageBase64) => {
		const updatedEvent = {
			title,
			description,
			date,
			state: "Activo",
			image: imageBase64
		};

		fetch(`${eventsURL}/${id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(updatedEvent)
		})
			.then(res => {
				if (!res.ok) throw new Error("No se pudo actualizar");
				alert("✅ Evento actualizado");
				bootstrap.Modal.getInstance(modal).hide();
				clearForm();
				loadEvents();
			})
			.catch(err => {
				console.error("❌ Error actualizando:", err);
				alert("❌ No se pudo actualizar el evento");
			});
	};

	if (file) {
		const reader = new FileReader();
		reader.onload = (e) => updateWithImage(e.target.result);
		reader.readAsDataURL(file);
	} else {
		updateWithImage(existingImage);
	}
}

// Delete event
function deleteEvent(id) {
	if (!confirm("¿Estás seguro de eliminar este evento?")) return;

	fetch(`${eventsURL}/${id}`, { method: "DELETE" })
		.then(res => {
			if (res.ok) {
				alert("🗑️ Evento eliminado");
				loadEvents();
			} else {
				throw new Error("Error al eliminar");
			}
		})
		.catch(err => {
			console.error("❌ No se pudo eliminar:", err);
			alert("❌ Error al eliminar el evento.");
		});
}

// Clear form inputs and modal data
function clearForm() {
	document.getElementById("eventTitle").value = "";
	document.getElementById("eventDescription").value = "";
	document.getElementById("eventDate").value = "";
	document.getElementById("formFile").value = "";
	const modal = document.getElementById("exampleModal");
	modal.removeAttribute("data-event-id");
	modal.removeAttribute("data-event-img");
}