const eventsURL = "http://localhost:3000/events";

// Llamar datos de eventos y contarlos
fetch(eventsURL)
.then(response => response.json())
.then(events => {
    const total = events.length;
    const activos = events.filter(event => event.state === "activo").length;

    document.getElementById("total-events").textContent = total;
    document.getElementById("active-events").textContent = activos;
})
.catch(error => console.error("Error al obtener eventos:", error));
