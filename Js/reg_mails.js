//Validate email registered
function validateEmail(correo) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(correo);
}

// Register the email in database (db.json)
document.getElementById("button-addon2").addEventListener('click', async () => {
  const mailInput = document.getElementById("mail__sub");
  const mail = mailInput.value.trim();

  if (!mail) {
    alert('Por favor, ingrese un correo electrónico.');
    return;
  }

  if (!validateEmail(mail)) {
    alert('Por favor, ingrese un correo electrónico válido.');
    return;
  }

  const newEmail = { email: mail };

  try {
    const response = await fetch('http://localhost:3000/subs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEmail),
    });

    if (response.ok) {
      const addedEmail = await response.json();
      console.log("Correo agregado:", addedEmail);
      alert(`El correo ${addedEmail.email} ha sido registrado exitosamente.`);

      mailInput.value = "";
    } else {
      const error = await response.json();
      alert('Error: ' + (error.message || 'No se pudo registrar el correo.'));
    }
  } catch (error) {
    console.error("Error al agregar el correo:", error);
    alert('Hubo un problema al registrar el correo.');
  }
});
