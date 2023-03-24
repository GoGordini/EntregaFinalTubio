//Elementos del DOM

const contenedor_bienvenida = document.getElementById("contenedor_bienvenida");
const contenedor_parrafo = document.getElementById("contenedor_parrafo");
const contenedor_botones = document.getElementById("contenedor_botones");
const formulario = document.getElementById("formulario");
const welcome = document.getElementById("welcome");
const formulario2 = document.getElementById("formulario2");
const titulo = document.getElementById("titulo");
const parrafo = document.createElement("p");
const aceptar = document.createElement("button");
aceptar.innerHTML = "Aceptar";
const cancelar = document.createElement("button");
cancelar.innerHTML = "Cancelar Turno";
const confirmar = document.createElement("button");
confirmar.innerHTML = "Confirmar";
const consultar = document.createElement("button");
consultar.innerHTML = "Consultar Turno";
const finalizar = document.createElement("button");
finalizar.innerHTML = "Finalizar";
const reservar = document.createElement("button");
reservar.innerHTML = "Reservar Turno";
const volver = document.createElement("button");
volver.innerHTML = "Volver";
aceptar.className = "btn btn-outline-secondary";
cancelar.className = "btn btn-outline-secondary";
confirmar.className = "btn btn-outline-secondary";
consultar.className = "btn btn-outline-secondary";
finalizar.className = "btn btn-outline-secondary";
reservar.className = "btn btn-outline-secondary";
volver.className = "btn btn-outline-secondary";
const clases_de_pilates = document.getElementById("clases_de_pilates");
const lista_clases_pilates = "clases.json";

formulario2.remove();

// const botones=document.getElementsByTagName("button"); let array_botones = Array.from(botones); // array_botones.forEach(e => {e.className="rojo"});
// Lo anterior solo cambiaría el formato de los botones que están appendeados. Los que aún no, siguen sin cambiar. Debería hacer un array con todos los botones para que cambie todos.

//Clases para trabajar: Alumno, Turno y Reserva, que vincula las otras dos.
class Alumno {
  constructor(nombre, apellido, email, turnos_reservados) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.email = email;
    this.turnos_reservados = turnos_reservados;
  }
}

class Turno {
  constructor(dia, horario) {
    this.dia = dia;
    this.horario = horario;
  }
}

class Reserva {
  constructor(turno, alumnos) {
    this.turno = turno;
    this.alumnos = alumnos;
  }
}

//Lo que sigue es instanciar para probar el sistema//
const alumno0 = new Alumno("Eleonora", "Tubio", "eletubio@yahoo.es");
const alumno00 = new Alumno("Juan", "Pérez", "juan.perez@gmail.com");
const alumno000 = new Alumno("María", "Gómez", "maria.gomez@gmail.com");
const turno0 = new Turno("lunes 6 de marzo", "8 am");
const turno00 = new Turno("lunes 6 de marzo", "9 am");
const turno000 = new Turno("lunes 6 de marzo", "10 am");

alumno0.turnos_reservados = [turno0];
alumno00.turnos_reservados = [turno00];
alumno000.turnos_reservados = [turno00];

const reserva0 = new Reserva(turno0.dia + " " + turno0.horario, [
  alumno0.nombre + " " + alumno0.apellido,
]);
const reserva00 = new Reserva(turno00.dia + " " + turno00.horario, [
  alumno00.nombre + " " + alumno00.apellido,
  alumno000.nombre + " " + alumno000.apellido,
]);

let array_turnos = [turno0, turno00];
let array_reservas = [reserva0, reserva00];

array_alumnos_estudio = definir_alumnos_estudio();
function log(message) {
  var console = window.console || {};
  console.log = console.log || function () {};
  console.log(message);
}

function definir_alumnos_estudio() {
  //La lista de alumnos la toma del LocalStorage, pero si está vacío crea una ad-hoc.
  if (localStorage.getItem("alumnos estudio")) {
    let array_alumnos_estudio = JSON.parse(
      localStorage.getItem("alumnos estudio")
    );
    return array_alumnos_estudio;
  }
  let array_alumnos_estudio = [alumno0, alumno00, alumno000];
  return array_alumnos_estudio;
}

function actualizar_alumnos_estudio(un_alumno) {
  //Si se da de alta un alumno, lo agrega a la lista.
  array_alumnos_estudio.push(un_alumno);
  return array_alumnos_estudio;
}

