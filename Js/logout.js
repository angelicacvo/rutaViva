const logoutBtn = document.querySelector(".btn.btn-danger");

if (logoutBtn) {
logoutBtn.addEventListener("click", () => {
    const confirmed = confirm("¿Estás seguro de que deseas cerrar sesión?");
    if (confirmed) {
    localStorage.removeItem("adminSession");
    window.location.href = "/pages/login.html";
    }
});
}