// guardian.js

// Validamos si hay un admin en localStorage
const isLogged = localStorage.getItem("admin");

if (!isLogged) {
  // Si no hay sesión, redirige al login
    window.location.href = "/pages/login.html";
}
