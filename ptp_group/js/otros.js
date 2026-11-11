function editarCV() {
    const datos = JSON.parse(localStorage.getItem("usuario"));

    document.getElementById("curriculum").innerHTML =
    `<input type="text" id="cvEditar" value="${datos.curriculum}">`;

    document.getElementById("cvBtn").innerText = "Guardar currículum";
    document.getElementById("cvBtn").onclick = subirCV;

}

function subirCV() {
    const datos = JSON.parse(localStorage.getItem("usuario"));  

    let curriculum = document.getElementById("cvEditar").value;

    let url = "backend/index.php?action=subir_cv&id=" + datos.id + "&curriculum=" + curriculum;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                location.reload();
                cargarPagina("paginas/cuenta.html");
                document.getElementById("cvBtn").innerText = "Editar currículum";
            }

            alert(data.mensaje);
        });
}

function mostrarContraseña() {
    let input = document.getElementById("password");
    let input2 = document.getElementById("password2");
    if (input.type === "password") {
        input.type = "text";
        input2.type = "text";
    } else {
        input.type = "password";
        input2.type = "password";
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