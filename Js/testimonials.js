// Guardar nuevo testimonio en db.json
document.querySelector('#exampleModal .btn-primary').addEventListener("click", async () => {
// Obtener valores del formulario
const fullName = document.getElementById("testimonial-name").value.trim();
const eventName = document.getElementById("testimonial-event").value.trim();
const place = document.getElementById("testimonial-place").value.trim();
const date = document.getElementById("testimonial-date").value.trim();

// Validar campos vacíos
if (!fullName || !eventName || !place || !date) {
    alert("Por favor, complete todos los campos.");
    return;
}

// Crear objeto del testimonio
const newTestimonial = {
    fullName,
    eventName,
    place,
    date
};

try {
    const res = await fetch("http://localhost:3000/testimonials", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTestimonial),
    });

    if (res.ok) {
    const savedTestimonial = await res.json();

    alert("Testimonio guardado exitosamente.");

    // Mostrar la tarjeta del nuevo testimonio
    renderTestimonialCard(savedTestimonial);

    // Resetear formulario
    document.getElementById("form-testimonio").reset();

    // Cerrar el modal (usa Bootstrap 5)
    const modal = bootstrap.Modal.getInstance(document.getElementById("exampleModal"));
    modal.hide();
    } else {
    alert("Error al guardar testimonio.");
    }
} catch (error) {
    console.error("Error:", error);
    alert("No se pudo guardar el testimonio.");
}
});


// Renderizar tarjeta de testimonio
function renderTestimonialCard(testimonial) {
const container = document.querySelector(".testimonial_containers");

const card = document.createElement("div");
card.classList.add("card");
card.style.width = "18rem";

card.innerHTML = `
    <div class="card-body">
    <h5 class="card-title">${testimonial.eventName}</h5>
    <p class="card-text">${testimonial.place}</p>
    <p class="card-text">${testimonial.date}</p>
    <p class="card-text"><strong>${testimonial.fullName}</strong></p>
    </div>
`;

container.appendChild(card);
}


// Cargar testimonios existentes al iniciar
window.addEventListener("DOMContentLoaded", async () => {
try {
    const res = await fetch("http://localhost:3000/testimonials");
    const data = await res.json();

    data.forEach(renderTestimonialCard);
} catch (err) {
    console.error("Error al cargar testimonios:", err);
}
});
