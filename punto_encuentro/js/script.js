// ===============================================
// Menú interactivo: carga páginas dentro de <section>
// sin refrescar el navegador, usando fetch().
// ===============================================

// Esperamos a que el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  const contenido = document.getElementById("contenido");
  const enlaces = document.querySelectorAll(".enlace-menu");

  // Función que carga un archivo HTML dentro de la sección
  function cargarPagina(ruta) {
    contenido.innerHTML = `<div class="text-center text-muted">Cargando...</div>`;

    return fetch(ruta)
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error("No se pudo cargar la página: " + ruta);
        }
        return respuesta.text();
      })
      .then((html) => {
        contenido.innerHTML = html;
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

  // Agregamos el evento click a cada enlace del menú
  enlaces.forEach((enlace) => {
    enlace.addEventListener("click", (evento) => {
      evento.preventDefault(); // evita que el link recargue la página

      const ruta = enlace.getAttribute("data-pagina");

      // Marcamos el enlace activo (efecto visual)
      enlaces.forEach((el) => el.classList.remove("active"));
      enlace.classList.add("active");

      const datos = JSON.parse(localStorage.getItem("usuario"));

    if (datos) {
        if (ruta == "paginas/index.html") {
            console.log("Sesion iniciada");
            document.getElementById("registerButton").style.display = "none";
            document.getElementById("loginButton").style.display = "none";
            document.getElementById("logoutButton").style.display = "block";
            document.getElementById("perfilButton").style.display = "block";
            document.getElementById("cuenta").textContent = "Bienvenido, " + datos.nombre;

            if (datos.admin == 1) { 
                document.getElementById("ofertasButton").style.display = "block";
            } else {
                document.getElementById("postulacionesButton").style.display = "block";
            }

        } else if (ruta == "paginas/login.html" || ruta == "paginas/register.html") {
            
                window.location.href = "index.html";
                alert("Ya tienes una sesion iniciada");
            

        } else if (ruta == "paginas/cuenta.html") {
        
        cargarPagina(ruta).then(() => {
          console.log("Bienvenido a tu cuenta");
          document.getElementById("nombreUsuario").textContent = datos.nombre;
          document.getElementById("emailUsuario").textContent = datos.email;
          document.getElementById("telefonoUsuario").textContent = datos.telefono;
          document.getElementById("estadoAcademico").textContent = datos.estado_academico;

          if (document.getElementById("curriculumLink")) {
            document.getElementById("curriculumLink").href = datos.curriculum;
            document.getElementById("curriculumLink").textContent = "Ver currículum";
          }

          if (document.getElementById("curriculumFrm") && datos.admin == 1) {
            document.getElementById("curriculumFrm").style.display = "none";
          }
        });
        return;

        }

    }

  cargarPagina(ruta);
    });
  });

  // Cargamos la página de inicio por defecto al abrir el sitio
  cargarPagina("paginas/inicio.html");
});
