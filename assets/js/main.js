const pokemonOL = document.getElementById('pokemonlist')
const loadmorebutton = document.getElementById('loadmorebutton')
const limit = 5;
let offset = 0;
const maxRecord = 15;

function loadPokemonItens(offset, limit){
    pokeApi.getPokemons(offset, limit).then((pokemonlist = []) => {
            const newHtml = pokemonlist.map((pokemon) =>
            `
    
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join("")}
                    </ol>
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
            </li>
        
            `              
            ).join('')

        pokemonOL.innerHTML +=  newHtml
        
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

