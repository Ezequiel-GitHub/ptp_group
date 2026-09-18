let datosOfertas = [];

addEventListener("DOMContentLoaded", mostrarOfertas)

function guardarOferta() {
    let titulo = document.getElementById("titulo").value;
    let puesto = document.getElementById("puesto").value;
    let direccion = document.getElementById("direccion").value; 
    let horario = document.getElementById("horario").value;
    let salario = document.getElementById("salario").value;
    let requisitos = document.getElementById("requisitos").value;
    let url = "backend/index.php?action=agregar_oferta&titulo=" + titulo + "&puesto=" + puesto + "&direccion=" + direccion + "&horario=" + horario + "&salario=" + salario + "&requisitos=" + requisitos
    console.log(url);
    fetch(url)
        .then(response => response.json())
        //true/false
        .then(data => {
            if (data == true) {
                alert("Oferta registrada con exito");
                mostrarOfertas();
            } else {
                alert("Error")
            }
            alert(data);
        });
    document.getElementById("titulo").value = "";
    document.getElementById("puesto").value = "";
    document.getElementById("direccion").value = ""; 
    document.getElementById("horario").value = "";
    document.getElementById("salario").value = "";
    document.getElementById("requisitos").value = "";
}

function eliminarOferta(id) {
    const datos = JSON.parse(localStorage.getItem("usuario"));
    let url = "backend/index.php?action=eliminar_oferta&id=" + id;

    if (datos.admin = 1) {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                if(data == true) {
                    alert("Oferta N°" + id + "borrada con exito");
                    mostrarOfertas();
                } else {
                    alert("Error al eliminar oferta");
                }
            })
    } else {
        alert("Debes de ser admin");
    }
}

function mostrarOfertas() { 

    let soloActivas = "";

    if (window.location.pathname.endsWith("oferta.html")) {
        soloActivas = false;
    } else {
        soloActivas = true;
    }

    let url = "backend/index.php?action=ofertas&soloActivas=" + soloActivas;
    fetch(url)
        .then(response => response.json())
        //true/false
        .then(data => {
            datosOfertas=data;
            let resultDiv = document.getElementById("ofertas");
            let html = "";

                datosOfertas.map((oferta) => {

                let postularBtn = `<button class="btn-postular" onclick="postular(${oferta.id})">Postularte</button>`;
                let estadoBtn = "";
                let eliminarBtn = "";
                let postuladosBtn = "";

                if (window.location.pathname.endsWith("oferta.html")) {
                    postularBtn = "";
                    eliminarBtn = `<button class="btn" onclick="eliminarOferta(${oferta.id})">Eliminar</button>`;
                    estadoBtn = `<button id="estadoBtn${oferta.id}" class="btn" onclick="cambiarEstadoOferta(${oferta.id})">${oferta.estado}</button>`;
                    postuladosBtn = `<button id="postuladosBtn" class="btn" onclick="verPostulados(${oferta.id})">Ver postulados</button>`;
                }

                html += 
                `<div class="card-oferta">
                    <h3>${oferta.titulo}</h3>
                    <p><strong>Puesto:</strong> ${oferta.puesto}</p>
                    <p><strong>Dirección:</strong> ${oferta.direccion}</p>
                    <p><strong>Horario:</strong> ${oferta.horario}</p>
                    <p><strong>Salario:</strong> ${oferta.salario}</p>
                    <p><strong>Requisitos:</strong> ${oferta.requisitos}</p>
                    ${postularBtn}
                    ${estadoBtn}
                    ${eliminarBtn}
                    ${postuladosBtn}
                    <ul style="display: none;" id="postulados${oferta.id}"></ul>
                </div>
                `;
                })

            resultDiv.innerHTML = html;

        })
}
        
function mostrarOferta() { /*CAMBIO*/
    let titulo = document.getElementById("titulo").value;
    let url = "backend/index.php?action=oferta&titulo=" + titulo;
    
    fetch(url)
        .then(response => response.json())
        //true/false
        .then(data => {

            if(titulo == "") {
                mostrarOfertas();
            }

            let resultDiv = document.getElementById("ofertas");

            if (data.mensaje) {
                resultDiv.innerHTML = "";
                alert(data.mensaje);
            } else {

            datosOfertas = data;
                
            let html = "";

                datosOfertas.map((oferta) => {
                html += 
                `<div class="card-oferta" id=${oferta.id}>
                    <h3>${oferta.titulo}</h3>
                    <p><strong>Puesto:</strong> ${oferta.puesto}</p>
                    <p><strong>Dirección:</strong> ${oferta.direccion}</p>
                    <p><strong>Horario:</strong> ${oferta.horario}</p>
                    <p><strong>Salario:</strong> ${oferta.salario}</p>
                    <p><strong>Requisitos:</strong> ${oferta.requisitos}</p>
                    <button class="btn-postular" onclick="postular(${oferta.id})">Postularte</button>
                </div>
                `;
                })

            resultDiv.innerHTML = html;
            }

        });
        
}

function mostrarAgregarOferta() {
    let div = document.getElementById("agregar");
    div.innerHTML = `
        <h2>Agregar Oferta</h2>
        <form id="frmOferta">
        <label>Título
            <input type="text" id="titulo" placeholder="Título de la oferta" required>
        </label>
        <br>
        <label>Puesto
            <input type="text" id="puesto" placeholder="Puesto de trabajo" required>
        <br>
        <label>Dirección
            <input type="text" id="direccion" placeholder="Dirección del trabajo" required>
        </label>
        <br>
        <label>Horario
            <input type="text" id="horario" placeholder="Horario laboral" required>
        </label>
        <br>
        <label>Salario
            <input type="text" id="salario" placeholder="Salario ofrecido" required>
        </label>
        <br>
        <label>Requisitos
            <input type="text" id="requisitos" placeholder="Requisitos del puesto" required>
        </label>
        <br>
        <button type="button" onClick="guardarOferta()">Registrar Oferta</button>
    </form>
    `;

    let ofertaBtn = document.getElementById("ofertaBtn");
    ofertaBtn.textContent = "Cancelar";
    ofertaBtn.onclick = function() {
        let div = document.getElementById("agregar");
        div.innerHTML = "";
        ofertaBtn.textContent = "Crear nueva oferta";
        ofertaBtn.onclick = mostrarAgregarOferta;
    };
}

function cambiarEstadoOferta(id) {
    let estadoBtn = document.getElementById("estadoBtn" + id);
    if (estadoBtn.innerText === "Activa") {
        estadoBtn.innerText = "Inactiva";
    } else {
        estadoBtn.innerText = "Activa";
    }

    let url = "backend/index.php?action=estado_oferta&id=" + id + "&estado=" + estadoBtn.innerText;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data) {
                alert("Estado de la oferta actualizado con éxito");
                mostrarOfertas();
            } else {
                alert("Error al actualizar el estado de la oferta");
            }
        });
}