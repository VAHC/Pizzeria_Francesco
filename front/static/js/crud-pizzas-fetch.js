const BASEURL = 'http://127.0.0.1:5000';

// const BASEURL='https://com24187.pythonanywhere.com/'


/**
 * Función para realizar una petición fetch con JSON.
 * @param {string} url - La URL a la que se realizará la petición.
 * @param {string} method - El método HTTP a usar (GET, POST, PUT, DELETE, etc.).
 * @param {Object} [data=null] - Los datos a enviar en el cuerpo de la petición.
 * @returns {Promise<Object>} - Una promesa que resuelve con la respuesta en formato JSON.
 */
async function fetchData(url, method, data = null) {
  const options = {
      method: method,
      headers: {
          'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : null,  // Si hay datos, los convierte a JSON y los incluye en el cuerpo
  };
  try {
    const response = await fetch(url, options);  // Realiza la petición fetch
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return await response.json();  // Devuelve la respuesta en formato JSON
  } catch (error) {
    console.error('Fetch error:', error);
    alert('An error occurred while fetching data. Please try again.');
  }
}

/**
 * Función para comunicarse con el servidor para poder Crear o Actualizar
 * un registro de pelicula
 * @returns 
 */
async function savePizza(){
  const idPizza = document.querySelector('#id-pizza').value;
  const variedad = document.querySelector('#variedad').value;
  const ingredientes = document.querySelector('#ingredientes').value;
  const tamanio = document.querySelector('#tamanio').value;
  const precio_salon = document.querySelector('#precio_salon').value;
  const precio_delivery = document.querySelector('#precio_delivery').value;

  //VALIDACION DE FORMULARIO
  if (!variedad || !ingredientes || !tamanio|| !precio_salon || !precio_delivery) {
    Swal.fire({
        title: 'Error!',
        text: 'Por favor completa todos los campos.',
        icon: 'error',
        confirmButtonText: 'Cerrar'
    });
    return;
  }
  // Crea un objeto con los datos de la película
  const pizzaData = {
      variedad: variedad,
      ingredientes: ingredientes,
      tamanio: tamanio,
      precio_salon: precio_salon,
      precio_delivery: precio_delivery,
  };

    
  let result = null;
  // Si hay un idPizza, realiza una petición PUT para actualizar la pizza existente
  if(idPizza!==""){
    result = await fetchData(`${BASEURL}/api/pizzas/${idPizza}`, 'PUT', pizzaData);
  }else{
    // Si no hay idPizza, realiza una petición POST para crear una nueva pizza
    result = await fetchData(`${BASEURL}/api/pizzas/`, 'POST', pizzaData);
  }
  
  const formPizza = document.querySelector('#form-pizza');
  formPizza.reset();
  Swal.fire({
    title: 'Exito!',
    text: result.message,
    icon: 'success',
    confirmButtonText: 'Cerrar'
  })
  showPizzas();
}


/**
 * Funcion que permite crear un elemento <tr> para la tabla de pizzas
 * por medio del uso de template string de JS.
 */
async function showPizzas(){
  let pizzas =  await fetchData(BASEURL+'/api/pizzas/', 'GET');
  const tablePizzas = document.querySelector('#list-table-pizzas tbody');
  tablePizzas.innerHTML='';
  pizzas.forEach((pizza) => {
    let tr = `<tr>
                  <td>${pizza.variedad}</td>
                  <td>${pizza.ingredientes}</td>
                  <td>${pizza.tamanio}</td>
                  <td>${pizza.precio_salon}</td>
                  <td>${pizza.precio_delivery}</td>
                  <td>
                      <button class="enviar" id="editar" onclick='updatePizza(${pizza.id_pizza})'><i class="fa fa-pencil" > Editar</button></i>
                      <button class="enviar" id="borrar" onclick='deletePizza(${pizza.id_pizza})'><i class="fa fa-trash" > Eliminar</button></i>
                  </td>
                </tr>`;
    tablePizzas.insertAdjacentHTML("beforeend",tr);
  });
}
  
/**
 * Function que permite eliminar una pelicula del array del localstorage
 * de acuedo al indice del mismo
 * @param {number} id posición del array que se va a eliminar
 */
function deletePizza(id){
  Swal.fire({
      title: "Esta seguro de eliminar la pizza?",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
  }).then(async (result) => {
      if (result.isConfirmed) {
        let response = await fetchData(`${BASEURL}/api/pizzas/${id}`, 'DELETE');
        showPizzas();
        Swal.fire(response.message, "", "success");
      }
  });
  
}


/**
 * Function que permite cargar el formulario con los datos de la pizza 
 * para su edición
 * @param {number} id Id de la pizza que se quiere editar
 */
async function updatePizza(id){
  //Buscamos en el servidor la pizza de acuerdo al id
  let response = await fetchData(`${BASEURL}/api/pizzas/${id}`, 'GET');
  const idPizza = document.querySelector('#id-pizza');
  const variedad = document.querySelector('#variedad');
  const ingredientes = document.querySelector('#ingredientes');
  const tamanio = document.querySelector('#tamanio');
  const precio_salon = document.querySelector('#precio_salon');
  const precio_delivery = document.querySelector('#precio_delivery');
  
  idPizza.value = response.id_pizza;
  variedad.value = response.variedad;
  ingredientes.value = response.ingredientes;
  tamanio.value = response.tamanio;
  precio_salon.value = response.precio_salon;
  precio_delivery.value = response.precio_delivery;

}
  
// Escuchar el evento 'DOMContentLoaded' que se dispara cuando el 
// contenido del DOM ha sido completamente cargado y parseado.
document.addEventListener('DOMContentLoaded',function(){
  const btnSaveMovie = document.querySelector('#btn-save-pizza');
  //ASOCIAR UNA FUNCION AL EVENTO CLICK DEL BOTON
  btnSaveMovie.addEventListener('click',savePizza);
  showPizzas();
});
