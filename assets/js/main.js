const pokemonOL = document.getElementById('pokemonlist')
const loadmorebutton = document.getElementById('loadmorebutton')
const loadHabilidade = document.getel

const limit = 5;
let offset = 0;
const maxRecord = 150;

pokeApi.getPokemons = (offset, limit) => {
    
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
    }



function loadPokemonItens(offset, limit){
    pokeApi.getPokemons(offset, limit).then((pokemonlist = []) => {
            const newindexHtml = pokemonlist.map((pokemon) =>
            `
    
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span onclick="viewHabil()" class="name">${pokemon.name}</a></span>
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join("")}
                    </ol>
                    <ol class="types">
                        ${pokemon.base_stat.map((base) => `<li class="type ${pokemon.type}">${base}</li>`).join("")}
                    </ol>
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
                <button id="loadHAbil${pokemon.number}" class="bt ${pokemon.type}" class="botao" type="button">...</button>
            </li>
            
            `              
            ).join('')

        pokemonOL.innerHTML +=  newindexHtml
        
    }) 
}
loadPokemonItens(offset, limit)
 
loadmorebutton.addEventListener('click', () => {
    offset += limit
    let newlimit= maxRecord-offset
    if((maxRecord-offset)>5){

        loadPokemonItens(offset, limit)
    }
    else{
        loadPokemonItens(offset, newlimit)
        loadmorebutton.parentElement.removeChild(loadmorebutton)
    }

    
})



