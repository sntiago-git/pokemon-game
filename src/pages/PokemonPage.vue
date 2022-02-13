<template>
  <div v-if="pokemon">
    <!--Muestra el html cuando exista un pokemon-->
    <h1>¿Quien es este Pokemon?</h1>
    <!-- img -->
    <pokemon-picture :pokemonId="pokemon.id" :showPokemon="showPokemon" />
    <!-- opciones -->
    <pokemon-options :pokemons="pokemonArr" @selection-pokemon="checkAnswer" />
    <!--Escuchamos el evento personalizado cuando se emita desde el componente hijo, para luego ejecutar un method-->

    <div v-if="showAnswer">
      <div v-if="result">
        <h2 style="color: green">Correcto :)</h2>
        <p>El pokemon era {{ pokemon.name }}</p>
        <p>Felicidades maestro Pokemon :)</p>
      </div>

      <div v-else>
        <h2 style="color: red">Opps :(</h2>
        <p>El pokemon era {{ pokemon.name }}</p>
        <q
          style="
            max-width: 500px;
            margin: auto;
            margin-bottom: 10px;
            display: block;
          "
          >Nunca pienso en las consecuencias de fallar un gran tiro… cuando se
          piensa en las consecuencias se está pensando en un resultado
          negativo</q
        >
        <blockquote>Michael Jordan</blockquote>
      </div>

      <button @click="newGame"><p>Jugar otra vez :)</p></button>
    </div>
  </div>

  <div v-else>
    <!-- cargando mientras se obtiene los pokemones -->
    <h1>Espere por favor...</h1>
  </div>
</template> 
<script>
import PokemonOptions from "@/components/PokemonOptions.vue";
import PokemonPicture from "@/components/PokemonPicture.vue";
import getPokemonOptions from "@/helpers/getPokemonOptions";

export default {
  name: "PokemonPage",
  components: {
    PokemonPicture,
    PokemonOptions,
  },
  data() {
    return {
      pokemonArr: [],
      pokemon: null,
      showPokemon: false,
      showAnswer: false,
      result: false,
    };
  },
  methods: {
    async mixPokemonArray() {
      this.pokemonArr = await getPokemonOptions();

      //creamos un numero random entre 0-3 para obtener un pokemon alazar de los 4
      const rdnInt = Math.floor(Math.random() * 4);
      console.log(rdnInt);

      this.pokemon = this.pokemonArr[rdnInt]; //Sacamos un pokemon alazar del array de 4 pokemones
    },

    checkAnswer(selectedId, element) {
      console.log(element);

      this.showPokemon = true;
      this.showAnswer = true;

      if (selectedId === this.pokemon.id) {
        this.result = true;
        element.target.className += "selectedCorrect";
      } else {
        this.result = false;
        element.target.className += "selectedWrong";
      }
    },

    newGame() {
      (this.pokemonArr = []),
        (this.pokemon = null),
        (this.showPokemon = false),
        (this.showAnswer = false),
        this.mixPokemonArray();
    },
  },

  mounted() {
    this.mixPokemonArray();
  },
};
</script>
<style>
</style>