function actualizar_turno(un_turno) {
  //Cuando se hace una reserva, si ese turno no tenía alumnos hay que generar la instancia de la reserva y agregar el turno a la lista de turnos. Si el turno ya tenía alumnos, no se hace nada.
  if (
    !array_reservas.some(
      (elemento) => elemento.turno == un_turno.dia + " " + un_turno.horario
    )
  ) {
    array_turnos.push(un_turno);
    actualizar_reserva(un_turno);
  }
  return array_turnos;
}

function actualizar_reserva(un_turno) {
  //Funciona llamado por la función anterior, solo cuando en ese turno no hay alumnos: crea la instancia de la reserva y la agrega al array de reservas.
  const reserva = new Reserva(un_turno.dia + " " + un_turno.horario, []);
  array_reservas.push(reserva);
  return array_reservas;
}

function alta_alumno() {
  //Si el alumno es nuevo, lo agrega a la lista de alumnos del estudio y crea la instancia del alumno. Si ya existe, lo recupera.
  if (
    array_alumnos_estudio.some(
      (alumno) => alumno.email == localStorage.getItem("email")
    )
  ) {
    let alumno = array_alumnos_estudio.find(
      (alumno) => alumno.email == localStorage.getItem("email")
    );
    return alumno;
  } else {
    const alumno1 = new Alumno(
      localStorage.getItem("nombre"),
      localStorage.getItem("apellido"),
      localStorage.getItem("email"),
      []
    );
    actualizar_alumnos_estudio(alumno1);
    return alumno1;
  }
}

function consulta_turnos_alumno(alumno) {
  //Devuelve los turnos reservados por el alumno.
  return alumno.turnos_reservados;
}

function alumnos_en_el_turno(dia, horario) {
  //Consulta los alumnos en un turno.
  let el_turno = dia + " " + horario;
  return (
    array_reservas.find((elemento) => elemento.turno == el_turno)?.alumnos ||
    "no hay alumnos en el turno!"
  );
}

function acepta(aceptado) {
  //DOM cuando se aprieta aceptar.
  contenedor_parrafo.appendChild(parrafo);
  // if (aceptado){
  //     contenedor_parrafo.appendChild(aceptar)}
  // else{
  //     contenedor_parrafo.appendChild(volver)
  // }
  aceptado
    ? contenedor_botones.appendChild(aceptar)
    : contenedor_botones.appendChild(volver);
  aceptar.addEventListener("click", crear_botones);
  volver.addEventListener("click", crear_botones);
}

function crear_botones() {
  //Crea botones en el DOM.
  remover();
  contenedor_botones.appendChild(reservar);
  contenedor_botones.appendChild(consultar);
  contenedor_botones.appendChild(cancelar);
  contenedor_botones.appendChild(finalizar);
}

function remover() {
  //Elimina objetos del DOM.
  aceptar.remove();
  cancelar.remove();
  confirmar.remove();
  consultar.remove();
  parrafo.remove();
  finalizar.remove();
  formulario2.remove();
  reservar.remove();
  volver.remove();
}

function sin_turnos() {
  Swal.fire({
    title: "¡Ud. no tiene turnos reservados!",
    showConfirmButton: false,
    showCancelButton: false,
    cancelButtonText: "ACEPTAR",
    background: "transparent",
    backdrop: "linear-gradient(135deg, #08010a,#1e0125)",
    timer: 2500,
  });
  crear_botones();
}
function salir() {
  remover();
  formulario.reset();
  //titulo.innerText = "¡Gracias por usar nuestro sistema de gestión de turnos!";
  Swal.fire({
    title: "¡Gracias por usar nuestro sistema de gestión de turnos!",
    showConfirmButton: false,
    showCancelButton: false,
    cancelButtonText: "ACEPTAR",
    background: "transparent",
    backdrop: "linear-gradient(135deg, #08010a,#1e0125)",
    timer: 3000,
    //        buttonsStyling:false,
  });
  setTimeout(() => {
    contenedor_bienvenida.appendChild(titulo);
    contenedor_bienvenida.appendChild(welcome);
    contenedor_bienvenida.appendChild(formulario);
  }, 2200);

  //Lo que sigue prueba funciones de consulta.
  console.log("Turnos de la semana:");
  console.log(array_turnos);

  console.log("Alumnos del Estudio:");
  console.log(array_alumnos_estudio);

  array_alumnos_estudio.forEach((alumno) =>
    console.log(
      "Los turnos reservados por",
      alumno.nombre,
      alumno.apellido,
      "son:",
      consulta_turnos_alumno(alumno)
    )
  );
  array_turnos.forEach((elemento) =>
    console.log(
      "Alumnos en el turno del",
      elemento.dia,
      "a las",
      elemento.horario,
      ":",
      alumnos_en_el_turno(elemento.dia, elemento.horario)
    )
  );
  localStorage.setItem(
    "alumnos estudio",
    JSON.stringify(array_alumnos_estudio)
  );
  clases_de_pilates.classList.toggle("oculto");
}
function mostrar_clases() {
  fetch(lista_clases_pilates)
    .then((respuesta) => respuesta.json())
    .then((datos) => {
      // datos.forEach(clase_pilates => {
      //     clases_de_pilates.innerHTML += `
      //     <h2>Horario: ${clase_pilates.horario} </h2>
      //     <p>Nivel: ${clase_pilates.nivel} </p>
      //     <p>Descripción: ${clase_pilates.descripción} </p>`
      // })
      // <img src = "${producto.img}" class = "card-img-tom imgProductos">

      datos.forEach((clase_pilates) => {
        const card = document.createElement("div");
        card.classList.add("col");
        card.innerHTML = `
                        <div class = "card" >
                        <img src = "${clase_pilates.imagen}" class = "card-img-tom img_clases">

                        <div class = "card-body" >
                                <h3> ${clase_pilates.horario} </h3>
                                <p> ${clase_pilates.nivel} </p>

                            </div>

                        </div>`;

        clases_de_pilates.appendChild(card);
      });
    })
    .catch((error) => console.log(error))
    .finally(() => console.log("Proceso finalizado correctamente!"));
}

