import axios from "axios";
import pokemonApi from '@/api/pokemonApi'

const getPokemons = () => {

    const pokemonsArr = Array.from(Array(650)) //Se crea un array de 650 registros indefinidos

    //Se llena el array usando .map
    //Esta funcion permite crear un nuevo array con los datos modificados segun lo que se busque
    //En este caso vamos a crear un array nuevo con numeros del 1 al 650.
    //Para eso el map devuelve los nuevos valores, que serán igual al indice + 1, para que no se tome el indice 0.

    return pokemonsArr.map((value, index) => value = index + 1) //Con esta sintaxis el return del callback es automatico.
}

const getPokemonOptions = async () => {

    //Ahora mezclaremos todos los numeros
    //Algoritmo para mezclar arrays
    function fisherYatesShuffle(arr) {
        for (var i = arr.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1)); //random index
            [arr[i], arr[j]] = [arr[j], arr[i]]; // swap
        }
        return arr
    }

    const mixedPokemons = fisherYatesShuffle(getPokemons()); //Guardamos el array mezclado en una constante

    const pokemons = await getPokemonNames(mixedPokemons.splice(0, 4))
    console.table(pokemons)
    return pokemons
}

const getPokemonNames = async ([a, b, c, d] = []) => {

    console.log(a, b, c, d)

    //Destructuracion del array para guardar los 4 datos en variables a,b,c,d
    /* MI FORMA, 1 SOLA PETICION CON LOS 650 POKEMONES

    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=650')
    const apiPokemons = response.data.results

    return [
        { name: apiPokemons[a].name, id: a },
        { name: apiPokemons[b].name, id: b },
        { name: apiPokemons[c].name, id: c },
        { name: apiPokemons[d].name, id: d },
    ] */

    const promiseArr = [
        await pokemonApi.get(`/${a}`),
        await pokemonApi.get(`/${b}`),
        await pokemonApi.get(`/${c}`),
        await pokemonApi.get(`/${d}`),
    ]

    const [p1, p2, p3, p4] = await (await Promise.all(promiseArr)).map(value => value.data)
    console.log(p1, p2, p3, p4)

    //Creamos y retornamos un arreglo con el nombre y id del pokemon.

    const pokemonNames = [
        { name: p1.name, id: p1.id },
        { name: p2.name, id: p2.id },
        { name: p3.name, id: p3.id },
        { name: p4.name, id: p4.id },
    ]

    return pokemonNames;
}

export default getPokemonOptions