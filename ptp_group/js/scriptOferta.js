let datosOfertas = [];



function guardarOferta() {
    let titulo = document.getElementById("titulo").value;
    let puesto = document.getElementById("puesto").value;
    let descripcion = document.getElementById("descripcion").value;
    let direccion = document.getElementById("direccion").value; 
    let modalidad = document.getElementById("modalidad").value;
    let horario = document.getElementById("horario").value;
    let salario = document.getElementById("salario").value;
    let requisitos = document.getElementById("requisitos").value;
    let url = "backend/index.php?action=agregar_oferta&titulo=" + titulo + "&puesto=" + puesto + "&descripcion=" + descripcion + "&direccion=" + direccion + "&modalidad=" + modalidad + "&horario=" + horario + "&salario=" + salario + "&requisitos=" + requisitos;
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

    if (datos.admin == 1) {
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

    let soloActivas = true;

    if (window.paginaActual == "paginas/admin.html") {
        soloActivas = false;
    }
    
    let url = "backend/index.php?action=ofertas&soloActivas=" + soloActivas;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            
            datosOfertas=data;
            let resultDiv = document.getElementById("ofertas");
            let html = "";

                datosOfertas.map((oferta) => {

                if (oferta.hora_cierre == null) {
                    oferta.hora_cierre = "No especificada";
                }

                let postularBtn = `<button class="btn-postular" onclick="postular(${oferta.id})">Postularte</button>`;
                let estadoBtn = "";
                let eliminarBtn = "";
                let postuladosBtn = "";

                if (window.paginaActual == "paginas/admin.html") {
                    postularBtn = "";
                    eliminarBtn = `<button class="btn" onclick="eliminarOferta(${oferta.id})">Eliminar</button>`;
                    estadoBtn = `<button id="estadoBtn${oferta.id}" class="btn" onclick="cambiarEstadoOferta(${oferta.id})">${oferta.estado}</button>`;
                    postuladosBtn = `<button id="postuladosBtn" class="btn" onclick="verPostulados(${oferta.id})">Ver postulados</button>`;
                }

                html += 
                `<div class="card-oferta">
                    <h3>${oferta.titulo}</h3>
                    <p><strong>Puesto:</strong> ${oferta.puesto}</p>
                    <p><strong>Descripción:</strong> ${oferta.descripcion}</p>
                    <p><strong>Dirección:</strong> ${oferta.direccion}</p>
                    <p><strong>Modalidad:</strong> ${oferta.modalidad}</p>
                    <p><strong>Horario:</strong> ${oferta.horario}</p>
                    <p><strong>Salario:</strong> ${oferta.salario}</p>
                    <p><strong>Requisitos:</strong> ${oferta.requisitos}</p>
                    <p><strong>Hora de cierre:</strong> ${oferta.hora_cierre}</p>
                    <p><strong>Hace: </strong>${tiempoTranscurrido(oferta.fecha)}</p>
                    ${estadoBtn}
                    ${eliminarBtn}
                    ${postuladosBtn}
                    ${postularBtn}
                    <ul style="display: none;" id="postulados${oferta.id}"></ul>
                </div>
                `;
                })

            resultDiv.innerHTML = html;
        })
}
        
