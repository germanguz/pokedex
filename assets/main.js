const listaPokemon = document.querySelector("#listaPokemon");
const botonesHeader = document.querySelectorAll(".btn-header");

const URL = "https://pokeapi.co/api/v2/pokemon/";

for (let i = 1; i <= 151; i++) {
    fetch(URL + i)
        .then(response => response.json())
        .then(data => mostrarPokemon(data))
}

function mostrarPokemon(poke) {
    
    // esto es para lo que va dentro de "pokemon-tipos"
    let tipos = poke.types.map(type => `<p class="${type.type.name} tipo">${type.type.name}</p>`);
    tipos = tipos.join("");

    // para que se muestren numeros de id con tres cifras ej: 001
    let pokeId = poke.id.toString();
    if (pokeId.length === 1) {
        pokeId = "00" + pokeId;
    } else if (pokeId.length === 2) {
        pokeId = "0" + pokeId;
    }
    
    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
        <p class="pokemon-id-back">#${pokeId}</p>
        <div class="pokemon-imagen">
            <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
        </div>
        <div class="pokemon-info">
            <div class="nombre-contenedor">
                <p class="pokemon-id">${pokeId}</p>
                <h2 class="pokemon-nombre">${poke.name}</h2>
            </div>
            <div class="pokemon-tipos">
                
                ${tipos}

            </div>
            <div class="pokemon-stats">
                <p class="stat">${poke.height}m</p>
                <p class="stat">${poke.weight}kg</p>
            </div>
        </div>
    `;
    listaPokemon.append(div);
}

botonesHeader.forEach(boton => boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id;

    listaPokemon.innerHTML = ""; /* vacio la lista para que no se repitan */

    for (let i = 1; i <= 151; i++) {
        fetch(URL + i)
            .then(response => response.json())
            .then(data => {

                if (botonId === "ver-todos") {
                    mostrarPokemon(data);
                } else {
                    const tipos = data.types.map(type => type.type.name);
                    if (tipos.some(tipo => tipo.includes(botonId))) {
                        mostrarPokemon(data)
                    }
                }
            })
    }
}))

// una opción para que cuando cargue no lo haga por nº desordenado
/*
La funcion para mostrar el pokemon lo he hecho con un promise.all()

function returnPokemons() {
    const requests = [];

    for (let i = 1; i <= 9; i++) {
        requests.push(fetch(URL + i)
            .then((response) => response.json()));
    }

    Promise.all(requests).then((data) => {
        data.forEach(pokemon => mostrarPokemon(pokemon));
    });
}

-Para que el peso y la altura sean los verdaderos los pueden dividir en 10
-En el boton de ver todos le puse un location.reload()

 */