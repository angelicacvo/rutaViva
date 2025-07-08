const eventsURL = "http://localhost:3000/events";

document.addEventListener("DOMContentLoaded", () => {
	fetch(eventsURL)
		.then(response => response.json())
		.then(data => renderCards(data))
		.catch(error => console.error("❌ Failed to fetch events:", error));
});

function renderCards(data) {
	const container = document.querySelector(".events_cards");
	if (!container) return;

	container.innerHTML = ""; // Clear existing cards

	// Filter only events with state "Activo"
	const activos = data.filter(event => event.state === "Activo");

	activos.forEach(event => {
		container.innerHTML += `
			<div class="col">
				<div class="card h-100">
					<img src="${event.image || './assets/img/default.jpg'}" class="card-img-top" alt="${event.title}" />
					<div class="card-body">
						<h5 class="card-title">${event.title}</h5>
						<p class="card-text">${event.description}</p>
						<p class="card-text"><small class="text-muted">${event.date}</small></p>
					</div>
				</div>
			</div>
		`;
	});
}
