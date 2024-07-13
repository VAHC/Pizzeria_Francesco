const contactForm=document.getElementById("formulario_de_contacto");
const inputNombre=document.getElementById("nombre");
const inputApellido=document.getElementById("apellido");
const inputEmail=document.getElementById("email");
const inputEdad=document.getElementById("edad");
const inputCelular=document.getElementById("celular");
const inputMotivoConsulta=document.getElementById("motivo_consulta");
const inputMensaje=document.getElementById("mensaje");
const parrafo=document.getElementById("error");


contactForm.addEventListener("submit",e=>{
e.preventDefault();
let warning="";
let valor=false;
parrafo.innerHTML="";
let emailRegex=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
let ageRegex=/^(?:1[01][0-9]|120|[1-9]?[0-9])$/;
let celularRegex=/^\+?(\d{1,3})?[-.\s]?(\d{1,4})?[-.\s]?(\d{1,4})[-.\s]?(\d{1,9})$/;


if(inputNombre.value.length<3){
   warning+=`El Nombre ingresado es demasiado corto! <br> <br>`
   valor=true;
}

if(inputApellido.value.length<3){
    warning+=`El Apellido ingresado es demasiado corto! <br> <br>`
    valor=true;
 }

if(!emailRegex.test(inputEmail.value)){
    warning+=`El Email ingresado no es válido! <br> <br>`
    valor=true;
}

if(!ageRegex.test(inputEdad.value)){
    warning+=`La Edad ingresada no es válida! <br> <br>`
    valor=true;
}

if(!celularRegex.test(inputCelular.value)){
    warning+=`El número de Celular ingresado no es válido! <br> <br>`
    valor=true;
 }

if(inputMotivoConsulta.value =="default"){
    warning+=`Por favor, ingrese el motivo de la consulta! <br> <br>`
    valor=true;
}

if (inputMensaje.value === "" ){
    warning+= `Por favor, escriba un mensaje! <br> <br>`
    valor=true;
  }


if(valor){
    parrafo.innerHTML=warning;
}else{
    parrafo.innerHTML="Formulario enviado con éxito!!!";
    contactForm.reset();
}

} ) 