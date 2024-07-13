class Usuario{

    constructor(id,nombre,apellido,correo,telefono){
        this.id=id;
        this.nombre=nombre;
        this.apellido=apellido;
        this.correo=correo;
        this.telefono=telefono;
    }

}

// const movie1 = new Movie(1,'Damsel','Un director',4.5,'2024-03-01','https://image.tmdb.org/t/p/w500//sMp34cNKjIb18UBOCoAv4DpCxwY.jpg');

// const movie2 = new Movie(2,'Dune 2','Un director 2',5,'2024-04-01','https://image.tmdb.org/t/p/w500//8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg');

// const movie3 = new Movie(3,'Kunfu panda 4','Un director 2',5,'2024-04-01','https://image.tmdb.org/t/p/w500//kDp1vUBnMpe8ak4rjgl3cLELqjU.jpg');

// let movies = [movie1,movie2,movie3];

// localStorage.setItem('movies',JSON.stringify(movies));

// console.log(movies);

function showPizzas(){
    
    //BUSCAR LO QUE HAY EN LOCAL STORAGE
    let movies = JSON.parse(localStorage.getItem('pizzas')) || [];

    //buscar elemento HTML donde quiero insertar las pizzas
    const tbodyMovies = document.querySelector('#list-table-pizzas tbody');
    // const tbodyMovies = document.getElementById('#tbody-table-movies');
    //limpio el contenido de la tabla
    tbodyMovies.innerHTML = '';
    pizzas.forEach(pizza => {
        //TEMPLATE STRING - TEMPLATE LITERAL 
        const tr = `
                    <tr>
                        <td>${pizza.variedad}</td>
                        <td>${pizza.ingredientes}</td>
                        <td>${pizza.tamanio}</td>
                        <td>${pizza.precio_salon}</td>
                        <td>${pizza.precio_delivery}</td>
                        <td>
                            <img src="${pizza.tamanio}" alt="${pizza.variedad}" width="30%">
                        </td>
                        <td>
                            <button class="btn-cac" onclick='updateMovie(${pizza.id})'><i class="fa fa-pencil" ></button></i>
                            <button class="btn-cac" onclick='deleteMovie(${pizza.id})'><i class="fa fa-trash" ></button></i>
                        </td>
                    </tr>
        `;
        tbodyMovies.insertAdjacentHTML('beforeend',tr);
    });

}

/**
 * funcion que permite agregar o modificar una pelicula al listado de peliculas
 * almacenado en el localstorage
 */
function savePizza(){
    
    //Obtengo el elemento HTML del formulario
    const form = document.querySelector('#form-pizza');

    //obtengo los inputs del formulario
    const inputId = document.querySelector('#id-pizza');
    const inputVariedad = document.querySelector('#variedad');
    const inputIngredientes = document.querySelector('#ingredientes');
    const inputTamanio = document.querySelector('#tamanio');
    const inputPrecioSalon = document.querySelector('#preciosalon');
    const inputPrecioDelivery = document.querySelector('#preciodelivery-form');

    //Realizo una validación simple de acuerdo al contenido del value del input del titulo
    if(inputTitle.value.trim() !== ''){
        //Busca en localstorage el item movies, si no existe asigna el array vacio.
        let pizzas = JSON.parse(localStorage.getItem('pizzas')) || [];

        //Si el input de ID es distinto de vacio, es porque se trata de una acción de UPDATE
        if(inputId.value!==""){
            //Busco dentro del arraya de movies el objeto a editar
            const pizzaFind = pizzas.find(pizza => pizza.id == inputId.value);
            //Si existe actualizo el objeto
            if (pizzaFind) {
              pizzaFind.variedad = inputVariedad.value;
              pizzaFind.ingredientes = inputIngredientes.value;
              pizzaFind.tamanio = inputTamanio.value;
              pizzaFind.precio_salon = inputPrecioSalon.value;
              pizzaFind.precio_delivery = inputPrecioDelivery.value;
            }
        }else{
            let newPizza = new Pizza(
                pizzas.length+1,
                inputVariedad.value,
                inputIngredientes.value,
                inputTamanio.value,
                inputPrecioSalon.value,
                inputPrecioDelivery.value,
            );
            pizzas.push(newPizza);
        }

        //Se actualiza el array de peliculas en el localstorage
        localStorage.setItem('pizzas',JSON.stringify(pizzas));
        showPizzas();
        //Se limpian los inputs del formulario
        form.reset();
        Swal.fire({
            title: 'Exito!',
            text: 'Operacion exitosa.',
            icon: 'success',
            confirmButtonText: 'Cerrar'
        })
    }else{
        Swal.fire({
            title: 'Error!',
            text: 'Por favor completa el campo Variedad.',
            icon: 'error',
            confirmButtonText: 'Cerrar'
        });
    }

}

/**
 * Function que permite cargar el formulario para editar una pelicula
 * de acuedo al id de la pelicula
 * @param {number} pizzaId id movie que se va a actualizar
 */
function updateMovie(pizzaId){
    let pizzas = JSON.parse(localStorage.getItem('pizzas'));
    //se utiliza el metodo find para poder asegurarnos que exista una pelicula con el id que queremos eliminar.
    let pizzaToUpdate = pizzas.find(pizza => pizza.id===pizzaId);
    if(pizzaToUpdate){
        //Se buscan los elementos HTML del input
        const inputId = document.querySelector('#id-pizza');
        const inputVariedad = document.querySelector('#variedad');
        const inputIngredientes = document.querySelector('#ingredientes');
        const inputTamanio = document.querySelector('#tamanio');
        const inputPrecioSalon = document.querySelector('#precio_salon');
        const inputPrecioDelivery = document.querySelector('#preciodelivery-form');
        //Se cargan los inputs con los valores de la pelicula encontrada
        inputId.value = pizzaToUpdate.id;
        inputVariedad.value = pizzaToUpdate.title;
        inputIngredientes.value = pizzaToUpdate.ingredientes;
        inputTamanio.value = pizzaToUpdate.tamanio;
        inputPrecioSalon.value = pizzaToUpdate.precio_salon;
        inputPrecioDelivery.value = pizzaToUpdate.precio_delivery;
    }
}

/**
 * Function que permite eliminar una pelicula del array del localstorage
 * de acuedo al indice del mismo
 * @param {number} pizzaId id movie que se va a eliminar
 */
function deleteMovie(pizzaId){
    let pizzas = JSON.parse(localStorage.getItem('pizzas'));
    //se utiliza el metodo find para poder asegurarnos que exista una pelicula con el id que queremos eliminar.
    let pizzaToDelete = pizzas.find(pizza => pizza.id===pizzaId);
    if(pizzaToDelete){
        //se utiliza el metodo filter para actualizar el array de movies, sin tener el elemento encontrado en cuestion.
        pizzas = pizzas.filter(pizza => pizza.id !== pizzaToDelete.id);
        //se actualiza el localstorage
        localStorage.setItem('pizzas',JSON.stringify(pizzas));
        showPizzas();
        Swal.fire({
            title: 'Exito!',
            text: 'La pizza fue eliminada.',
            icon: 'success',
            confirmButtonText: 'Cerrar'
        })
    }
}

// NOS ASEGURAMOS QUE SE CARGUE EL CONTENIDO DE LA PAGINA EN EL DOM
document.addEventListener('DOMContentLoaded',function(){

    const btnSaveMovie = document.querySelector('#btn-save-pizza');

    //ASOCIAR UNA FUNCION AL EVENTO CLICK DEL BOTON
    btnSavePizza.addEventListener('click',savePizza);
    showPizzas();
});