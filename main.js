
function compararTareas() {
    const resultadosDiv = document.getElementById("resultados");
    resultadosDiv.innerHTML = "";

    const datosAyerTextarea = document.getElementById("datosAyerInput");
    const datosHoyTextarea = document.getElementById("datosHoyInput");

    if (!datosAyerTextarea.value.trim() || !datosHoyTextarea.value.trim()) {
        resultadosDiv.textContent = "Por favor, ingresa datos en ambas áreas.";
        return;  
    }

    const datosAyer = parsearDatos(datosAyerTextarea.value);
    const datosHoy = parsearDatos(datosHoyTextarea.value);

    Object.keys(datosAyer).forEach(correo => {
        if (!datosHoy.hasOwnProperty(correo)) {
            datosHoy[correo] = 0; 
        }
        
    });
    Object.keys(datosHoy).forEach(correo => {
        if (!datosAyer.hasOwnProperty(correo)) {
            datosAyer[correo] = 0; 
        }
    });

    const correosOrdenados = Object.keys(datosAyer).sort((a, b) => {
        const tareasAyerA = datosAyer[a];
        const tareasHoyA = datosHoy[a];
        const tareasAyerB = datosAyer[b];
        const tareasHoyB = datosHoy[b];
    
        const tareasPendientesA = tareasHoyA - tareasAyerA;
        const tareasPendientesB = tareasHoyB - tareasAyerB;
    
        return tareasPendientesB - tareasPendientesA;
    });
    const tabla = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");
   
    const encabezados = ["Usuario", "Ayer", "Hoy", "Diferencia"];
    const encabezadosRow = document.createElement("tr");

    encabezados.forEach(texto => {
        const th = document.createElement("th");
        th.textContent = texto;
        encabezadosRow.appendChild(th);
    });
    
    thead.appendChild(encabezadosRow);
    tabla.appendChild(thead);


    correosOrdenados.forEach(correo => {
        const tareasAyerCantidad = datosAyer[correo];     
        const tareasHoyCantidad = datosHoy[correo];
        const diferencia = tareasHoyCantidad - tareasAyerCantidad;
        const emoticono = obtenerEmoticono(diferencia);
        const color = obtenerColor(diferencia);

        const fila = document.createElement("tr");
        const cantidadAbsoluta = Math.abs(diferencia);
        const palabraTarea = cantidadAbsoluta === 1 ? "tarea" : "tareas";
        const celdas = [correo, tareasAyerCantidad, tareasHoyCantidad, `${diferencia !== 0 ? (diferencia >= 0 ? "+" : "-") : "+"}${Math.abs(diferencia)} ${palabraTarea} ${emoticono}`];

        celdas.forEach((texto,index) => {
            const td = document.createElement("td");
            td.textContent = texto;
            if (index ===3){
                td.style.color = color;
                td.style.verticalAlign = "middle"; 
                td.style.lineHeight = "1.5"; 
            }
            fila.appendChild(td);
        });

        tbody.appendChild(fila);
    });

    tabla.appendChild(tbody);
    resultadosDiv.appendChild(tabla);

    tabla.style.borderCollapse = "collapse";
    const celdasTabla = tabla.querySelectorAll("td, th");
    celdasTabla.forEach(celda => {
        celda.style.border = "1px solid grey";
        celda.style.padding = "8px";
    });
}


function parsearDatos(texto) {
    const lineas = texto.split('\n');
    const datos = {};

    for (let i = 0; i < lineas.length; i += 1) {
        const correoSinDominio = removerDominio(lineas[i].trim());
        const cantidad = parseInt(lineas[i + 1], 10);

        if (correoSinDominio && !isNaN(cantidad)) {
            datos[correoSinDominio] = cantidad;
        }
    }

    return datos;
}

function obtenerEmoticono(diferencia) {
    if (diferencia > 0) {
        const flechaArriba = '\u2191'
        return flechaArriba; 
    } else if (diferencia < 0) {
        const flechaAbajo = '\u2193'
        return flechaAbajo; 
    } else {
        marcaDeVerificacion = '\u2714'
        return marcaDeVerificacion; 
    }
}

function obtenerColor(diferencia) {
    if (diferencia > 0) {
        return "red"; 
    } else if (diferencia < 0) {
        return "green";
    } else {
        return "black"; 
    }
}


function removerDominio(correo) {
    const partes = correo.split('@');
    const nombreUsuario = partes[0];
    return nombreUsuario;
}
