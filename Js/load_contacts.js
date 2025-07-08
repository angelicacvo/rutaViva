// js/load_contacts.js
document.addEventListener("DOMContentLoaded", async () => {
const tbody = document.querySelector("tbody");

try {
    const res = await fetch("http://localhost:3000/contactMessages");
    const messages = await res.json();

    if (messages.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4">No hay mensajes registrados.</td></tr>`;
    return;
    }

    tbody.innerHTML = "";

    messages.forEach(msg => {
    tbody.innerHTML += `
        <tr>
        <td>${msg.name}</td>
        <td>${msg.email}</td>
        <td>${msg.date}</td>
        <td>${msg.message}</td>
        </tr>
    `;
    });
} catch (err) {
    console.error("Error al cargar mensajes:", err);
    tbody.innerHTML = `<tr><td colspan="4">Error al cargar mensajes.</td></tr>`;
}
});