// function vuelvo(){
//     contenedor.appendChild(parrafo);
//     contenedor.appendChild(volver);
//     volver.addEventListener("click", crear_botones);
// }

function cancelo() {
  let alumno_molesto = array_alumnos_estudio.find(
    (alumno) => alumno.email == localStorage.getItem("email")
  );
  let dia = alumno_molesto.turnos_reservados[0].dia;
  let horario = alumno_molesto.turnos_reservados[0].horario;
  if (!localStorage.getItem("fecha turno")) {
    localStorage.setItem("fecha turno", dia);
    localStorage.setItem("horario turno", horario);
  }
  alumno_molesto.turnos_reservados.pop();
  let fecha_a_cancelar = localStorage.getItem("fecha turno");
  let horario_a_cancelar = localStorage.getItem("horario turno");
  let turno_a_cancelar = array_reservas.find(
    (reserva) => reserva.turno == fecha_a_cancelar + " " + horario_a_cancelar
  );
  turno_a_cancelar.alumnos.pop();
  remover();
  Swal.fire({
    title: "¡Su turno ha sido cancelado!",
    showConfirmButton: false,
    showCancelButton: false,
    cancelButtonText: "ACEPTAR",
    background: "transparent",
    backdrop: "linear-gradient(135deg, #08010a,#1e0125)",
    timer: 2500,
  });
  //    parrafo.innerText = "Su turno ha sido cancelado.";
  localStorage.removeItem("fecha turno");
  localStorage.removeItem("horario turno");
  localStorage.removeItem("turnos");
  //    acepta()
  // setTimeout( () => {
  // console.log("Tarea A");
  // }, 3000);
  crear_botones();
}

mostrar_clases();
clases_de_pilates.classList.toggle("oculto");
formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  const nombre = document.getElementById("nombre").value;
  const apellido = document.getElementById("apellido").value;
  const email = document.getElementById("email").value;
  if (localStorage.getItem("email") != email) {
    localStorage.removeItem("fecha turno");
    localStorage.removeItem("horario turno");
    localStorage.removeItem("turnos");
  }
  localStorage.setItem("nombre", nombre);
  localStorage.setItem("apellido", apellido);
  localStorage.setItem("email", email);
  let alumno1 = alta_alumno();
  alumno1.turnos_reservados.length != 0 &&
    localStorage.setItem("turnos", JSON.stringify(alumno1.turnos_reservados));
  formulario.remove();
  welcome.remove();
  crear_botones();
  clases_de_pilates.classList.toggle("oculto");
});

reservar.addEventListener("click", () => {
  remover();
  if (localStorage.getItem("turnos")) {
    // parrafo.innerText = `${localStorage.getItem("nombre")}, Ud. ya tiene un turno reservado!`;
    Swal.fire({
      title: "¡Ud. ya tiene un turno reservado!",
      showConfirmButton: false,
      showCancelButton: false,
      cancelButtonText: "ACEPTAR",
      background: "transparent",
      backdrop: "linear-gradient(135deg, #08010a,#1e0125)",
      timer: 2500,
    });
    crear_botones();
    //  vuelvo();
    // contenedor.appendChild(consultar);
  } else {
    parrafo.innerText = `Por favor, complete los datos del turno que desea reservar.`;
    contenedor_parrafo.appendChild(parrafo);
    contenedor_parrafo.appendChild(formulario2);
    contenedor_parrafo.appendChild(volver);
    volver.addEventListener("click", crear_botones);
  }
});

