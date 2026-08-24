let datosOfertas = [];

addEventListener("DOMContentLoaded", mostrarOfertas)

function mostrarOfertas() {
    let url = "backend/index.php?action=ofertas";
    fetch(url)
        .then(response => response.json())
        .then(data => {
                datosOfertas=data;
                let resultDiv = document.getElementById("ofertas");
                let html = "";

                    datosOfertas.map((oferta) => {
                    html += 
                    `<div class="card-oferta">
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

            })
}

function mostrarOferta() {
    let titulo = document.getElementById("titulo").value;
    let url = "backend/index.php?action=oferta&titulo=" + titulo;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
                datosOfertas=data;
                let resultDiv = document.getElementById("ofertas");
                let html = "";

                    datosOfertas.map((oferta) => {
                    html += 
                    `<div class="card-oferta">
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

