window.paginaActual = "";

function actualizarMenu() {
  const datos = JSON.parse(localStorage.getItem("usuario"));
  const registerButton = document.getElementById("registerButton");
  const loginButton = document.getElementById("loginButton");
  const ofertasButton = document.getElementById("ofertasButton");
  const perfilButton = document.getElementById("perfilButton");
  const logoutButton = document.getElementById("logoutButton");
  const cuenta = document.getElementById("cuenta");

  registerButton.style.display = datos ? "none" : "";
  loginButton.style.display = datos ? "none" : "";
  ofertasButton.style.display = datos && datos.admin == 1 ? "block" : "none";
  perfilButton.style.display = datos && datos.admin != 1 ? "block" : "none";
  logoutButton.style.display = datos ? "block" : "none";

  if (datos) {
  cuenta.textContent = datos.admin == 1 ? "Bienvenido, Administrador" : "Bienvenido, " + datos.nombre;
  } else {
  cuenta.textContent = "Bienvenido, Invitado";
  }

}

function inicializarPagina(pagina) {
  if (pagina === "paginas/inicio.html") {
    mostrarOfertas(true);
    const titulo = document.getElementById("titulo");
    titulo.addEventListener("keydown", (evento) => {
      if (evento.key === "Enter") {
        evento.preventDefault();
        mostrarOferta(true);
      }
    });
  } else if (pagina === "paginas/admin.html") {
    mostrarOfertas(false);
  } else if (pagina === "paginas/cuenta.html") {
    const datos = JSON.parse(localStorage.getItem("usuario"));
    if (!datos) {
      alert("Debes iniciar sesión para acceder a esta página");
      cargarPagina("paginas/inicio.html");
      return;
    }
    if (datos.admin == 1) {
      alert("Debes ser usuario para acceder a esta página");
      cargarPagina("paginas/inicio.html");
      return;
    }
    document.getElementById("nombreUsuario").innerHTML = datos.nombre;

    document.getElementById("emailUsuario").innerHTML = datos.email;

    document.getElementById("telefonoUsuario").innerHTML = datos.telefono

    document.getElementById("estadoAcademico").innerHTML = datos.estado_academico

    document.getElementById("curriculum").innerHTML = datos.curriculum || "";

    mostrarPostulaciones();
  }
}

function cargarPagina(pagina) {
  const contenido = document.getElementById("contenido");
  contenido.innerHTML = '<div class="text-center text-muted">Cargando...</div>';

  window.paginaActual = pagina;

  return fetch(pagina)
    .then((respuesta) => {
      if (!respuesta.ok) {
        throw new Error("No se pudo cargar la página: " + pagina);
      }
      return respuesta.text();
    })
    .then((html) => {
      contenido.innerHTML = html;
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
