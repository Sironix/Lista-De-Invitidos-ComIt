function openTab(evt, tabName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}






var Lista_Invitados = []
var Lista_Array = []

function CrearUsuario(Nombre="", Apellido="", Dni="", Celular="", Entradas="",Html=0) {
  if (Nombre=="")    {Nombre = $("#CrearNombre").val()}
  if (Apellido=="")  {Apellido = $("#CrearApellido").val();}
  if (Dni=="")       {Dni = $("#CrearDni").val();}
  if (Entradas=="")  {Entradas = $("#CrearEntradas").val();}
  if (Celular=="")   {Celular = $("#CrearCelular").val();}

  if(Dni=="00.111.222"){Dni="Faltante"}
  else if(typeof Dni=="number"){ Dni = Dni.toString();}
  if(Celular=="2323-123123"){Celular="Faltante"}
  else if(typeof Celular=="number"){Celular = Celular.toString();}
  console.log(Celular,typeof Celular)
  Nombre = Nombre.replace(/\s/g, '')
  Apellido = Apellido.replace(/\s/g, '')
  Dni = Dni.replace(/\s/g, '')
  Celular = Celular.replace(/\s/g, '')

  if (Nombre != "" && Apellido != "") {
    
    let Usuario = `${Nombre}_${Apellido}`;
    if (Lista_Invitados[Usuario] == undefined) {
      Lista_Invitados[Usuario] = {
        Nombre: Nombre,
        Apellido: Apellido,
        Dni: Dni,
        Entradas: Entradas,
        Celular: Celular,
      };

      console.log(Lista_Invitados[Usuario])
      console.log(Nombre,Apellido,Dni,Entradas,Celular)
      
    if(Html==1){CrearLista()}
    } else {
      console.log('Esta persona ya esta en el systema.')
    }
  }
  else{console.log("Usuario Erroneo")
  }
};

function BotonOrden() {
  if ($("#Orden").html()=="A&gt;Z"){$("#Orden").html("Z>A")}
  else if ($("#Orden").html()=="Z&gt;A"){$("#Orden").html("A>Z")}
  VaciarCabezeras()
  CrearCabezeras()
  CrearLista()
  console.log($("#Orden").html())

}

function VaciarCabezeras() {
  $('#Lista>div').remove()
}

function CrearCabezeras() {
 if ($("#Orden").html()=="A&gt;Z"){tipo=0}
 else {tipo=1}
 let orden = [[],[]];
  orden[0] = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
  orden[1] = ["Z", "X", "Y", "W", "V", "U", "T", "S", "R", "Q", "P", "O", "N", "M", "L", "K", "J", "I", "H", "G", "F", "E", "D", "C", "B", "A"]
  for (let i = 0; i < orden[tipo].length; i++) {
    $('#Lista').append(`
    <div class="gradient2" id="${orden[tipo][i]}">
     <dt class="border_black gradient1" style="z-index: 1" >${orden[tipo][i]}</dt>
    </div>
    `)

    console.log(orden[tipo][i])
  }
}


function CrearLista() {
  $("#Lista>div>dd").remove(); // Vacia la lista anterior.(en el html)
  Lista_Array = Object.entries(Lista_Invitados) //copia la lista(que es un objeto) y la transforma a Array
  Lista_Array.sort() //ordena el Array por nombre
  for (let i = 0; i < Lista_Array.length; i++) {
    //Lista_Array[i][0][0] es la primer letra del usuario.
    $('#' + Lista_Array[i][0][0]).append(`
      <dd>
        <div class="border_white" style="width:auto;height:130px;padding: 0px;position: relative;">
          <span id="Nombre" style="position: absolute;left: 10px;"> ${Lista_Array[i][1].Nombre} ${Lista_Array[i][1].Apellido}</span>
          <span style="position: absolute;left: 10px; top:40px;">Dni: </span>
          <span id="Dni" style="position: absolute;left: 60px; top:40px;"> ${Lista_Array[i][1].Dni}</span>
          <span style="position: absolute;left: 200px; top:40px;"> Cel: </span>
          <span id="Cel" style="position: absolute;left: 250px; top:40px;"> ${Lista_Array[i][1].Celular}</span>
          <span style="position: absolute;left:10px; top:80px;">Entradas: </span>
          <span id="Entradas" style="position: absolute;left: 120px; top:80px;"> ${Lista_Array[i][1].Entradas}</span>
        </div>
      </dd>
    `);
    console.log(Lista_Array[i][0])
  }
}

function VaciarLista() {
  $("#Lista>div>dd").remove();
}

function ImportarLista() {
  let Lista_Importada = [
    ["Milton", "Almada", 4909890, 654321, 3],
    ["Lautaro", "Maio", 1234151, 62121, 2],
    ["Martin", "Comparetto",090909,"",0],
  ]
  for (let i = 0; i < Lista_Importada.length; i++) {
    if (Lista_Importada[i][0] != undefined && Lista_Importada[i][1] != undefined) {
      let nombre = Lista_Importada[i][0];
      let apellido = Lista_Importada[i][1];
      let dni = Lista_Importada[i][2] || "Faltante";
      let cel = Lista_Importada[i][3] || "Faltante";
      let entradas = Lista_Importada[i][4] || 0;
      CrearUsuario(nombre, apellido, dni, cel, entradas)

      Lista_Array = Object.entries(Lista_Invitados)
    }
  }
  CrearLista()
}

