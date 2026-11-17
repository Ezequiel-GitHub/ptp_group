function mostrarContraseña() {

    let esRecuperacion = document.getElementById("recuperacionEmail") !== null;

    let input = document.getElementById("password");

    if (!esRecuperacion) {
    let input2 = document.getElementById("password2");
    }

    if (input.type === "password") {
        input.type = "text";

        if (!esRecuperacion) {
        input2.type = "text";
        }
    } else {
        input.type = "password";

        if (!esRecuperacion) {
        input2.type = "password";
        }
    }
}

function mostrarFiltros() {
    let form = document.getElementById("busquedaForm");
    if (form.style.display === "none") {
        form.style.display = "block";
    } else {
        form.style.display = "none";
    }
}

function datosAdmin() {
    fetch("backend/index.php?action=datos_admin")
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                document.getElementById("totalUsuarios").innerHTML = data.totalUsuarios;
                document.getElementById("totalOfertas").innerHTML = data.totalOfertas;
                document.getElementById("totalPostulaciones").innerHTML = data.totalPostulaciones;
            }
        });
}

function solicitarCodigo() {
    let email = document.getElementById("recuperacionEmail").value;

    if (!email) {
        return alert("Escribe tu correo.");
    }

    url = "backend/index.php?action=enviar_codigo&email=" + email;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            alert(data.mensaje)
            if (data.success) {
                document.getElementById("paso1").style.display = "none";
                document.getElementById("paso2").style.display = "block";
            }
        })
}

function cambiarContraseña() {
    let email = document.getElementById("recuperacionEmail").value;
    let codigo = document.getElementById("codigo").value;
    let nuevaContraseña = document.getElementById("password").value;

    if (!codigo || !nuevaContraseña) {
        return alert("Completa todos los campos.");
    }

    const passwordValida = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s])\S{8,}$/.test(nuevaContraseña);

    if (!passwordValida) {
        return alert("La contraseña debe tener al menos 8 caracteres, una letra mayúscula, un número y un carácter especial.");
    }

    let url = "backend/index.php?action=restablecer_contraseña&email=" + email + "&codigo=" + codigo + "&nueva_contrasena=" + nuevaContraseña;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            alert(data.mensaje);
            if (data.success) {
                cargarPagina("paginas/login.html");
            }
        })
}