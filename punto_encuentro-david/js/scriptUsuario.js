datosUsuarios = [];

addEventListener("DOMContentLoaded", verificarSesion());

function agregarUsuario() {
    let form = document.getElementById("registroFrm")
    let nombre = document.getElementById("nombre").value;
    let email = document.getElementById("email").value;
    let telefono = document.getElementById("telefono").value;
    let password = document.getElementById("password").value;
    let password2 = document.getElementById("password2").value;
    let estado_academico = document.getElementsByName("estado_academico").value;
    let url = "backend/index.php?action=agregar_usuario&nombre=" + nombre + "&email=" + email + "&telefono=" + telefono + "&password=" + password + "&estado_academico=" + estado_academico;
    console.log(url);

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (data == true) {
                    alert("Registrado con exito");
                    window.location.href = "index.html";
                } else {
                    form.reset();
                    alert("Error al registrarte")
                }
            });
}

function login() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let url = "backend/index.php?action=login&email=" + email + "&password=" + password;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                alert("Login exitoso");

                localStorage.setItem("usuario", JSON.stringify(data.usuario));

                window.location.href = "index.html";
                
            } else {
                alert("Error al iniciar sesion");
            }
        });
}

function editarCuenta() {
    const datos = JSON.parse(localStorage.getItem("usuario"));

    document.getElementById("nombreUsuario").innerHTML =
        `<input type="text" id="nombreEditar" value="${datos.nombre}">`;

    document.getElementById("emailUsuario").innerHTML =
        `<input type="email" id="emailEditar" value="${datos.email}">`;

    document.getElementById("telefonoUsuario").innerHTML =
        `<input type="text" id="telefonoEditar" value="${datos.telefono}">`;

    document.getElementById("estadoAcademico").innerHTML =
        `<input type="text" id="estadoAcademicoEditar" value="${datos.estado_academico}">`;

    document.getElementById("editarBtn").innerText = "Guardar cambios";
    document.getElementById("editarBtn").onclick = guardarCambios;
}

function guardarCambios() {
    const datos = JSON.parse(localStorage.getItem("usuario"));

    let nombre = document.getElementById("nombreEditar").value;
    let email = document.getElementById("emailEditar").value;
    let telefono = document.getElementById("telefonoEditar").value;
    let estado_academico = document.getElementById("estadoAcademicoEditar").value;

    let url = "backend/index.php?action=modificar_usuario&id=" + datos.id + "&nombre=" + nombre + "&email=" + email + "&telefono=" + telefono + "&estado_academico=" + estado_academico;

    fetch(url)
        .then(res => res.json())
        .then (data => {
            if (data == true) {
                alert("Usuario modificado con exito");

                datos.nombre = nombre;
                datos.email = email;
                datos.telefono = telefono;
                datos.estado_academico = estado_academico;

                localStorage.setItem("usuario", JSON.stringify(datos));

                location.reload();

            } else {
                alert("Error al modificar usuario");
            }
        })
}


function cerrarSesion() {
    localStorage.removeItem("usuario");
    window.location.href = "index.html";
}

function eliminarCuenta() {
    let boton = document.getElementById("borrarBtn");

    boton.textContent = "¿Estas seguro?";
    boton.onclick = confirmarEliminacion;

    setTimeout(() => {
        boton.textContent = "Eliminar cuenta"
        boton.onclick = eliminarCuenta;
    }, 3000);

}

function confirmarEliminacion() {
    const datos = JSON.parse(localStorage.getItem("usuario"));

    let url = "backend/index.php?action=eliminar_usuario&id=" + datos.id;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (data == true) {
                localStorage.removeItem("usuario");
                alert("Cuenta eliminado con exito");
                window.location.href = "index.html";
                
            } else {
                alert("Error al eliminar cuenta")
            }
        })
}

function verificarSesion() {

    const datos = JSON.parse(localStorage.getItem("usuario"));

    if (datos) {

        if (window.location.pathname.endsWith("index.html")) {
            console.log("Sesion iniciada");
            document.getElementById("registerButton").style.display = "none";
            document.getElementById("loginButton").style.display = "none";
            document.getElementById("logoutButton").style.display = "inline-block";
            document.getElementById("perfilButton").style.display = "inline-block";
            document.getElementById("cuenta").textContent = "Bienvenido, " + datos.nombre;

            if (datos.admin == 1) { //Si el usuario es admin, se muestra el botón de ofertas, si no, se muestra el botón de postulaciones
                document.getElementById("ofertasButton").style.display = "inline-block";
            } else {
                document.getElementById("postulacionesButton").style.display = "inline-block";
            }

        } else if (window.location.pathname.endsWith("login.html") || window.location.pathname.endsWith("register.html")) {
            
                window.location.href = "index.html";
                alert("Ya tienes una sesion iniciada");
            

        } else if (window.location.pathname.endsWith("cuenta.html")) {
                    
                document.getElementById("nombreUsuario").textContent = datos.nombre;
                document.getElementById("emailUsuario").textContent = datos.email;
                document.getElementById("telefonoUsuario").textContent = datos.telefono;
                document.getElementById("estadoAcademico").textContent = datos.estado_academico;

        }

    }
}