function ExportarLista() {
  Lista_Array = Object.entries(Lista_Invitados)
  Lista_Array.sort()
  let Lista_Exportada = "[ \n"
  for (let i = 0; i < Lista_Array.length; i++) {
    Lista_Exportada += `[${Lista_Array[i][1]["Nombre"]}, ${Lista_Array[i][1]["Apellido"]}, ${Lista_Array[i][1]["Dni"]}, ${Lista_Array[i][1]["Celular"]}, ${Lista_Array[i][1]["Entradas_Pagadas"]}]`;
    Lista_Exportada += ",\n"
  }

  Lista_Exportada += "]"
  console.log(Lista_Exportada)
}

function EliminarUsuario(Usuario) {
  delete(Lista_Invitados[Usuario]);
  CrearLista()
}




//?-----------------------------------------------------------//
//?------//           Menu Eliminar             //------------//
//?-----------------------------------------------------------//

function EliminarVaciarLista() {
  $("#UsuarioEliminar>option").remove()
}

function EliminarCrearLista() {
  for (let i = 0; i < Lista_Array.length; i++){
    $("#UsuarioEliminar").append(`<option value= ${Lista_Array[i][0]} > ${Lista_Array[i][1].Nombre} ${Lista_Array[i][1].Apellido} </option>`)
  }
}

function EliminarActualizarLista(){
EliminarVaciarLista()
EliminarCrearLista()
EliminarActualizarDatos()
}

function EliminarActualizarDatos(){
  let seleccion = $("#UsuarioEliminar").val()
  
  $("#EliminarNombre").val(Lista_Invitados[seleccion].Nombre)
  $("#EliminarApellido").val(Lista_Invitados[seleccion].Apellido)
  $("#EliminarDni").val(Lista_Invitados[seleccion].Dni)
  $("#EliminarCelular").val(Lista_Invitados[seleccion].Celular)
  $("#EliminarEntradas").val(Lista_Invitados[seleccion].Entradas)
}

function EliminarBotonBorrar(){
  let seleccion = $("#UsuarioEliminar").val()
  EliminarUsuario(seleccion)
  EliminarActualizarLista()
}

//!-----------------------------------------------------------//
//!------//         Menu Actualizar             //------------//
//!-----------------------------------------------------------//

function ActualizarVaciarLista() {
  $("#UsuarioActualizar>option").remove()
}

function ActualizarCrearLista() {
  for (let i = 0; i < Lista_Array.length; i++){
    $("#UsuarioActualizar").append(`<option value= ${Lista_Array[i][0]} > ${Lista_Array[i][1].Nombre} ${Lista_Array[i][1].Apellido} </option>`)
  }
}

function ActualizarActualizarLista(){
  ActualizarVaciarLista()
  ActualizarCrearLista()
  ActualizarActualizarDatos()
}

function ActualizarActualizarDatos(){
  let usuario = $("#UsuarioActualizar").val()
  let seleccion = $("#ActualizarDatoSeleccion").val()
  $("#ActualizarDatoOriginal").val(Lista_Invitados[usuario][seleccion])
  $("#ActualizarDatoNuevo").val("")

}

function ActualizarBoton(){
  let usuario = $("#UsuarioActualizar").val()
  let seleccion = $("#ActualizarDatoSeleccion").val()
  console.log(Lista_Invitados[usuario][seleccion],$("#ActualizarDatoNuevo").val())
  Lista_Invitados[usuario][seleccion] = $("#ActualizarDatoNuevo").val()
  ActualizarActualizarLista()

}






//*-----------------------------------------------------------//
//?------//                Final                //------------//
//!-----------------------------------------------------------//


$(document).ready(function () {
  //*Nombre="", Apellido="", Dni="", Celular="", Entradas="",Html=0
  CrearUsuario("Aquiles", "Llorente", )
  CrearUsuario("Lorenzo", "Almada", 41000111,2323069069,4 )
  CrearUsuario("Javier", "Castro", 42,987654,1)
  CrearUsuario("Juan", "Finlandia","",2)
  CrearUsuario("Zombie","Almada",3123,414202,0)
  CrearUsuario("Aquiles","Bailo")
  CrearUsuario("Estrban","Quito")
  CrearUsuario("Osmundo","Rodrígez")
  CrearUsuario("Netanel","Mora")
  CrearUsuario("Fiacre","Casgrain")
  CrearUsuario("Aldana","Duhlo")
  //CrearUsuario("","")

  
  CrearCabezeras()
  CrearLista()
  
  EliminarActualizarLista()
  ActualizarActualizarLista()
});