document.getElementById("button-addon2").addEventListener("click", () => {
    const mail = {
    name: "Jeims",
    email: "jeims1221jeims@gmail.com"
    };

    fetch("h    ", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(mail)
    })
    .then(res => {
        if (res.ok) {
        console.log("✅ Datos enviados a Pipedream");
        alert("Correo de bienvenida enviado con éxito.");
        } else {
        console.error("❌ Fallo al enviar datos");
        alert("Error al enviar el correo.");
        }
    })
    .catch(err => {
        console.error("❌ Error de red:", err.message);
        alert("Fallo de red al enviar el correo.");
    });
});
