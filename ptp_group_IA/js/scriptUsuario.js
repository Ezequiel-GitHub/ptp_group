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

function obtenerUsuarioActual() {
    try {
        return JSON.parse(localStorage.getItem("usuario"));
    } catch (error) {
        return null;
    }
}

function mostrarDatosCuenta(datos = obtenerUsuarioActual()) {
    if (!datos) return;
    document.getElementById("nombreUsuario").textContent = datos.nombre || "—";
    document.getElementById("emailUsuario").textContent = datos.email || "—";
    document.getElementById("telefonoUsuario").textContent = datos.telefono || "—";
    document.getElementById("estadoAcademico").textContent = datos.estado_academico || "—";
    mostrarEnlaceCV(datos.curriculum || "");
}

function crearCampoEdicion(id, valor, tipo = "text") {
    const input = document.createElement("input");
    input.type = tipo;
    input.id = id;
    input.className = "form-control cuenta-input-edicion";
    input.value = valor || "";
    input.maxLength = 255;
    return input;
}

function editarCuenta() {
    const datos = obtenerUsuarioActual();
    if (!datos) return alert("Debes iniciar sesión para editar tu cuenta.");

    const campos = [
        ["nombreUsuario", "nombreEditar", datos.nombre, "text"],
        ["emailUsuario", "emailEditar", datos.email, "email"],
        ["telefonoUsuario", "telefonoEditar", datos.telefono, "tel"]
    ];

    campos.forEach(([contenedorId, inputId, valor, tipo]) => {
        const contenedor = document.getElementById(contenedorId);
        contenedor.replaceChildren(crearCampoEdicion(inputId, valor, tipo));
    });

    const estado = document.getElementById("estadoAcademico");
    const selector = document.createElement("select");
    selector.id = "estadoAcademicoEditar";
    selector.className = "form-select cuenta-input-edicion";
    ["Estudiante", "Egresado"].forEach(opcion => {
        const option = document.createElement("option");
        option.value = opcion;
        option.textContent = opcion;
        option.selected = (datos.estado_academico || "") === opcion;
        selector.appendChild(option);
    });
    if (!["Estudiante", "Egresado"].includes(datos.estado_academico)) {
        const actual = document.createElement("option");
        actual.value = datos.estado_academico || "";
        actual.textContent = datos.estado_academico || "Selecciona un estado";
        actual.selected = true;
        selector.insertBefore(actual, selector.firstChild);
    }
    estado.replaceChildren(selector);

    const boton = document.getElementById("editarBtn");
    boton.innerHTML = '<i class="bi bi-check2"></i> Guardar cambios';
    boton.onclick = guardarCambios;

    const cancelar = document.createElement("button");
    cancelar.type = "button";
    cancelar.id = "cancelarBtn";
    cancelar.className = "button-styleI";
    cancelar.innerHTML = '<i class="bi bi-x-lg"></i> Cancelar';
    cancelar.onclick = cancelarEditarCuenta;
    boton.parentElement.appendChild(cancelar);
}

function cancelarEditarCuenta() {
    const cancelar = document.getElementById("cancelarBtn");
    if (cancelar) cancelar.remove();
    mostrarDatosCuenta();

    const boton = document.getElementById("editarBtn");
    boton.innerHTML = '<i class="bi bi-pencil-square"></i> Editar cuenta';
    boton.onclick = editarCuenta;
}

function guardarCambios() {
    const datos = obtenerUsuarioActual();
    if (!datos) return alert("Debes iniciar sesión para editar tu cuenta.");

    const nombre = document.getElementById("nombreEditar").value.trim();
    const email = document.getElementById("emailEditar").value.trim();
    const telefono = document.getElementById("telefonoEditar").value.trim();
    const estadoAcademico = document.getElementById("estadoAcademicoEditar").value;

    if (!nombre || !email || !telefono || !estadoAcademico) {
        return alert("Completa todos los campos antes de guardar.");
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return alert("Ingresa un correo electrónico válido.");
    }

    const parametros = new URLSearchParams({
        action: "modificar_usuario",
        id: datos.id,
        nombre,
        email,
        telefono,
        estado_academico: estadoAcademico
    });

    const boton = document.getElementById("editarBtn");
    boton.disabled = true;

    fetch("backend/index.php?" + parametros.toString())
        .then(res => res.json())
        .then(data => {
            if (!data.success) {
                alert(data.mensaje || "No se pudieron guardar los cambios.");
                return;
            }

            datos.nombre = nombre;
            datos.email = email;
            datos.telefono = telefono;
            datos.estado_academico = estadoAcademico;
            localStorage.setItem("usuario", JSON.stringify(datos));
            mostrarDatosCuenta(datos);
            cancelarEditarCuenta();
            alert(data.mensaje || "Tus datos se actualizaron correctamente.");
            if (typeof actualizarMenu === "function") actualizarMenu();
        })
        .catch(() => alert("No se pudo conectar con el servidor."))
        .finally(() => { boton.disabled = false; });
}

