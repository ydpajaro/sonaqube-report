
function compararTareas() {
    const resultadosDiv = document.getElementById("resultados");
    resultadosDiv.innerHTML = "";

    const datosAyerTextarea = document.getElementById("datosAyerInput");
    const datosHoyTextarea = document.getElementById("datosHoyInput");

    const datosAyer = parsearDatos(datosAyerTextarea.value);
    const datosHoy = parsearDatos(datosHoyTextarea.value);

    const correosOrdenados = Object.keys(datosAyer).sort((a, b) => {
        const diferenciaA = datosHoy[a] - datosAyer[a];
        const diferenciaB = datosHoy[b] - datosAyer[b];
        return diferenciaB - diferenciaA;
    });

    const tabla = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");
   
    const encabezados = ["Correo", "Tareas de Ayer", "Tareas de Hoy", "Diferencia"];
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
        const celdas = [correo, tareasAyerCantidad, tareasHoyCantidad, `${diferencia !== 0 ? (diferencia > 0 ? "+" : "-") : ""}${Math.abs(diferencia)} tareas ${emoticono}`];

        celdas.forEach((texto,index) => {
            const td = document.createElement("td");
            td.textContent = texto;
            if (index ===3){
                td.style.color = color;
                td.style.textShadow = `1px 1px 1px ${color}`;
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
        celda.style.border = "1px solid black";
        celda.style.padding = "8px";
    });
}


function parsearDatos(texto) {
    const lineas = texto.split('\n');
    const datos = {};

    for (let i = 0; i < lineas.length; i += 1) {
        const correo = lineas[i].trim();
        const cantidad = parseInt(lineas[i + 1], 10);

        if (correo && !isNaN(cantidad)) {
            datos[correo] = cantidad;
        }
    }

    return datos;
}

function obtenerEmoticono(diferencia) {
    if (diferencia > 0) {
        return "😢"; 
    } else if (diferencia < 0) {
        return "😊"; 
    } else {
        return "✔️"; 
    }
}

function obtenerColor(diferencia) {
    if (diferencia > 0) {
        return "red"; 
    } else if (diferencia < 0) {
        return "orange";
    } else {
        return "green"; 
    }
}