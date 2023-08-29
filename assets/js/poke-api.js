
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail){
    const pokemon = new Pokemon()
    pokemon.name = pokeDetail.name
    pokemon.number = pokeDetail.id
    
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    
    const statsName = pokeDetail.stats.map((base_statStat) => base_statStat.name)
    const statsBase = pokeDetail.stats.map((base) => base.base_stat) 
    const [stat] = statsName
    const [base] = statsBase

    let StatBase = pokeDetail.stats.map(function(base){
        return `${base.stat.name} ${base.base_stat}`
    })

    pokemon.types = types
    pokemon.type = type

    pokemon.stats = statsName
    pokemon.stat = stat
    pokemon.base_stat = StatBase

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail=(pokemon) => {

    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset, limit) => {
    
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)

    }
