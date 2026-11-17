let datosOfertas = [];

function escaparHTML(valor) {
    return String(valor ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function guardarOferta() {
    const formulario = document.getElementById("frmOferta");
    if (!formulario || !formulario.reportValidity()) return;

    let titulo = formulario.querySelector("#titulo").value;
    let puesto = formulario.querySelector("#puesto").value;
    let descripcion = formulario.querySelector("#descripcion").value;
    let direccion = formulario.querySelector("#direccion").value;
    let modalidad = formulario.querySelector("#modalidad").value;
    let horario = formulario.querySelector("#horario").value;
    let salario = formulario.querySelector("#salario").value;
    let requisitos = formulario.querySelector("#requisitos").value;

    const parametros = new URLSearchParams({
        action: "agregar_oferta", titulo, puesto, descripcion, direccion,
        modalidad, horario, salario, requisitos
    });

    fetch("backend/index.php?" + parametros.toString())
        .then(response => response.json())
        .then(data => {
            if (data == true || data.success) {
                alert("Oferta registrada con éxito");
                mostrarOfertas();
            } else {
                alert(data.mensaje || "No se pudo registrar la oferta");
            }
        })
        .catch(error => {
            console.error(error);
            alert("Ocurrió un error al registrar la oferta");
        });
}

function eliminarOferta(id) {
    const datos = JSON.parse(localStorage.getItem("usuario"));

    if (!datos || datos.admin != 1) {
        alert("Debes de ser administrador");
        return;
    }

    const parametros = new URLSearchParams({ action: "eliminar_oferta", id });

    fetch("backend/index.php?" + parametros.toString())
        .then(res => res.json())
        .then(data => {
            if (data == true || data.success) {
                cerrarDetalleOferta();
                alert("Oferta N° " + id + " eliminada con éxito");
                mostrarOfertas();
            } else {
                alert(data.mensaje || "Error al eliminar la oferta");
            }
        })
        .catch(error => {
            console.error(error);
            alert("Ocurrió un error al eliminar la oferta");
        });
}

function mostrarOfertas() {
    const soloActivas = window.paginaActual === "paginas/admin.html" ? false : true;
    const parametros = new URLSearchParams({ action: "ofertas", soloActivas });

    fetch("backend/index.php?" + parametros.toString())
        .then(response => response.json())
        .then(data => {
            datosOfertas = Array.isArray(data) ? data : [];
            renderizarTarjetasOfertas(datosOfertas);
        })
        .catch(error => {
            console.error(error);
            const contenedor = document.getElementById("ofertas");
            if (contenedor) contenedor.innerHTML = '<p class="ofertas-vacio">No se pudieron cargar las ofertas. Intenta nuevamente.</p>';
        });
}

function mostrarOferta() {
    const titulo = document.getElementById("titulo")?.value || "";
    const modalidad = document.getElementById("modalidad")?.value || "";
    const salario = document.getElementById("salario")?.value || "";
    const requisitos = document.getElementById("requisitos")?.value || "";

    const parametros = new URLSearchParams({ action: "oferta", titulo, modalidad, salario, requisitos });

    fetch("backend/index.php?" + parametros.toString())
        .then(response => response.json())
        .then(data => {
            datosOfertas = Array.isArray(data) ? data : [];
            renderizarTarjetasOfertas(datosOfertas);
        })
        .catch(error => {
            console.error(error);
            const contenedor = document.getElementById("ofertas");
            if (contenedor) contenedor.innerHTML = '<p class="ofertas-vacio">No se pudo realizar la búsqueda.</p>';
        });
}

function renderizarTarjetasOfertas(ofertas) {
    const contenedor = document.getElementById("ofertas");
    if (!contenedor) return;

    if (!ofertas.length) {
        contenedor.innerHTML = '<p class="ofertas-vacio">No hay ofertas disponibles por el momento.</p>';
        return;
    }

    const esAdmin = window.paginaActual === "paginas/admin.html";

    contenedor.innerHTML = ofertas.map(oferta => {
        const id = Number(oferta.id);
        const descripcion = oferta.descripcion || "Sin descripción disponible.";
        const estado = oferta.estado || "Activa";
        const modalidad = oferta.modalidad || "No especificada";
        const salario = oferta.salario || "A convenir";

        return `
            <article class="card-oferta" role="button" tabindex="0"
                aria-label="Ver detalles de ${escaparHTML(oferta.titulo)}"
                onclick="abrirDetalleOferta(${id})"
                onkeydown="if(event.key === 'Enter' || event.key === ' '){event.preventDefault();abrirDetalleOferta(${id});}">
                <div class="card-oferta-cabecera">
                    <span class="card-oferta-etiqueta">${esAdmin ? "Panel de ofertas" : "Oportunidad laboral"}</span>
                    ${esAdmin ? `<span class="estado-oferta ${String(estado).toLowerCase() === "activa" ? "estado-activa" : "estado-inactiva"}">${escaparHTML(estado)}</span>` : ""}
                </div>
                <h3>${escaparHTML(oferta.titulo)}</h3>
                <p class="card-oferta-puesto"><i class="bi bi-briefcase"></i> ${escaparHTML(oferta.puesto || "Puesto no especificado")}</p>
                <p class="card-oferta-resumen">${escaparHTML(descripcion)}</p>
                <div class="card-oferta-resumen-datos">
                    <span><i class="bi bi-geo-alt"></i> ${escaparHTML(modalidad)}</span>
                    <span><i class="bi bi-cash-coin"></i> ${escaparHTML(salario)}</span>
                </div>
                <div class="card-oferta-pie">
                    <span>Ver información completa</span>
                    <i class="bi bi-arrow-up-right-circle"></i>
                </div>
            </article>
        `;
    }).join("");
}

function abrirDetalleOferta(id) {
    const oferta = datosOfertas.find(item => Number(item.id) === Number(id));
    if (!oferta) return;

    cerrarDetalleOferta();

    const esAdmin = window.paginaActual === "paginas/admin.html";
    const estado = oferta.estado || "Activa";
    const horaCierre = oferta.hora_cierre || "No especificada";
    const fecha = oferta.fecha ? tiempoTranscurrido(oferta.fecha) : "No especificado";

    const acciones = esAdmin ? `
        <div class="modal-oferta-acciones">
            <button type="button" class="accion-secundaria" id="estadoBtn${Number(oferta.id)}"
                onclick="cambiarEstadoOferta(${Number(oferta.id)})">${escaparHTML(estado)}</button>
            <button type="button" class="accion-secundaria"
                onclick="verPostulados(${Number(oferta.id)})"><i class="bi bi-people"></i> Ver postulados</button>
            <button type="button" class="accion-peligro"
                onclick="eliminarOferta(${Number(oferta.id)})"><i class="bi bi-trash"></i> Eliminar oferta</button>
        </div>
    ` : `
        <div class="modal-oferta-acciones">
            <button type="button" class="accion-principal"
                onclick="cerrarDetalleOferta(); postular(${Number(oferta.id)})"><i class="bi bi-send"></i> Postularte</button>
        </div>
    `;

    const modal = document.createElement("div");
    modal.id = "modalOferta";
    modal.className = "modal-oferta-overlay";
    modal.setAttribute("role", "presentation");
    modal.innerHTML = `
        <section class="modal-oferta-panel" role="dialog" aria-modal="true" aria-labelledby="modalOfertaTitulo"
            onclick="event.stopPropagation()">
            <div class="modal-oferta-cabecera">
                <div>
                    <span class="modal-oferta-etiqueta">${esAdmin ? "Administración de oferta" : "Detalle de oportunidad"}</span>
                    <h2 id="modalOfertaTitulo">${escaparHTML(oferta.titulo)}</h2>
                    <p class="modal-oferta-puesto"><i class="bi bi-briefcase"></i> ${escaparHTML(oferta.puesto || "Puesto no especificado")}</p>
                </div>
                <button type="button" class="modal-oferta-cerrar" aria-label="Cerrar" onclick="cerrarDetalleOferta()"><i class="bi bi-x-lg"></i></button>
            </div>
            <div class="modal-oferta-contenido">
                <div class="modal-oferta-descripcion">
                    <h3><i class="bi bi-card-text"></i> Descripción</h3>
                    <p>${escaparHTML(oferta.descripcion || "Sin descripción disponible.")}</p>
                </div>
                <div class="modal-oferta-datos">
                    <div><span>Dirección</span><strong>${escaparHTML(oferta.direccion || "No especificada")}</strong></div>
                    <div><span>Modalidad</span><strong>${escaparHTML(oferta.modalidad || "No especificada")}</strong></div>
                    <div><span>Horario</span><strong>${escaparHTML(oferta.horario || "No especificado")}</strong></div>
                    <div><span>Salario</span><strong>${escaparHTML(oferta.salario || "A convenir")}</strong></div>
                    <div><span>Requisitos</span><strong>${escaparHTML(oferta.requisitos || "No especificados")}</strong></div>
                    <div><span>Hora de cierre</span><strong>${escaparHTML(horaCierre)}</strong></div>
                    <div><span>Publicada</span><strong>Hace ${escaparHTML(fecha)}</strong></div>
                    ${esAdmin ? `<div><span>Estado</span><strong>${escaparHTML(estado)}</strong></div>` : ""}
                </div>
                ${esAdmin ? `<ul class="lista-postulados" id="postulados${Number(oferta.id)}" style="display:none"></ul>` : ""}
            </div>
            <div class="modal-oferta-pie">
                ${acciones}
                <button type="button" class="accion-cerrar" onclick="cerrarDetalleOferta()">Cerrar</button>
            </div>
        </section>
    `;

    modal.addEventListener("click", cerrarDetalleOferta);
    document.body.appendChild(modal);
    document.addEventListener("keydown", manejarEscapeModalOferta);
    document.body.classList.add("modal-oferta-abierto");
}

function cerrarDetalleOferta(evento) {
    if (evento && evento.target && evento.target.id !== "modalOferta") return;
    const modal = document.getElementById("modalOferta");
    if (modal) modal.remove();
    document.removeEventListener("keydown", manejarEscapeModalOferta);
    document.body.classList.remove("modal-oferta-abierto");
}

function manejarEscapeModalOferta(evento) {
    if (evento.key === "Escape") cerrarDetalleOferta();
}

function mostrarAgregarOferta() {
    const div = document.getElementById("agregar");
    div.innerHTML = `
        <h2>Agregar oferta</h2>
        <form id="frmOferta">
            <div><label for="titulo">Título</label><input type="text" id="titulo" placeholder="Título de la oferta" required></div>
            <div><label for="puesto">Puesto</label><input type="text" id="puesto" placeholder="Puesto de trabajo" required></div>
            <div><label for="descripcion">Descripción</label><textarea id="descripcion" placeholder="Describe las tareas y responsabilidades" required></textarea></div>
            <div><label for="direccion">Dirección</label><input type="text" id="direccion" placeholder="Dirección del trabajo" required></div>
            <div><label for="modalidad">Modalidad</label>
                <select id="modalidad" required>
                    <option value="">Seleccionar modalidad</option>
                    <option value="presencial">Presencial</option>
                    <option value="remoto">Remoto</option>
                    <option value="hibrido">Híbrido</option>
                </select>
            </div>
            <div><label for="horario">Horario</label><input type="text" id="horario" placeholder="Ej. Lunes a viernes, 9 a 17" required></div>
            <div><label for="salario">Salario</label><input type="text" id="salario" placeholder="Salario ofrecido" required></div>
            <div><label for="requisitos">Requisitos</label><textarea id="requisitos" placeholder="Requisitos del puesto" required></textarea></div>
            <div><label for="horaCierre">Hora de cierre (opcional)</label><input type="datetime-local" id="horaCierre"></div>
            <button type="button" onclick="guardarOferta()">Registrar oferta</button>
        </form>
    `;

    const ofertaBtn = document.getElementById("ofertaBtn");
    ofertaBtn.textContent = "Cancelar";
    ofertaBtn.onclick = function () {
        div.innerHTML = "";
        ofertaBtn.textContent = "Crear nueva oferta";
        ofertaBtn.onclick = mostrarAgregarOferta;
    };
}

function cambiarEstadoOferta(id) {
    const estadoBtn = document.getElementById("estadoBtn" + id);
    if (!estadoBtn) return;

    const nuevoEstado = estadoBtn.innerText.trim() === "Activa" ? "Inactiva" : "Activa";
    const parametros = new URLSearchParams({ action: "estado_oferta", id, estado: nuevoEstado });

    fetch("backend/index.php?" + parametros.toString())
        .then(response => response.json())
        .then(data => {
            if (data) {
                alert("Estado de la oferta actualizado con éxito");
                cerrarDetalleOferta();
                mostrarOfertas();
            } else {
                alert("Error al actualizar el estado de la oferta");
            }
        })
        .catch(error => {
            console.error(error);
            alert("Ocurrió un error al actualizar el estado");
        });
}

function tiempoTranscurrido(fecha) {
    const fechaNueva = new Date(fecha);
    const diferencia = Math.max(0, new Date() - fechaNueva);

    const segundos = Math.floor(diferencia / 1000);
    const minutos = Math.floor(segundos / 60);
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);

    if (dias > 0) return `${dias} días`;
    if (horas > 0) return `${horas} horas`;
    if (minutos > 0) return `${minutos} minutos`;
    return `${segundos} segundos`;
}
