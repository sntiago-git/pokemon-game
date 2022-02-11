<template>
  <div class="pokemon-container">
    <img :src="imgSrc" class="hidden-pokemon" alt="pokemon" />
    <img :src="imgSrc" v-if="showPokemon" class="fade-in" alt="pokemon" />
  </div>
</template>

<script>
export default {
  name: "PokemonPicture",

  props: {
    pokemonId: {
      type: Number,
      default: 1,
      required: true,
    },
    showPokemon:{
      type: Boolean,
      default: false,
      required: true
    }
  },

  computed: {
    imgSrc() {
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${this.pokemonId}.svg`;
    },
  },
};
</script>

<style scoped>
/* Pokemon Picture */
.pokemon-container {
  height: 200px;
}
img {
  height: 200px;
  position: absolute;
  width: 100vw;
  margin-left: -50vw;
  user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
}
.hidden-pokemon {
  filter: brightness(0); /*Se muestra solo la silueta dle pokemon*/
}
</style>