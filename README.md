
# Ruta Viva

**Ruta Viva** es una plataforma web para gestionar eventos, recopilar testimonios, registrar correos electrónicos de suscriptores y recibir mensajes de contacto. Diseñado como un sistema dinámico y autogestionable para administradores, y una interfaz amigable para visitantes.

---

## Estructura general

```
ruta-viva/
├── index.html
├── js/
│   ├── homeevents.js
│   ├── contact_form.js
│   ├── load_contacts.js
│   ├── login.js
│   ├── logout.js
│   ├── mailersend.js
│   ├── reg-mails.js
│   ├── subs.js
│   ├── dashboard.js
│   ├── eventManagement.js
│   ├── guardian.js
│   └── testimonials.js
├── pages/
│   ├── login.html
│   ├── desktop.html
│   └── ...
├── db.json
├── assets/
│   └── img/
└── README.md
```

---

## Funcionalidades

### Página Principal (`index.html`)

* Muestra tarjetas de eventos con estado "Activo".
* Carga dinámica de eventos desde la API local (usando JSON Server).
* Registro de correos electrónicos para newsletter (`reg-mails.js`).

### Administración (`/pages/desktop.html`)

* Panel con estadísticas:

  * Eventos por estado (Activo, Inactivo, Cancelado, Total).
  * Total de correos electrónicos registrados.
  * Total de mensajes de contacto recibidos.
* Visualización dinámica en modales de:

  * Correos electrónicos registrados.
  * Mensajes enviados por visitantes.
  * Tabla filtrada de eventos por estado.
* Requiere autenticación previa (`guardian.js`).

### Gestión de Eventos (`eventManagement.js`)

* Crear, editar, eliminar eventos.
* Imagen codificada en base64.
* Modal Bootstrap para formulario.
* Almacena y actualiza datos en `http://localhost:3000/events`.

### Formulario de Contacto (`contact_form.js`)

* Envío de mensajes con validación.
* Registra nombre, email, mensaje y fecha.
* Guarda datos en `http://localhost:3000/contactMessages`.

###  Suscriptores (`reg-mails.js`, `subs.js`)

* Registro de correos con validación.
* Visualización en tabla de administración.
* Eliminación de correos individuales.
* Almacenamiento en `http://localhost:3000/subs`.

### Testimonios (`testimonials.js`)

* Agregar testimonio con nombre, evento, lugar y fecha.
* Muestra tarjetas de testimonios automáticamente al cargar.
* Persistencia en `http://localhost:3000/testimonials`.

### Login y Control de Sesión

* Validación de credenciales desde `http://localhost:3000/admin`.
* Uso de `localStorage` para sesión (`login.js`, `logout.js`).
* Redirección automática si no hay sesión (`guardian.js`).

---

## Requisitos del sistema

* **Node.js** (v14+ recomendado)
* **JSON Server** para simular la base de datos local:

```bash
npm install -g json-server
```

### Iniciar servidor JSON local

```bash
json-server --watch db.json --port 3000
```

---

## Base de datos (`db.json`)

```json
{
  "events": [],
  "subs": [],
  "contactMessages": [],
  "admin": [
    {
      "email": "admin@example.com",
      "password": "admin123"
    }
  ],
  "testimonials": []
}
```


---

## Checklist de funcionalidades

* [x] Crear / editar / eliminar eventos.
* [x] Registrar correos electrónicos.
* [x] Ver mensajes y testimonios.
* [x] Autenticación básica de administrador.
* [x] Estadísticas en panel de administración.
* [x] Modal Bootstrap para UX clara.

---

## Siguientes mejoras

* Envío real de correos vía MailerSend o SMTP.
* Paginación o búsqueda para listas largas.
* Hashing de contraseñas y autenticación segura.
* Filtro de eventos por fecha o categoría.