formulario2.addEventListener("submit", (e) => {
  e.preventDefault();
  const dia = document.getElementById("fecha_turno").value;
  const horario = document.getElementById("horario_turno").value;
  const turno1 = new Turno(dia, horario);
  let alumno1 = alta_alumno();
  actualizar_turno(turno1);
  alumno1.turnos_reservados.push(turno1);
  let la_reserva = array_reservas.find(
    (elemento) => elemento.turno == turno1.dia + " " + turno1.horario
  );
  la_reserva.alumnos.push(alumno1);
  remover();
  //parrafo.innerText = `${localStorage.getItem("nombre")}, su turno ha sido reservado para el ${dia} a las ${horario}!`;
  Swal.fire({
    title: "¡Su turno ha sido reservado con éxito!",
    showConfirmButton: false,
    showCancelButton: false,
    cancelButtonText: "ACEPTAR",
    background: "transparent",
    backdrop: "linear-gradient(135deg, #08010a,#1e0125)",
    timer: 3000,
  });
  localStorage.setItem("fecha turno", dia);
  localStorage.setItem("horario turno", horario);
  let turnos_reservados_JSON = JSON.stringify(alumno1.turnos_reservados);
  localStorage.setItem("turnos", turnos_reservados_JSON);
  //acepta()
  crear_botones();
});

consultar.addEventListener("click", () => {
  //remover();
  if (!localStorage.getItem("turnos")) {
    //parrafo.innerText = `${localStorage.getItem("nombre")}, Ud. aún no tiene turnos reservados!`;
    // Swal.fire(
    //     {  title: "¡Ud. aún no tiene turnos reservados!",
    //     showConfirmButton: false,
    //     showCancelButton: false,
    //     cancelButtonText: "ACEPTAR",
    //     background: "transparent",
    //     backdrop: "linear-gradient(135deg, #08010a,#1e0125)",
    //     timer: 2500,
    //     })
    sin_turnos();
  }
  //      crear_botones()}
  else {
    let alumno1 = alta_alumno();
    turnos_alumno1 = consulta_turnos_alumno(alumno1);
    Swal.fire({
      title: `${localStorage.getItem(
        "nombre"
      )}, Ud. tiene un turno reservado para el ${turnos_alumno1[0].dia} a las ${
        turnos_alumno1[0].horario
      }.`,
      showConfirmButton: false,
      showCancelButton: false,
      cancelButtonText: "ACEPTAR",
      background: "transparent",
      backdrop: "linear-gradient(135deg, #08010a,#1e0125)",
      timer: 3000,
    });
  }
});

cancelar.addEventListener("click", () => {
  remover();
  if (!localStorage.getItem("turnos")) {
    // Swal.fire(
    //     {  title: "¡Ud. aún no tiene turnos reservados!",
    //     showConfirmButton: false,
    //     showCancelButton: false,
    //     cancelButtonText: "ACEPTAR",
    //     background: "transparent",
    //     backdrop: "linear-gradient(135deg, #08010a,#1e0125)",
    //     timer: 2500,
    //     })
    sin_turnos();
  }
  //        crear_botones()}
  else {
    let alumno1 = alta_alumno();
    let turnos_alumno1 = consulta_turnos_alumno(alumno1);
    //console.log(...turnos_alumno1)
    Swal.fire({
      title: `${localStorage.getItem(
        "nombre"
      )}, Ud. cancelará el turno reservado para el ${
        turnos_alumno1[0].dia
      } a las ${turnos_alumno1[0].horario}.`,
      showConfirmButton: true,
      showCancelButton: true,
      cancelButtonText: "VOLVER",
      confirmButtonText: "CANCELAR TURNO",
      background: "transparent",
      backdrop: "linear-gradient(135deg, #08010a,#1e0125)",
      customClass: {
        confirmButton: "btn btn-outline-secondary",
        cancelButton: "btn btn-outline-secondary",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        cancelo();
      } else if (result.isDismissed) {
        crear_botones();
      }
    });
    // parrafo.innerText = `${localStorage.getItem(
    //   "nombre"
    // )}, Ud. cancelará el turno reservado para el ${
    //   turnos_alumno1[0].dia
    // } a las ${turnos_alumno1[0].horario}.`;
    // acepta(false);
    // contenedor_parrafo.appendChild(confirmar);
    //  confirmar.addEventListener("click", cancelo);
  }
});

finalizar.addEventListener("click", () => {
  remover();
  salir();
});
