let datosOfertas = [];

function guardarOferta(id = null) {
    let titulo = document.getElementById("tituloOferta").value;
    let puesto = document.getElementById("puesto").value;
    let descripcion = document.getElementById("descripcion").value;
    let direccion = document.getElementById("direccion").value; 
    let modalidad = document.getElementById("modalidad").value;
    let salario = document.getElementById("salario").value;
    let requisitos = document.getElementById("requisitos").value;
    let fecha_cierre = document.getElementById("fechaCierre").value;
    let radioHorario = document.querySelector('input[name="horario"]:checked');
    let horario = "";

    let editando = id !== null; 

    fecha_cierre = fecha_cierre.replace("T", " ") + ":00";

    if (!radioHorario) {
        alert("Por favor, selecciona un tipo de horario.");
        return;
    }

    if (radioHorario.value === "opcion1") {
        let inicio = document.getElementById("horaInicio").value;
        let fin = document.getElementById("horaFin").value;
        
        // Obtenemos todos los días marcados en los checkbox
        let diasMarcados = Array.from(document.querySelectorAll('input[name="dias"]:checked')).map(cb => cb.value);

        if (!inicio || !fin || diasMarcados.length === 0) {
            alert("Completa la hora de inicio, fin y al menos un día de trabajo.");
            return;
        }

        horario = `${diasMarcados.join(", ")} de ${inicio} a ${fin}`;

    } else if (radioHorario.value === "opcion2") {

        horario = document.getElementById("horarioFlexible").value;

        if (!horario) {
            alert("Escribe el detalle del horario flexible.");
            return;
        }
    }

    if (!titulo || !puesto || !descripcion || !direccion || !modalidad || !horario || !salario || !requisitos) {
        alert("Completa todos los campos");
        return;
    }

    let url = "";
    if (editando) {
        url = "backend/index.php?action=editar_oferta&titulo=" + titulo + "&puesto=" + puesto + "&descripcion=" + descripcion + "&direccion=" + direccion + "&modalidad=" + modalidad + "&horario=" + horario + "&salario=" + salario + "&requisitos=" + requisitos + "&fecha_cierre=" + fecha_cierre + "&id=" + id;
    } else {
        url = "backend/index.php?action=agregar_oferta&titulo=" + titulo + "&puesto=" + puesto + "&descripcion=" + descripcion + "&direccion=" + direccion + "&modalidad=" + modalidad + "&horario=" + horario + "&salario=" + salario + "&requisitos=" + requisitos + "&fecha_cierre=" + fecha_cierre;
    }

    console.log(url);
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data == true) {
                alert("Hecho con exito");
                cargarPagina("paginas/admin.html");
            } else {
                alert("Error")
            }
        });
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
                let editarBtn = "";
                let eliminarBtn = "";
                let postuladosBtn = "";

                if (window.paginaActual == "paginas/admin.html") {
                    postularBtn = "";
                    editarBtn = `<button class="btn" onclick="mostrarFrmOferta(${oferta.id})">Editar</button>`;
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
                    <p><strong>Salario mensual:</strong> ${oferta.salario}</p>
                    <p><strong>Requisitos:</strong> ${oferta.requisitos}</p>
                    <p><strong>Hora de cierre:</strong> ${oferta.hora_cierre}</p>
                    <p><strong>Hace: </strong>${tiempoTranscurrido(oferta.fecha)}</p>
                    ${estadoBtn}
                    ${editarBtn}
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
    let soloActivas = true;

    if (window.paginaActual == "paginas/admin.html") {
        soloActivas = false;
    }

    let url = "backend/index.php?action=oferta&soloActivas=" + soloActivas + "&titulo=" + titulo + "&modalidad=" + modalidad + "&salario=" + salario + "&requisitos=" + requisitos;


    fetch(url)
        .then(response => response.json())
        .then(data => {

            let resultDiv = document.getElementById("ofertas");
            let html = "";

            if (data.mensaje) {
                return alert(data.mensaje);
            }

            datosOfertas = data;

                datosOfertas.map((oferta) => {

                if (oferta.hora_cierre == null || oferta.hora_cierre == "") {
                    oferta.hora_cierre = "No especificada";
                }

                let postularBtn = `<button class="btn-postular" onclick="postular(${oferta.id})">Postularte</button>`;
                let editarBtn = "";
                let eliminarBtn = "";
                let estadoBtn = "";
                let postuladosBtn = "";

                if (window.paginaActual == "paginas/admin.html") {
                    postularBtn = "";
                    editarBtn = `<button class="btn" onclick="mostrarFrmOferta(${oferta.id})">Editar</button>`;
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
                    <p><strong>Salario mensual:</strong> ${oferta.salario}</p>
                    <p><strong>Requisitos:</strong> ${oferta.requisitos}</p>
                    <p><strong>Hora de cierre:</strong> ${oferta.hora_cierre}</p>
                    <p><strong>Hace: </strong>${tiempoTranscurrido(oferta.fecha)}</p>
                    ${estadoBtn}
                    ${editarBtn}
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

function mostrarFrmOferta(id = null) { 
    let div = document.getElementById("agregar");
    let editando = id !== null;

    div.innerHTML = `
        <h2>${editando ? "Editar oferta" : "Agregar oferta"}</h2>
        <form id="frmOferta">

        <div>
        <label>Título</label>
            <input type="text" id="tituloOferta" placeholder="Título de la oferta" required>
        </div>
        <br>
        <div>
        <label>Puesto</label>
            <input type="text" id="puesto" placeholder="Puesto de trabajo" required>
        </div>
        <br>
        <div>
        <label>Descripcion</label>
            <input type="text" id="descripcion" placeholder="Descripcion acerca del trabajo" required>
        </div>
        <br>
        <div>
        <label>Dirección</label>
            <input type="text" id="direccion" placeholder="Dirección del trabajo" required>
        </div>
        <br>
        <div>
        <label>Modalidad</label>
            <select id="modalidad">
                <option value="">Todas</option>
                <option value="presencial">Presencial</option>
                <option value="remoto">Remoto</option>
                <option value="hibrido">Híbrido</option>
            </select>
        </div>
        <br>
        <div>
        <label>Horario</label>
            <input type="radio" name="horario" value="opcion1" onchange="verOpcion1()" required> Horario fijo
            <input type="radio" name="horario" value="opcion2" onchange="verOpcion2()" required> Horario flexible

            <div id="opcion1" style="display: none;">
                <div>
                    <label>Hora de inicio:</label>
                    <input type="time" id="horaInicio" name="horaInicio">
                    <label>Hora de fin:</label>
                    <input type="time" id="horaFin" name="horaFin">
                </div>
                <div>
                    <label>Días de trabajo:</label>
                    <input type="checkbox" name="dias" value="lunes"> Lunes
                    <input type="checkbox" name="dias" value="martes"> Martes
                    <input type="checkbox" name="dias" value="miercoles"> Miercoles
                    <input type="checkbox" name="dias" value="jueves"> Jueves
                    <input type="checkbox" name="dias" value="viernes"> Viernes
                    <input type="checkbox" name="dias" value="sabado"> Sabado
                    <input type="checkbox" name="dias" value="domingo"> Domingo 
                </div>
            </div>

            <div id="opcion2" style="display: none;">
                <input type="text" id="horarioFlexible" placeholder="Escribe sobre el horario">
            </div>
        </div>
        <br>
        <div>
        <label>Salario Mensual</label>
            <input type="number" id="salario" placeholder="Salario ofrecido" required>
        </div>
        <br>
        <div>
        <label>Requisitos</label>
            <input type="text" id="requisitos" placeholder="Requisitos del puesto" required>
        </div>
        <br>
        <div>
        <label>Fecha de cierre de la oferta (Opcional)</label>
            <input type="datetime-local" id="fechaCierre">
        </div>

        <button type="button" onclick="guardarOferta(${editando ? id : 'null'})">${editando ? "Guardar cambios" : "Registrar Oferta"}</button>
    </form>
    `;

    div.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

    if (editando) {
        let url = "backend/index.php?action=oferta&id=" + id;

        fetch(url)
            .then(res => res.json())
            .then(data => {
                let oferta = data[0];

                if (data.fecha_cierre !== null) {
                    let fecha = oferta.fecha_cierre;
                    document.getElementById("fechaCierre").value = fecha && !fecha.startsWith("0000") ? fecha.replace(" ", "T").slice(0, 16) : "";
                }

                document.getElementById("tituloOferta").value = oferta.titulo;
                document.getElementById("puesto").value = oferta.puesto;
                document.getElementById("descripcion").value = oferta.descripcion;
                document.getElementById("direccion").value = oferta.direccion;
                document.getElementById("modalidad").value = oferta.modalidad.toLowerCase();;
                document.getElementById("salario").value = oferta.salario;
                document.getElementById("requisitos").value = oferta.requisitos;
                

            })
    }

    let ofertaBtn = document.getElementById("ofertaBtn");
    ofertaBtn.textContent = "Cancelar";
    ofertaBtn.onclick = function() {
        let div = document.getElementById("agregar");
        div.innerHTML = "";
        ofertaBtn.textContent = "Crear nueva oferta";
        ofertaBtn.onclick = mostrarFrmOferta;
    };
}

function verOpcion1() {

    document.getElementById("opcion1").style.display = "inline-block";

    document.getElementById("opcion2").style.display = "none";
}

function verOpcion2() {

    document.getElementById("opcion2").style.display = "inline-block";

    document.getElementById("opcion1").style.display = "none";
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

function tiempoTranscurrido(fecha) { 
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