function mostrarOferta() { 
    let titulo = document.getElementById("titulo").value;
    let modalidad = document.getElementById("modalidad").value;
    let salario = document.getElementById("salario").value;
    let requisitos = document.getElementById("requisitos").value;

    let url = "backend/index.php?action=oferta&titulo=" + titulo + "&modalidad=" + modalidad + "&salario=" + salario + "&requisitos=" + requisitos;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {

            datosOfertas = data;
            let resultDiv = document.getElementById("ofertas");
            let html = "";

                datosOfertas.map((oferta) => {

                if (oferta.hora_cierre == null) {
                    oferta.hora_cierre = "No especificada";
                }

                let postularBtn = `<button class="btn-postular" onclick="postular(${oferta.id})">Postularte</button>`;
                let eliminarBtn = "";
                let estadoBtn = "";
                let postuladosBtn = "";

                if (window.paginaActual == "paginas/admin.html") {
                    postularBtn = "";
                    eliminarBtn = `<button class="btn" onclick="eliminarOferta(${oferta.id})">Eliminar</button>`;
                    estadoBtn = `<button id="estadoBtn${oferta.id}" class="btn" onclick="cambiarEstadoOferta(${oferta.id})">${oferta.estado}</button>`;
                    postuladosBtn = `<button id="postuladosBtn" class="btn" onclick="verPostulados(${oferta.id})">Ver postulados</button>`;
                }

                html += 
                `<div class="card-oferta">
                    <h3>${oferta.titulo}</h3>
                    <p><strong>Puesto:</strong> ${oferta.puesto}</p>
                    <p><strong>Descripción:</strong> ${oferta.descripcion}</p>
                    <p><strong>Dirección:</strong> ${oferta.direccion}</p>
                    <p><strong>Modalidad:</strong> ${oferta.modalidad}</p>
                    <p><strong>Horario:</strong> ${oferta.horario}</p>
                    <p><strong>Salario:</strong> ${oferta.salario}</p>
                    <p><strong>Requisitos:</strong> ${oferta.requisitos}</p>
                    <p><strong>Hora de cierre:</strong> ${oferta.hora_cierre}</p>
                    <p><strong>Hace: </strong>${tiempoTranscurrido(oferta.fecha)}</p>
                    ${estadoBtn}
                    ${eliminarBtn}
                    ${postuladosBtn}
                    ${postularBtn}
                    <ul style="display: none;" id="postulados${oferta.id}"></ul>
                </div>
                `;
                })

            resultDiv.innerHTML = html;
        });  
}

function mostrarAgregarOferta() { //Proceso de cambio de la interfaz para mostrar el formulario de agregar oferta
    let div = document.getElementById("agregar");
    div.innerHTML = `
        <h2>Agregar Oferta</h2>
        <form id="frmOferta">

        <div>
        <label>Título</label>
            <input type="text" id="titulo" placeholder="Título de la oferta" required>
        </div>

        <br>

        <div>
        <label>Puesto</label>
            <input type="text" id="puesto" placeholder="Puesto de trabajo" required>
        </div>

        <br>

        <div>
        <label>Dirección</label>
            <input type="text" id="direccion" placeholder="Dirección del trabajo" required>
        </div>

        <br>

        <div>
        <label>Horario</label>
            <input type="radio" name="horario" value="opcion1" required> Horario fijo
            <input type="radio" name="horario" value="opcion2" required> Horario flexible

            <div>
                <label>Hora de inicio:</label>
                <input type="time" id="horaInicio" name="horaInicio" required>
                <label>Hora de fin:</label>
                <input type="time" id="horaFin" name="horaFin" required>
            </div>

            <div>
                <label>Días de trabajo:</label>
                <input type="checkbox" name="dias" value="lunes"> Lunes
                <input type="checkbox" name="dias" value="martes"> Martes
            </div>
        </div>

        <br>

        <div>
        <label>Salario</label>
            <input type="text" id="salario" placeholder="Salario ofrecido" required>
        </div>

        <br>

        <div>
        <label>Requisitos</label>
            <input type="text" id="requisitos" placeholder="Requisitos del puesto" required>
        </div>

        <br>

        <div>
        <label>Hora de cierre de la oferta (Opcional)</label>
            <input type="datetime-local" id="horaCierre">
        </div>

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

function tiempoTranscurrido(fecha) { //AVISO: Falta implentar en: ofertas y postulaciones
    const fechaNueva = new Date(fecha);
    const fechaActual = new Date();
    const diferencia = fechaActual - fechaNueva;

    const segundos = Math.floor(diferencia / 1000);
    const minutos = Math.floor(segundos / 60);
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);

    if (dias > 0) {
        return `${dias} días`;
    } else if (horas > 0) {
        return `${horas} horas`;
    } else if (minutos > 0) {
        return `${minutos} minutos`;
    } else {
        return `${segundos} segundos`;
    }
}