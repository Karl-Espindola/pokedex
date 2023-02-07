function buscarPokemon(nombre){
    fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}/`)
    .then((res)=>res.json())
    .then(data=>{verPokemon(data);console.log(data)})
    .catch((()=>{
        pikachu.classList.remove("ocultar");
        c_img.classList.add("ocultar");
        c_esta.classList.add("ocultar");
        let no_found=document.getElementById("no_found");
        no_found.innerText="No encontrado";

    })());
}
function verPokemon(pokemon){
    pikachu.classList.add("ocultar");
    c_img.classList.remove("ocultar");
    c_esta.classList.remove("ocultar");
    nombre.innerText=pokemon.name;
    hp.innerText=pokemon.stats[0].base_stat;
    attack.innerText=pokemon.stats[1].base_stat;
    defense.innerText=pokemon.stats[2].base_stat;
    esp_attack.innerText=pokemon.stats[3].base_stat;
    esp_defen.innerText=pokemon.stats[4].base_stat;
    speed.innerText=pokemon.stats[5].base_stat;
    img.src=pokemon.sprites.front_default;
    tipos.innerText="";
    for(let i=0;i<pokemon.types.length;i++){
        let contenedor_tipo=document.createElement('span')
        let nom_tipo=document.createTextNode(pokemon.types[i].type.name)
        contenedor_tipo.appendChild(nom_tipo);
        tipos.appendChild(contenedor_tipo);
    }
}
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
// let busqueda="";
let c_img=document.getElementById("contenedor-img");
let c_esta=document.getElementById("contenedor-estadisticas");
let pikachu=document.getElementById("pikachu");

document.addEventListener("keyup",function(e){
    if(e.code=="Enter"){
        let busqueda=search.value;
        busqueda=busqueda.toLowerCase();
        buscarPokemon(busqueda);
        
    }

});
