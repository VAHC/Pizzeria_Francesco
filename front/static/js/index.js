window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.header');
    if (navbar) {
    if (window.scrollY > 0) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
}
});

//EJEMPLO DE UNA PROMESA
// const tickets =15;

// const playMovie = new Promise(function(resolve,reject){
//     if(tickets >=10){    
//         resolve(`Hay ${tickets} tickets vendidos, podemos ver la pelicula.`)
//     }else{
//         reject('No se han vendido los tickets suficientes, se cancela la pelicula');
//     }
// });

// console.log('INICIANDO SCRIPT');

// playMovie.then((miResultado)=>{
//     console.log(miResultado);
// })
// .catch((error)=>{
//     console.error(error);
// }).finally(()=>{
//     console.log('FIN DE LA PROMESA');
// })

// console.warn('CONTINUANDO SCRIPT');
// const options = {
//     method: 'GET',
//     headers :{
//         accept: 'application/json',
//         Authorization: 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYTJjYTAwZDYxZWIzOTEyYjZlNzc4MDA4YWQ3ZmNjOCIsInN1YiI6IjYyODJmNmYwMTQ5NTY1MDA2NmI1NjlhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4MJSPDJhhpbHHJyNYBtH_uCZh4o0e3xGhZpcBIDy-Y8'
//     }
// }

const fetchPizzasPromesa  = () => {
    //COLOCAR LOGICA DE ESPERA
    fetch('http://127.0.0.1:5000/api/pizzas/',options)
    .then(response => response.json()) // CONVERTIR A FORMATO JSON LA RESPUESTA DEL SERVIDOR
    .then(responseTransform => {
        console.log(responseTransform);  
        let pizzas = responseTransform.results;
        const divPopular = document.querySelector('#popular-list');
        pizzas.forEach(pizza => {
            const html = `
                    <div class="pizza-item">
                        <a href="./templates/detail-pizza.html" >
                            <img  class="pizza-item-img" src="https://image.tmdb.org/t/p/w500/${pizza.poster_path}" alt="${pizza.title}">
                            <div class="pizza-item-detail">
                                <p class="pizza-item-detail-variedad">${pizza.variedad}</p>
                                <p class="pizza-item-detail-tamanio">${pizza.tamanio} - ${pizza.vote_average}</p>
                            </div>
                        </a>
                    </div>
            `;
            divPopular.insertAdjacentHTML('beforeend',html);
        });
        
    })
    .catch(error => console.error(error));
}

const fetchMoviesAyncAwait = async () => {
    try {
        // Hace una solicitud HTTP GET a la URL del servidor seguida de '/movie/popular'. La palabra clave await pausa la ejecución hasta que la promesa devuelta por fetch se resuelva. La variable 'response' contendrá la respuesta HTTP.
        const response =  await fetch(`http://127.0.0.1:5000/api/pizzas/`, 
        option);
        // const response = await axios(`${URLSERVER}/movie/popular`, options);
        console.log('Esperando resolución');
        // Utiliza la palabra clave await para pausar la ejecución hasta que la promesa devuelta por response.json() se resuelva. La variable 'data' contendrá el cuerpo de la respuesta JSON.
        const data = await response.json();
        const pizzas = data.results;
        console.log(data);

        const divPopular = document.querySelector('#popular-list');
        pizzas.forEach(pizza => {
            const html = `
                    <div class="movie-item">
                        <a href="./templates/detail-movie.html" >
                            <img  class="movie-item-img" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}">
                            <div class="movie-item-detail">
                                <p class="movie-item-detail-title">${movie.title}</p>
                                <p class="movie-item-detail-subtitle">${movie.release_date} - ${movie.vote_average}</p>
                            </div>
                        </a>
                    </div>
            `;
            divPopular.insertAdjacentHTML('beforeend',html);
        });

    } catch (err) {
        console.error(err)
    }
    
}

fetchPizzasPromesa();