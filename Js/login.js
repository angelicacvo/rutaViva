document.querySelector(".login__form").addEventListener("submit", async (e) => {
e.preventDefault();

const email = document.getElementById("exampleInputEmail1").value.trim();
const password = document.getElementById("exampleInputPassword1").value.trim();

if (!email || !password) {
    alert("Por favor ingrese el correo y la contraseña.");
    return;
}

try {
    const res = await fetch("http://localhost:3000/admin");
    const data = await res.json();

    const admin = data.find(
    (user) => user.email === email && user.password === password
    );

    if (admin) {

    localStorage.setItem("admin", JSON.stringify(admin));
    window.location.href = "/pages/desktop.html";
    } else {
    alert("Correo o contraseña incorrectos.");
    }
} catch (error) {
    console.error("Error en la autenticación:", error);
    alert("No se pudo conectar con el servidor.");
}
});
