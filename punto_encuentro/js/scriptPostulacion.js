let datosPostulaciones = [];
let datosPostulados = [];

if (window.location.pathname.endsWith("postulaciones.html")) {
    addEventListener("DOMContentLoaded", mostrarPostulaciones)
}
function postular(id_oferta) {
    const datos = JSON.parse(localStorage.getItem("usuario"));

    if (datos) {

        if (datos.admin == 0) {

            alert("Solo puedes postularte siempre usuario no admin");

            } else if (datos.curriculum) {

                alert("Debes subir tu currículum para postularte a una oferta");

            } else {

            let url = "backend/index.php?action=agregar_postulacion&id_oferta=" + id_oferta + "&id_usuario=" + datos.id;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    if(data.success) {
                        console.log(url);

                        alert("Postulado a oferta N° " + id_oferta + " con exito");
                    } else {
                        alert("Ya te habías postulado a esta oferta");
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
                    `<li> ID USUARIO: ${postulacion.id_usuario} |
                    ID OFERTA: ${postulacion.id_oferta} |
                    ESTADO: ${postulacion.estado} </li> 
                    <button onclick="eliminarPostulacion(${postulacion.id})">Eliminar postulacion</button>
                    `;
                    })

                resultDiv.innerHTML = html;

            })
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
    

    fetch(url)
        .then(res => res.json())
        .then(data => {

                if(data.mensaje) {
                alert(data.mensaje);
                
                } else {
                    
                    if (html == "") {
                    datosPostulados = data;

                    datosPostulados.map((postulado) => {
                    html +=
                        `<li>Nombre: ${postulado.nombre}</li> 
                        <a href="cuenta.html?id=${postulado.id}">Ver perfil</a>`;
                    })

                    resultDiv.innerHTML = html;
                    }
                }
        })
}

function eliminarPostulacion(id) {
    let url = "backend/index.php?action=eliminar_postulaciones&id=" + id;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (data == true) {
                location.reload();
                alert("Postulacion N°" + id + "eliminada con exito");
            } else {
                alert("Error al eliminar postulacion N°" + id)
            }
        })
}