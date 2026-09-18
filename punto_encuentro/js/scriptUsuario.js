datosUsuarios = [];

addEventListener("DOMContentLoaded", verificarSesion());
addEventListener("DOMContentLoaded", verPerfil());

function agregarUsuario() { 
    let nombre = document.getElementById("nombre").value;
    let email = document.getElementById("email").value;
    let telefono = document.getElementById("telefono").value;
    let password = document.getElementById("password").value;
    let password2 = document.getElementById("password2").value;
    let estado_academico = document.querySelector('input[name="estado_academico"]:checked')?.value;
    let url = "backend/index.php?action=agregar_usuario&nombre=" + nombre + "&email=" + email + "&telefono=" + telefono + "&password=" + password + "&estado_academico=" + estado_academico;
    console.log(url);

    if (password === password2) {
        const passwordValida = /^(?=.*[A-Z])(?=.*[^A-Za-z0-9\s]).{8,}$/.test(password);

        if (passwordValida) { 
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    window.location.href = "index.html";

                    localStorage.setItem("usuario", JSON.stringify(data.usuario));

                    const datos = JSON.parse(localStorage.getItem("usuario"));

                    login(datos.email, datos.password);
                }

                alert(data.mensaje);

            }); 

        } else {
            alert("La contraseña debe tener al menos 8 caracteres, una mayúscula y un carácter especial");
        }

    } else {
        alert("Las contraseñas no coinciden")
    }
}

function login() { 
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let url = "backend/index.php?action=login&email=" + email + "&password=" + password;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                
                window.location.href = "index.html";
                localStorage.setItem("usuario", JSON.stringify(data.usuario));
            }

            alert(data.mensaje);
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
            if (data.success) {

                datos.nombre = nombre;
                datos.email = email;
                datos.telefono = telefono;
                datos.estado_academico = estado_academico;

                localStorage.setItem("usuario", JSON.stringify(datos));

                location.reload();

            }

            alert(data.mensaje);
        })
}

function subirCV() {
    const datos = JSON.parse(localStorage.getItem("usuario"));

    let curriculum = document.getElementById("curriculum").value;

    let url = "backend/index.php?action=subir_cv&id=" + datos.id + "&curriculum=" + curriculum;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                document.getElementById("curriculumLink").href = curriculum;
                document.getElementById("curriculumLink").textContent = "Ver currículum";
                window.location.reload();
            }

            alert(data.mensaje);
        });
}

function cerrarSesion() {
    localStorage.removeItem("usuario");
    window.location.href = "index.html";
}

function eliminarCuenta() {
    let boton = document.getElementById("eliminarBtn");

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
            document.getElementById("logoutButton").style.display = "block";
            document.getElementById("perfilButton").style.display = "block";
            document.getElementById("cuenta").textContent = "Bienvenido, " + datos.nombre;

            if (datos.admin == 1) { 
                document.getElementById("ofertasButton").style.display = "block";
            } else {
                document.getElementById("postulacionesButton").style.display = "block";
            }

        } else if (window.location.pathname.endsWith("login.html") || window.location.pathname.endsWith("register.html")) {
            
                window.location.href = "index.html";
                alert("Ya tienes una sesion iniciada");
            

        } else if (window.location.pathname.endsWith("cuenta.html")) {
                    
                document.getElementById("nombreUsuario").textContent = datos.nombre;
                document.getElementById("emailUsuario").textContent = datos.email;
                document.getElementById("telefonoUsuario").textContent = datos.telefono;
                document.getElementById("estadoAcademico").textContent = datos.estado_academico;
                document.getElementById("curriculumLink").href = datos.curriculum;
                document.getElementById("curriculumLink").textContent = "Ver currículum";

                if (datos.admin == 1) {
                    document.getElementById("curriculumFrm").style.display = "none";
                }

        }

    }
}

function verPerfil() {
    const parametro = new URLSearchParams(window.location.search);
    const id_usuario = parametro.get("id");
    if (!id_usuario) {
        return;
    }

    let url = "backend/index.php?action=usuario&id=" + id_usuario;
    
    fetch(url)
    .then(res => res.json())
    .then(data => {
        if (data.mensaje) {
            alert(data.mensaje);
        } else {
            let resultDiv = document.getElementById("perfil");
            let html = "";

            html +=
            `<h2>Nombre: ${data.nombre}</h2>
            <p>Email: ${data.email}</p>
            <p>Teléfono: ${data.telefono}</p>
            <p>Estado académico: ${data.estado_academico}</p>
            <a href="${data.curriculum}" target="_blank">Ver currículum</a>`;

            resultDiv.innerHTML = html;
        }
    });
}