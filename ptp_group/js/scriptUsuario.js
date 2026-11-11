datosUsuarios = [];

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
        const passwordValida = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s])\S{8,}$/.test(password);

        if (passwordValida) {
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    if (data.success) {

                        alert("Usuario agregado con éxito");
                        pagina = "paginas/inicio.html";
                        cargarPagina(pagina);
                    }

                    alert(data.mensaje);
                });
        } else {
            alert("La contraseña debe tener al menos 8 caracteres, una letra mayúscula, un número y un carácter especial");
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
            if (data === false) {
                alert("Completa todos los campos primero");
            } else {
                if (data.success) {
                    
                    pagina = "paginas/inicio.html";
                    cargarPagina(pagina);
                    localStorage.setItem("usuario", JSON.stringify(data.usuario));
                }

                alert(data.mensaje);
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

function cerrarSesion() {
    localStorage.removeItem("usuario");
    pagina = "paginas/inicio.html";
    cargarPagina(pagina);
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
                pagina = "paginas/inicio.html";
                cargarPagina(pagina);
                
            } else {
                alert("Error al eliminar cuenta")
            }
        })
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