function mostrarEnlaceCV(curriculum) {
    const enlace = document.getElementById("curriculum");
    const estado = document.getElementById("cvEstado");
    if (!enlace || !estado) return;

    let enlaceValido = false;
    if (curriculum) {
        try {
            const url = new URL(curriculum);
            enlaceValido = ["http:", "https:"].includes(url.protocol) && url.hostname.includes(".");
        } catch (error) {
            enlaceValido = false;
        }
    }

    if (enlaceValido) {
        enlace.href = curriculum;
        enlace.textContent = curriculum;
        enlace.hidden = false;
        estado.textContent = "Tu currículum está disponible en el siguiente enlace:";
    } else {
        enlace.removeAttribute("href");
        enlace.textContent = "";
        enlace.hidden = true;
        estado.textContent = "Todavía no has añadido un enlace a tu currículum.";
    }

    const boton = document.getElementById("cvBtn");
    if (boton) boton.innerHTML = enlaceValido
        ? '<i class="bi bi-pencil"></i> Editar currículum'
        : '<i class="bi bi-plus-lg"></i> Añadir currículum';
}

function editarCV() {
    const datos = obtenerUsuarioActual();
    if (!datos) return alert("Debes iniciar sesión para editar tu currículum.");

    const contenedor = document.getElementById("cv");
    if (document.getElementById("curriculumEditar")) return;

    const enlace = document.getElementById("curriculum");
    const campo = crearCampoEdicion("curriculumEditar", datos.curriculum || "", "url");
    campo.placeholder = "https://...";
    campo.maxLength = 2048;
    enlace.hidden = true;
    enlace.parentElement.appendChild(campo);

    const boton = document.getElementById("cvBtn");
    boton.innerHTML = '<i class="bi bi-check2"></i> Guardar enlace';
    boton.onclick = subirCV;

    const cancelar = document.createElement("button");
    cancelar.type = "button";
    cancelar.id = "cancelarCVBtn";
    cancelar.className = "button-styleI cuenta-cv-cancelar";
    cancelar.innerHTML = '<i class="bi bi-x-lg"></i> Cancelar';
    cancelar.onclick = cancelarEditarCV;
    contenedor.appendChild(cancelar);
    campo.focus();
}

function subirCV() {
    const datos = obtenerUsuarioActual();
    const campo = document.getElementById("curriculumEditar");
    if (!datos || !campo) return;

    const curriculum = campo.value.trim();
    if (!curriculum) return alert("Pega el enlace de tu currículum.");

    let url;
    try {
        url = new URL(curriculum);
    } catch (error) {
        return alert("Ingresa un enlace válido que comience con https:// o http://.");
    }
    if (!["http:", "https:"].includes(url.protocol) || !url.hostname.includes(".")) {
        return alert("Ingresa un enlace válido que comience con https:// o http://.");
    }

    const parametros = new URLSearchParams({
        action: "subir_cv",
        id: datos.id,
        curriculum
    });
    const boton = document.getElementById("cvBtn");
    boton.disabled = true;

    fetch("backend/index.php?" + parametros.toString())
        .then(res => res.json())
        .then(data => {
            if (!data.success) {
                alert(data.mensaje || "No se pudo guardar el enlace.");
                return;
            }
            datos.curriculum = curriculum;
            localStorage.setItem("usuario", JSON.stringify(datos));
            cancelarEditarCV();
            alert(data.mensaje || "El enlace de tu currículum se guardó correctamente.");
        })
        .catch(() => alert("No se pudo conectar con el servidor."))
        .finally(() => { boton.disabled = false; });
}

function cancelarEditarCV() {
    const campo = document.getElementById("curriculumEditar");
    if (campo) campo.remove();
    const cancelar = document.getElementById("cancelarCVBtn");
    if (cancelar) cancelar.remove();

    const datos = obtenerUsuarioActual();
    mostrarEnlaceCV(datos?.curriculum || "");
    const boton = document.getElementById("cvBtn");
    boton.onclick = editarCV;
}

function cerrarSesion() {
    localStorage.removeItem("usuario");
    pagina = "paginas/inicio.html";
    cargarPagina(pagina);
}

function confirmarEliminacion() {
    const datos = obtenerUsuarioActual();
    if (!datos) return alert("No se encontró una sesión activa.");
    if (!confirm("¿Seguro que deseas eliminar tu cuenta? Esta acción no se puede deshacer.")) return;

    const parametros = new URLSearchParams({ action: "eliminar_usuario", id: datos.id });
    const boton = document.getElementById("borrarBtn");
    if (boton) boton.disabled = true;

    fetch("backend/index.php?" + parametros.toString())
        .then(res => res.json())
        .then(data => {
            if (data === true || data.success) {
                localStorage.removeItem("usuario");
                alert("Tu cuenta se eliminó correctamente.");
                cargarPagina("paginas/inicio.html");
            } else {
                alert(data.mensaje || "No se pudo eliminar la cuenta.");
            }
        })
        .catch(() => alert("No se pudo conectar con el servidor."))
        .finally(() => { if (boton) boton.disabled = false; });
}
