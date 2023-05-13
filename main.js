function buscarPokemon(nombre){
    fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}/`)
    .then(function(res){
        return res.json();
    })
    .then(data=>{verPokemon(data);
        preloader.classList.remove("lds-dual-ring");
    })
    .catch((e)=>{
        pikachu.classList.remove("ocultar");
        contenedor.style.background="transparent";
        preloader.classList.remove("lds-dual-ring");
        c_img.classList.add("ocultar");
        c_esta.classList.add("ocultar");
        let no_found=document.getElementById("no_found");
        no_found.innerText="No encontrado";
    })
}

function verPokemon(pokemon){
    
    pikachu.classList.add("ocultar");
    c_img.classList.remove("ocultar");
    c_esta.classList.remove("ocultar");
    contenedor.style.background=tiposColor[pokemon.types[0].type.name];
    nombre.innerText=pokemon.name;
    hp.innerText=pokemon.stats[0].base_stat;
    attack.innerText=pokemon.stats[1].base_stat;
    defense.innerText=pokemon.stats[2].base_stat;
    esp_attack.innerText=pokemon.stats[3].base_stat;
    esp_defen.innerText=pokemon.stats[4].base_stat;
    speed.innerText=pokemon.stats[5].base_stat;
    img.src=pokemon.sprites.other["official-artwork"].front_default;
    tipos.innerText="";
    
    for(let i=0;i<pokemon.types.length;i++){
        let nombreTipo=pokemon.types[i].type.name;
        let contenedor_tipo=document.createElement('span');
        let nom_tipo=document.createTextNode(nombreTipo);
        contenedor_tipo.setAttribute("style","background-color:"+tiposColor[nombreTipo]);
        contenedor_tipo.appendChild(nom_tipo);
        tipos.appendChild(contenedor_tipo);
    }
}
function buscarPokemonCard(endPoint){
    fetch(endPoint)
    .then((res)=>{
        return res.json();
    })
    .then(data=>{
        verPokemonCard(data)
    })
}
function verDetalles(e){
    
    let name = e.target.name;
    buscarPokemon(name);

}
function verPokemonCard(data){
    let cardPokemon = document.createElement("div");
    let a = document.createElement("a");
    a.href="#top";
    cardPokemon.classList.add("pokemon-card");
    cardPokemon.name = data.name;
    cardPokemon.style.background=tiposColor[data.types[0].type.name];
    cardPokemon.addEventListener("click", (e)=>{resetearNombresEstados(); verDetalles(e)})
    let imgPokemon = document.createElement("img");
    imgPokemon.src = data.sprites.other["official-artwork"].front_default;
    imgPokemon.name = data.name;
    let nomPokemon = document.createElement("p");
    nomPokemon.name = data.name;
    nomPokemon.classList.add("nombre-pokemon-card");
    let texNomPokemon = document.createTextNode(data.name);


    contLista.appendChild(a);
    a.appendChild(cardPokemon);
    cardPokemon.appendChild(imgPokemon);
    cardPokemon.appendChild(nomPokemon);
    nomPokemon.appendChild(texNomPokemon);

}

function listaPokemon(url = "https://pokeapi.co/api/v2/pokemon"){
    fetch(url)
    .then(function(res){
        return res.json();
    })
    .then(data=>{
        for(let i=0; i < data.results.length; i++){
            let endPoint = data.results[i].url;
            buscarPokemonCard(endPoint)
        }
        data.previous ? ante = true : ante = false;
        data.next ? sig = true : sig = false;

        urlNext = data.next;
        urlPrev = data.previous;
        mostrarBotones();

    })
}

function mostrarBotones(){
    if(ante){
        prev.setAttribute("style","visibility: visible");
    }
    else{
        prev.setAttribute("style","visibility: hidden");
    }

    if(sig){
        next.setAttribute("style","visibility: visible");
    }
    else{
        next.setAttribute("style","visibility: hidden");
    }
}

function siguienteLista(){
    contLista.innerText = "";
    cont++;
    pag.innerText = cont;
    listaPokemon(urlNext);
}
function anteriorLista(){
    contLista.innerText = "";
    cont--;
    pag.innerText = cont;
    listaPokemon(urlPrev);
}
listaPokemon();

let cont = 1;
let img=document.getElementById("imgPoke");
let nombre=document.getElementById("nombre");
let hp=document.getElementById("hp");
let attack=document.getElementById("attack");
let defense=document.getElementById("defense");
let esp_attack=document.getElementById("espAttack");
let esp_defen=document.getElementById("espDefen");
let speed=document.getElementById("speed");
let tipos=document.getElementById("tipos");
let search=document.getElementById("search");
let c_img=document.getElementById("contenedor-img");
let c_esta=document.getElementById("contenedor-estadisticas");
let pikachu=document.getElementById("pikachu");
let btn=document.getElementById("btn");
let contenedor=document.getElementById("info");

let contLista = document.getElementById("lista_pokemon");
let prev = document.getElementById("prev");
let next = document.getElementById("next");
let sig, ante;
let urlNext, urlPrev;
let pag = document.getElementById("pag");

const tiposColor=
{
    normal:"#9fa19f",
    fire:"#e62829",
    water:"#2980ef",
    grass:"#3fa129",
    electric:"#fac000",
    ice:"#3fd8ff",
    fighting:"#ff8000",
    poison:"#9141cb",
    ground:"#915121",
    flying:"#81b9ef",
    psychic:"#ef4179",
    bug:"#91a119",
    rock:"#afa981",
    ghost:"#704170",
    dark:"#50413f",
    dragon:"#5262e1",
    steel:"#60A1B8",
    fairy:"#f170f1"
}

let preloader = document.getElementById("preloader");

btn.addEventListener("click",function(){
    let busqueda=search.value;
    busqueda=busqueda.toLowerCase();

    if(busqueda == "neferu"){ //para personaje especial
        personajeEspecial();
        verPokemon(datos);
        return 0;
    }

    resetearNombresEstados();
    no_found.innerText="";
    preloader.classList.add("lds-dual-ring");
    buscarPokemon(busqueda);
})

document.addEventListener("keyup",function(e){
    if(e.code=="Enter"){

        let busqueda=search.value;
        busqueda=busqueda.toLowerCase();

        if(busqueda == "neferu"){ //para personaje especial
            personajeEspecial();
            verPokemon(datos);
            return 0;
        }

        resetearNombresEstados();
        no_found.innerText="";
        preloader.classList.add("lds-dual-ring");;
        buscarPokemon(busqueda);
        
    }

});

next.addEventListener("click", siguienteLista);
prev.addEventListener("click", anteriorLista);



// ###########################

// ########### Personaje especial #################

const datos = {
    name:"NeferPitou",
    types:[{type:{name:"poison"}}],
    stats:[{base_stat:"999"},
        {base_stat:"999"},
        {base_stat:"999"},
        {base_stat:"Lamentablemente Si"},
        {base_stat:"desconocido"},
        {base_stat:"Furro"}
    ],

    sprites:{other:{"official-artwork":{front_default:"img/Neferpitou.png"}}}

}

let estados = document.getElementsByClassName("estados");

function personajeEspecial(){
    const listaEstds = ["Vitalidad", "Ataque", "Defensa", "Rule 34", "Ataque especial", "Raza"];
    for(let i=0; i<estados.length; i++){
        estados[i].innerText = listaEstds[i];
    }
}

function resetearNombresEstados(){
    const listaEstds = ["Hp", "Attack", "Defense", "Special-attack", "Special-defense", "Speed"];
    for(let i=0; i<estados.length; i++){
        estados[i].innerText = listaEstds[i];
    }
}

// ########### Fin de personaje especial #################