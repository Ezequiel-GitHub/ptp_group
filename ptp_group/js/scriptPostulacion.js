let datosPostulaciones = [];
let datosPostulados = [];

function postular(id_oferta) {
    const datos = JSON.parse(localStorage.getItem("usuario"));

    console.log(datos);

    if (datos) {

        if (datos.admin == 1) {

            alert("Solo puedes postularte siendo usuario no admin");

            } else if (datos.curriculum == null || datos.curriculum == "") {

                alert("Debes subir tu currículum para postularte a una oferta");

            } else {

            let url = "backend/index.php?action=agregar_postulacion&id_oferta=" + id_oferta + "&id_usuario=" + datos.id;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    if(data.success) {
                        console.log(url);

                        alert("Postulado a oferta con exito");
                    } else {
                        alert(data.mensaje || "Ya te has postulado a esta oferta anteriormente");
                    }
                })
            }

    } else {

        alert("Debes iniciar sesión para postularte a una oferta");

    }
}

function mostrarPostulaciones() {
    const datos = JSON.parse(localStorage.getItem("usuario"));

    let url = "backend/index.php?action=postulaciones_usuario&id_usuario=" + datos.id;

    fetch(url)
        .then(res => res.json())
        .then(data => {
                datosPostulaciones = data;
                let resultDiv = document.getElementById("postulaciones");
                let html = "";

                    datosPostulaciones.map((postulacion) => {
                    html += 
                    `<li> Nombre de oferta: ${postulacion.titulo} |
                    ESTADO: ${postulacion.estado} </li> 
                    <button onclick="eliminarPostulacion(${postulacion.id_postulacion})">Eliminar postulacion</button>
                    <button onclick="verOfertaPostulada(${datos.id}, ${postulacion.id})">Ver oferta</button>
                    `;
                    })

                resultDiv.innerHTML = html;

                if (datosPostulaciones.length === 0) {
                    resultDiv.innerHTML = "<p>No tienes postulaciones</p>";
                }

            })
}

function verOfertaPostulada(id_usuario, id_oferta) {

    let url = "backend/index.php?action=postulacion_usuario&id_usuario=" + id_usuario + "&id_oferta=" + id_oferta;

    fetch(url)
        .then(res => res.json())
        .then(data => {

            let ofertaDiv = document.getElementById("ofertaDiv");
            let html = ofertaDiv.innerHTML;

            if (data.hora_cierre == null || oferta.hora_cierre == "") {
                    data.hora_cierre = "No especificada";
                }

            html = `<div class="card-oferta">
                    <h3>${data.titulo}</h3>
                    <p><strong>Puesto:</strong> ${data.puesto}</p>
                    <p><strong>Descripción:</strong> ${data.descripcion}</p>
                    <p><strong>Dirección:</strong> ${data.direccion}</p>
                    <p><strong>Modalidad:</strong> ${data.modalidad}</p>
                    <p><strong>Horario:</strong> ${data.horario}</p>
                    <p><strong>Salario mensual:</strong> ${data.salario}</p>
                    <p><strong>Requisitos:</strong> ${data.requisitos}</p>
                    <p><strong>Hora de cierre:</strong> ${data.hora_cierre}</p>
                    <p><strong>Hace: </strong>${tiempoTranscurrido(data.fecha)}</p>
                    <button onclick="cerrarOfertaDiv()">X</button>
                </div>
                `;

            ofertaDiv.innerHTML = html;

            ofertaDiv.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        })
}

function cerrarOfertaDiv() {
    let ofertaDiv = document.getElementById("ofertaDiv");

    ofertaDiv.innerHTML = "";
}

