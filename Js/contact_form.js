// js/contact.js
document.querySelector('.contact-form form').addEventListener('submit', async e => {
e.preventDefault();

const name = document.getElementById('exampleInputName1').value.trim();
const email = document.getElementById('exampleInputEmail1').value.trim();
const message = document.getElementById('exampleFormControlTextarea1').value.trim();
const date = new Date().toLocaleString();

if (!name || !email || !message) {
    alert("Por favor complete todos los campos.");
    return;
}

const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!regex.test(email)) {
    alert("Por favor ingrese un correo válido.");
    return;
}

const newMessage = { name, email, message, date };

try {
    const res = await fetch('http://localhost:3000/contactMessages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newMessage)
    });

    if (res.ok) {
    alert("Mensaje enviado correctamente.");
    e.target.reset(); // limpiar el formulario
    } else {
    alert("Error al enviar mensaje.");
    }
} catch (err) {
    console.error("Error:", err);
    alert("Error al enviar mensaje.");
}
});
