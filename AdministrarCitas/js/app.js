//campos del formulario
const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');

//UI
const formulario = document.querySelector('#nueva-cita');
const contenedorCitas = document.querySelector('#citas');


let editando;
//

class Citas{
    constructor(){
        this.citas = [];
    }

    agregarCita(cita){
        this.citas = [...this.citas, cita];

        console.log(this.citas);
    }

    eliminarCita(id){
        this.citas= this.citas.filter( cita => cita.id !== id);
    }

    editarCita(citaAct){
        this.citas = this.citas.map( cita => cita.id === citaAct.id ? citaAct : citaAct)
    }
}

class UI{
    imprimirAlerta(mensaje, tipo){
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12');

        if(tipo === 'error'){
            divMensaje.classList.add('alert-danger');
        }else{
            divMensaje.classList.add('alert-success');
        }

        //Mensaje de error
        divMensaje.textContent = mensaje;

        //Agregar al DOM
        document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'));
   
        //Quitar la alerta despues de 5 seg
        setTimeout( () =>{
            divMensaje.remove();
        }, 5000);
   
    }

    imprimirCitas({citas}){

        this.limpiarHTML();
  
        citas.forEach( cita => {
            const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;

            const divCita = document.createElement('div');
            divCita.classList.add('cita', 'p-3');
            divCita.dataset.id= id;

            //Scripting de los elementos de la cita
            const mascotaParrafo = document.createElement('h2');
            mascotaParrafo.classList.add('card-title', 'font-weight-bolder');
            mascotaParrafo.textContent = mascota;

            const propietarioParrafo = document.createElement('p');
            propietarioParrafo.innerHTML = `
            <span class="font-weight-bolder"> propietario: </span>
            ${propietario}
            `;

            const telefonoParrafo = document.createElement('p');
            telefonoParrafo.innerHTML = `
            <span class="font-weight-bolder"> Telefono: </span>
            ${telefono}
            `;

            const fechaParrafo = document.createElement('p');
            fechaParrafo.innerHTML = `
            <span class="font-weight-bolder"> fecha: </span>
            ${fecha}
            `;

            const horaParrafo = document.createElement('p');
            horaParrafo.innerHTML = `
            <span class="font-weight-bolder"> hora: </span>
            ${hora}
            `;

            const sintomasParrafo = document.createElement('p');
            sintomasParrafo.innerHTML = `
            <span class="font-weight-bolder"> sintomas: </span>
            ${sintomas}
            `;


            //Boton para eliminar esta cita
            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
            btnEliminar.innerHTML = 'Eliminar <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>';

            btnEliminar.onclick = () => eliminarCita(id);

            //Boton para editar
            const btnEditar = document.createElement('button');
            btnEditar.classList.add('btn', 'btn-info');
            btnEditar.innerHTML = 'Editar <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>';
            btnEditar.onclick = () => cargarEdicion(cita);
            
        
            //Agregar parrafos al div cita
            divCita.appendChild(mascotaParrafo);
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintomasParrafo);
            divCita.appendChild(btnEliminar);
            divCita.appendChild(btnEditar);



            //Agregar las citas al html
            contenedorCitas.appendChild(divCita);
        })
        console.log(citas);
    }

    limpiarHTML(){
        while(contenedorCitas.firstChild){
            contenedorCitas.removeChild(contenedorCitas.firstChild);
        }
    }
    
}

const ui= new UI();
const administrarCitas = new Citas();

eventListeners();
function eventListeners(){
    mascotaInput.addEventListener('input', datosCita);
    propietarioInput.addEventListener('input', datosCita);
    telefonoInput.addEventListener('input', datosCita);
    fechaInput.addEventListener('input', datosCita);
    horaInput.addEventListener('input', datosCita);
    sintomasInput.addEventListener('input', datosCita);

    formulario.addEventListener('submit', nuevaCita);
}

//Definir name con las mismas propiedades del objeto
const citaObj = {
    mascota :'',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
}

 function datosCita(e){
    citaObj[e.target.name] = e.target.value;

    //console.log(citaObj);
 }


 //Valida y agrega nueva cita a la clase de citas
 function nuevaCita(e){
    e.preventDefault();

    //extraer la informacion del objeto de cita
    const {mascota, propietario, telefono, fecha, hora, sintomas} = citaObj;

    //validar
    if(mascota === '' || propietario === '' || telefono ==='' || fecha === '' || hora ==='' || sintomas === ''){
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error');
        
        return;
    } 

    if(editando){
        console.log('modo edicion');
        ui.imprimirAlerta('Editado correctamente');

        //pasar el objeto de la cita a edicion
        administrarCitas.editarCita({...citaObj});
        
        //Regresar el texto del boton a su estado original
        formulario.querySelector('button[type="submit"]').textContent = 'Guardar cambios';
        
        //quitar modo edicion
        editando = false;
    }else{
           //generar id unico
    citaObj.id = Date.now();

    //Creando cita
    administrarCitas.agregarCita({...citaObj});

    //Mensaje de agregado correctamente

    ui.imprimirAlerta('se agrego correctamente');
    }
 


    //reiniciar el objeto para la validacion
    reiniciarObjeto();

    formulario.reset();

    //Mostrar el HTML de las citas
    ui.imprimirCitas(administrarCitas);
 }

 function reiniciarObjeto(){
     citaObj.mascota = '';
     citaObj.propietario = '',
     citaObj.telefono = '';
     citaObj.fecha = '';
     citaObj.hora = '';
     citaObj.sintomas = '';
 }

 function eliminarCita(id){
    console.log('eliminando');
    //eliminar cita
    administrarCitas.eliminarCita(id);

    //muestra mensaje
    ui.imprimirAlerta('La cita se elimino correctamente');

    //
    ui.imprimirCitas(administrarCitas);
 }

//Cargar datos y modo edicion

function cargarEdicion(cita){
    const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;

    //llenar los inputs
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value =telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;
    

    //llenar el objeto
    citaObj.mascota= mascota;
    citaObj.propietario= propietario;
    citaObj.telefono= telefono;
    citaObj.fecha= fecha;
    citaObj.hora= hora;
    citaObj.sintomas= sintomas;
    citaObj.id= id;

    //cambiar el texto del boton
    formulario.querySelector('button[type="submit"]').textContent = 'Guardar cambios';

    editando = true;
}
 