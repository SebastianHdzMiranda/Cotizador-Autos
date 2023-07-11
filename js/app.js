// Constructor datos de seguro
function Seguro(marca, year, tipo) {
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}
// Proto cotizador
Seguro.prototype.cotizarSeguro = function () {
    /*  cantidad por marca
        1 = Americano +15%
        2 = Asiatico +5%
        3 = Europeo +35%
    */
   let cantidad; 
   const base = 2000;

    switch (this.marca) {
        case '1':
            console.log('Americano');
            cantidad = base * 1.15;
            break;
        case '2':
            console.log('Asiatico');
            cantidad = base * 1.05;
            break;
        case '3':
            console.log('Europeo');
            cantidad = base * 1.35;
            break;
    
        default:
            break;
    }
    console.log(cantidad);

    /* cantidad por  año
    -------------------------------------*/
    // Leer el año de antiguedad
    const antiguedad = new Date().getFullYear() - this.year;

    // Por cada año que la diferencia es mayor, el costo va a reducirse un 3%
    const descuento = antiguedad * 0.03;
    cantidad -= (cantidad * descuento);
    console.log(cantidad);


    /*  cantidad por tipo
        Si el seguro es basico se multiplica por 30% mas
        Si el seguro es completo  se multiplica por 50% mas
    */
    if (this.tipo === 'basico') {
        cantidad *= 1.3;
    } else{
        cantidad *= 1.5;
    }
    console.log(cantidad);        
    return cantidad;
}

// constructor User Interface (relacionado a la interface visual)
function UI() {};
// proto llenar years
UI.prototype.llenarOpciones = ()=>{
    const max = new Date().getFullYear(),
    min = max - 20;
    
    const selectYear = document.querySelector('#year');

    for (let i = max; i > min; i--) {
        let option = document.createElement('option');
        option.value = i;
        option.textContent= i;
        selectYear.appendChild(option);
    }
    
};
// proto mensajes de alerta
UI.prototype.mostrarMensaje = (mensaje, tipo)=>{
    // comprobar si existe
    const verificar = document.querySelector('.mensaje');
    if (verificar) {
        verificar.remove();
    }

    const div =  document.createElement('div');
    div.classList.add('mensaje', 'mt-10');

    if (tipo === 'error') {
        div.classList.add('error', 'mt-10');
        const verificar = document.querySelector('#resultado div');
        if (verificar) {
            verificar.remove();
        }
    } else{
        div.classList.add('correcto');
    }

    div.textContent = mensaje;

    // Insertar en HTML
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.insertBefore(div, document.querySelector('#resultado')); 

    setTimeout(() => {
        div.remove();
    }, 3000);
    
}
// proto resumen
UI.prototype.resumen = (seguro, total)=> {
    // destructuring al objeto 'seguro'
    const {marca, year, tipo} = seguro;
    
    //asignando nombres a marca 
    let textoMarca;
    switch (marca) {
        case '1':
            textoMarca = 'Americano';
            break;
        case '2':
            textoMarca = 'Asiatico';
            break;
        case '3':
            textoMarca = 'Europeo';
            break;
    
        default:
            break;
    }

    // comprobar si existe
    const verificar = document.querySelector('#resultado div');
    if (verificar) {
        verificar.remove();
    }

    const resultado = document.querySelector('#resultado');
    const div = document.createElement('div');
    div.classList.add('mt-10');
    div.innerHTML= `
        <p class="header">Tu resumen</p>
        <p class="font-bold">Marca: <span class="font-normal">${textoMarca}</span></p>
        <p class="font-bold">Año: <span class="font-normal">${year}</span></p>
        <p class="font-bold">Tipo: <span class="font-normal capitalize">${tipo}</span></p>
        <p class="font-bold">Total: <span class="font-normal">$${total}</span></p>
    `;

    setTimeout(() => {
        resultado.appendChild(div); 
    }, 3000);

    // Mostrar Spinner
    const spinner = document.querySelector('#cargando');
    spinner.style.display = 'block';

    setTimeout(() => {
        spinner.style.display = 'none';
    }, 3000);

}

// instancia de constructor UI
const ui = new UI();


document.addEventListener('DOMContentLoaded', ()=>{
    ui.llenarOpciones(); //llena el select con los años
    
});

eventListeners();
function eventListeners() {
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit', cotizarSeguro);

}
function cotizarSeguro(e) {
    e.preventDefault();

    // leer la marca seleccionada
    const marca = document.querySelector('#marca').value;
    // console.log(marca);

    // leer el año seleccionado
    const year = document.querySelector('#year').value;
    // console.log(year);

    // leer el tipo de seguro
    const tipo = document.querySelector('input[name="tipo"]:checked').value;
    console.log(tipo);

    // validar
    if (marca === '' || year === '' || tipo === '') {
        ui.mostrarMensaje('Todos los campos son obligatorios', 'error');
        return;
    }
    ui.mostrarMensaje('Cotizando...', 'valido');
    const seguro = new Seguro(marca, year, tipo);
    const total = seguro.cotizarSeguro();

    ui.resumen(seguro, total);
}