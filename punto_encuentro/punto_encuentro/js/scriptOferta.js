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

function mostrarOfertas() {
    let url = "backend/index.php?action=ofertas";
    fetch(url)
        .then(response => response.json())
        //true/false
        .then(data => {
                datosOfertas=data;
                let resultDiv = document.getElementById("ofertas");
                let html = "";
               
                const datos = JSON.parse(localStorage.getItem("usuario"));

                    datosOfertas.map((oferta) => {
                    html += 
                    `<li> Titulo: ${oferta.titulo} |
                    Puesto: ${oferta.puesto} |
                    Direccion: ${oferta.direccion} |
                    Horario ${oferta.horario} |
                    Salario ${oferta.salario} |
                    Requisitos ${oferta.requisitos} </li> 
                    <button id="postularBtn" onclick="postular(${oferta.id})">Postularte</button>
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
        //true/false
        .then(data => {
                datosOfertas=data;
                let resultDiv = document.getElementById("ofertas");
                let html = "";

                    datosOfertas.map((oferta) => {
                    html += 
                    `<li> Titulo: ${oferta.titulo} |
                    Puesto: ${oferta.puesto} |
                    Direccion: ${oferta.direccion} |
                    Horario ${oferta.horario} |
                    Salario ${oferta.salario} |
                    Requisitos ${oferta.requisitos} </li> 
                    <button id="postularBtn" onclick="postular(${oferta.id})">Postularte</button>
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

