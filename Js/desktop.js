const eventsURL = "http://localhost:3000/events";
const emailsURL = "http://localhost:3000/subs";
const mensajesURL = "http://localhost:3000/contactMessages";

document.addEventListener("DOMContentLoaded", () => {
// 📦 Cargar eventos y actualizar contadores
fetch(eventsURL)
	.then(res => res.json())
	.then(events => {
	document.getElementById("count-activo").textContent = events.filter(e => e.state === "Activo").length;
	document.getElementById("count-cancelado").textContent = events.filter(e => e.state === "Cancelado").length;
	document.getElementById("count-inactivo").textContent = events.filter(e => e.state === "Inactivo").length;
	document.getElementById("count-total").textContent = events.length;
	});

// 📨 Cargar emails
fetch(emailsURL)
	.then(res => res.json())
	.then(data => {
	document.getElementById("count-emails").textContent = data.length;
	});

// 💬 Cargar mensajes
fetch(mensajesURL)
	.then(res => res.json())
	.then(data => {
	document.getElementById("count-mensajes").textContent = data.length;
	});

// 🧭 Botones de eventos filtrados
document.querySelectorAll(".btn-show").forEach(btn => {
	btn.addEventListener("click", e => {
	e.preventDefault();
	const estado = btn.getAttribute("data-status");
	mostrarEventos(estado);
	});
});

// 📧 Botón ver emails
document.getElementById("btn-emails").addEventListener("click", async (e) => {
	e.preventDefault();
	try {
	const res = await fetch(emailsURL);
	const correos = await res.json();

	const lista = document.getElementById("email-lista");
	lista.innerHTML = "";

	correos.forEach(c => {
		const li = document.createElement("li");
		li.className = "list-group-item";
		li.textContent = c.email;
		lista.appendChild(li);
	});

	const modal = new bootstrap.Modal(document.getElementById("modalEmails"));
	modal.show();
	} catch (err) {
	alert("❌ No se pudieron cargar los correos.");
	console.error(err);
	}
});

// 📩 Botón ver mensajes
document.getElementById("btn-mensajes").addEventListener("click", async (e) => {
	e.preventDefault();
	try {
	const res = await fetch(mensajesURL);
	const mensajes = await res.json();

	const contenedor = document.getElementById("mensaje-lista");
	if (mensajes.length === 0) {
		contenedor.innerHTML = "<p>No hay mensajes registrados.</p>";
	} else {
		let html = `
		<div class="table-responsive">
			<table class="table table-striped">
			<thead>
				<tr>
				<th>Nombre</th>
				<th>Correo</th>
				<th>Fecha</th>
				<th>Mensaje</th>
				</tr>
			</thead>
			<tbody>
		`;
		mensajes.forEach(m => {
		html += `
			<tr>
			<td>${m.name}</td>
			<td>${m.email}</td>
			<td>${m.date}</td>
			<td>${m.message}</td>
			</tr>
		`;
		});
		html += `</tbody></table></div>`;
		contenedor.innerHTML = html;
	}

	const modal = new bootstrap.Modal(document.getElementById("modalMensajes"));
	modal.show();
	} catch (err) {
	alert("❌ No se pudieron cargar los mensajes.");
	console.error(err);
	}
});
});

// 🔁 Mostrar eventos filtrados
function mostrarEventos(estado) {
fetch(eventsURL)
	.then(res => res.json())
	.then(events => {
	let filtrados = estado === "Total"
		? events
		: events.filter(e => e.state === estado);

	renderTablaFiltrada(filtrados, estado);

	const modal = new bootstrap.Modal(document.getElementById("modalEventos"));
	modal.show();
	});
}

// 📝 Render tabla de eventos
function renderTablaFiltrada(events, estado) {
const contenedor = document.getElementById("filtered-events");

if (events.length === 0) {
	contenedor.innerHTML = "<p>No hay eventos en esta categoría.</p>";
	return;
}

let html = `
	<div class="table-responsive">
	<table class="table table-bordered table-striped">
		<thead>
		<tr>
			<th>Imagen</th>
			<th>Título</th>
			<th>Descripción</th>
			<th>Fecha</th>
			<th>Estado actual</th>
			<th>Cambiar estado</th>
		</tr>
		</thead>
		<tbody>
`;

events.forEach(event => {
	html += `
	<tr>
		<td>${event.image ? `<img src="${event.image}" style="width: 60px;">` : "Sin imagen"}</td>
		<td>${event.title}</td>
		<td>${event.description}</td>
		<td>${event.date}</td>
		<td>${event.state}</td>
		<td>
		<select class="form-select" onchange="cambiarEstado('${event.id}', this.value)">
			<option disabled selected>Elegir</option>
			<option value="Activo">Activo</option>
			<option value="Inactivo">Inactivo</option>
			<option value="Cancelado">Cancelado</option>
		</select>
		</td>
	</tr>
	`;
});

html += `</tbody></table></div>`;
contenedor.innerHTML = html;
}

// 🔄 Cambiar estado de evento
function cambiarEstado(id, nuevoEstado) {
fetch(`${eventsURL}/${id}`)
	.then(res => res.json())
	.then(event => {
	event.state = nuevoEstado;
	return fetch(`${eventsURL}/${id}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(event)
	});
	})
	.then(res => {
	if (!res.ok) throw new Error("No se pudo actualizar");
	alert("✅ Estado actualizado");
	location.reload();
	})
	.catch(err => {
	console.error("❌ Error al cambiar estado:", err);
	alert("❌ No se pudo cambiar el estado");
	});
}