function verPostulados(id_oferta) {

    let url = "backend/index.php?action=postulados&id_oferta=" + id_oferta;

    let resultDiv = document.getElementById("postulados"+(id_oferta));
    let html = resultDiv.innerHTML;

    if (resultDiv.style.display === "none") {
        resultDiv.style.display = "block";
    } else {
        resultDiv.style.display = "none";
    }
    
    html = `<input id="postulado" type="text" placeholder="Buscar postulado por nombre" >
                            <button type="button" onclick="buscarPostulante(${id_oferta})" class="button-style">🔍</button>
                            <br>`;

    resultDiv.innerHTML = html;

    fetch(url)
        .then(res => res.json())
        .then(data => {

                if(data.mensaje) {
                    alert(data.mensaje);
                } else {
                    
                    datosPostulados = data;

                    datosPostulados.map((postulado) => {
                    html +=
                        `<a>*</a>
                        <li>Nombre: ${postulado.nombre}</li> 
                        <li>CV: ${postulado.curriculum} </li>
                        <li>Email: ${postulado.email}</li>
                        <li>Teléfono: ${postulado.telefono}</li>
                        <li>Estado académico: ${postulado.estado_academico}</li>
                        <li>Hace: ${tiempoTranscurrido(postulado.fecha)}</li>
                        <select id="estado" onchange="cambiarEstado(${id_oferta}, ${postulado.id}, this.value)">
                            <option value="${postulado.estado}" selected disabled hidden>${postulado.estado}</option>
                            <option value="Pendiente">Pendiente</option>
                            <option value="Aceptado">Aceptado</option>
                            <option value="Rechazado">Rechazado</option>
                        </select>
                        <br><br>`;
                    })

                    resultDiv.innerHTML = html;
                }
        })
}

function buscarPostulante(id_oferta) {
    let nombre = document.getElementById("postulado").value;

    let url = "backend/index.php?action=postulado&id_oferta=" + id_oferta + "&nombre=" + nombre;

    let resultDiv = document.getElementById("postulados"+(id_oferta));
        let html = resultDiv.innerHTML;
        html = `<input id="postulado" type="text" placeholder="Buscar postulado por nombre" >
                    <button type="button" onclick="buscarPostulante(${id_oferta})" class="button-style">🔍</button>
                    <br>`;
        resultDiv.innerHTML = html;
    
    if (nombre === "") {
        verPostulados(id_oferta);
        verPostulados(id_oferta);
        return;
    }

    fetch(url)
        .then(res => res.json())
        .then(data => {

                if (data.mensaje) {
                    alert(data.mensaje);
                    //Cerrar la lista de postulados
                    verPostulados(id_oferta);
                    //Abrir la lista de postulados
                    verPostulados(id_oferta);
                } else {

                    datosPostulados = data;

                    datosPostulados.map((postulado) => {
                    html +=
                        `<a>*</a>
                        <li>Nombre: ${postulado.nombre}</li> 
                        <li>CV: ${postulado.curriculum} </li>
                        <li>Email: ${postulado.email}</li>
                        <li>Teléfono: ${postulado.telefono}</li>
                        <li>Estado académico: ${postulado.estado_academico}</li>
                        <li>Hace: ${tiempoTranscurrido(postulado.fecha)}</li>
                        <select id="estado" onchange="cambiarEstado(${id_oferta}, ${postulado.id}, this.value)">
                            <option value="${postulado.estado}" selected disabled hidden>${postulado.estado}</option>
                            <option value="Pendiente">Pendiente</option>
                            <option value="Aceptado">Aceptado</option>
                            <option value="Rechazado">Rechazado</option>
                        </select>
                        <br><br>`;
                    })

                    resultDiv.innerHTML = html;
                }
            
        })
}

function cambiarEstado(id_oferta, id_usuario, estado) {
    let url = "backend/index.php?action=estado_postulacion&id_oferta=" + id_oferta + "&id_usuario=" + id_usuario + "&estado=" + estado;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (data == true) {
                alert("Estado de la postulación actualizado con éxito");
            } else {
                alert("Error al actualizar el estado de la postulación");
            }
        })
}

function eliminarPostulacion(id) {
    let url = "backend/index.php?action=eliminar_postulaciones&id=" + id;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (data == true) {
                cargarPagina("paginas/cuenta.html");
                alert("Postulacion N°" + id + "eliminada con exito");
            } else {
                alert("Error al eliminar postulacion N°" + id)
            }
        })
}