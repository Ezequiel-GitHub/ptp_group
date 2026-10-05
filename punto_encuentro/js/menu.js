let ruta = "";

function actualizarMenu() {
  const datos = JSON.parse(localStorage.getItem("usuario"));
  const registerButton = document.getElementById("registerButton");
  const loginButton = document.getElementById("loginButton");
  const ofertasButton = document.getElementById("ofertasButton");
  const postulacionesButton = document.getElementById("postulacionesButton");
  const perfilButton = document.getElementById("perfilButton");
  const logoutButton = document.getElementById("logoutButton");
  const cuenta = document.getElementById("cuenta");

  registerButton.style.display = datos ? "none" : "";
  loginButton.style.display = datos ? "none" : "";
  ofertasButton.style.display = datos && datos.admin == 1 ? "block" : "none";
  postulacionesButton.style.display = datos && datos.admin != 1 ? "block" : "none";
  perfilButton.style.display = datos ? "block" : "none";
  logoutButton.style.display = datos ? "block" : "none";
  cuenta.textContent = datos ? "Bienvenido, " + datos.nombre : "";
}

function inicializarPagina(pagina) {
  if (pagina === "paginas/inicio.html") {
    const titulo = document.getElementById("titulo");
    titulo.addEventListener("keydown", (evento) => {
      if (evento.key === "Enter") {
        evento.preventDefault();
        mostrarOferta();
      }
    });
    mostrarOfertas();
  } else if (pagina === "paginas/oferta.html") {
    mostrarOfertas();
  } else if (pagina === "paginas/postulaciones.html") {
    const datos = JSON.parse(localStorage.getItem("usuario"));
    if (!datos) {
      alert("Debes iniciar sesión para acceder a esta página");
      cargarPagina("paginas/inicio.html");
      return;
    }
    mostrarPostulaciones();
  } else if (pagina === "paginas/cuenta.html") {
    const datos = JSON.parse(localStorage.getItem("usuario"));
    if (!datos) {
      alert("Debes iniciar sesión para acceder a esta página");
      cargarPagina("paginas/inicio.html");
      return;
    }

    document.getElementById("nombreUsuario").textContent = datos.nombre;
    document.getElementById("emailUsuario").textContent = datos.email;
    document.getElementById("telefonoUsuario").textContent = datos.telefono;
    document.getElementById("estadoAcademico").textContent = datos.estado_academico;
  }
}

function cargarPagina(pagina) {
  ruta = pagina;
  const contenido = document.getElementById("contenido");
  contenido.innerHTML = '<div class="text-center text-muted">Cargando...</div>';

  return fetch(pagina)
    .then((respuesta) => {
      if (!respuesta.ok) {
        throw new Error("No se pudo cargar la página: " + pagina);
      }
      return respuesta.text();
    })
    .then((html) => {
      contenido.innerHTML = html;
      ruta = pagina;
      actualizarMenu();
      inicializarPagina(pagina);
    })
    .catch((error) => {
      contenido.innerHTML = `
        <div class="alert alert-danger" role="alert">
          Ocurrió un error al cargar el contenido: ${error.message}
        </div>
      `;
      console.error(error);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  const enlaces = document.querySelectorAll(".enlace-menu");

  actualizarMenu();

  enlaces.forEach((enlace) => {
    enlace.addEventListener("click", (evento) => {
      evento.preventDefault();
      const pagina = enlace.getAttribute("data-pagina");
      const datos = JSON.parse(localStorage.getItem("usuario"));

      if (datos && (pagina === "paginas/login.html" || pagina === "paginas/register.html")) {
        alert("Ya tienes una sesión iniciada");
        cargarPagina("paginas/inicio.html");
        return;
      }

      enlaces.forEach((elemento) => elemento.classList.remove("active"));
      enlace.classList.add("active");
      cargarPagina(pagina);
    });
  });

  cargarPagina("paginas/inicio.html");
});
