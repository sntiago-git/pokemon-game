<template>
  <div class="options-container">
    <ul>
      <li
        v-for="pokemon in pokemons"
        :key="pokemon.id"
        @click="selection(pokemon.id, $event)"
      >
        <!-- creamos un evento personalizado (selection)-->
        {{ pokemon.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "PokemonOptions",
  data() {
    return {};
  },
  props: {
    pokemons: {
      type: Array,
      required: true,
    },
  },

  methods: {
    selection(pokeId, element) {
      this.$emit("selection-pokemon", pokeId, element);
    },
  },
};
</script>

<style scoped>
/* Pokemon Options */
ul {
  list-style-type: none;
  padding: 0;
}
li {
  background-color: white;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  cursor: pointer;
  margin-bottom: 10px;
  padding: 5px;
  width: 250px;
}

li:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.options-container {
  display: flex;
  justify-content: center;
}

.selectedCorrect {
  background: green;
  color: white;
  pointer-events: none;
  animation: fadeIn 0.5s;
}

.selectedWrong {
  background: red;
  color: white;
  pointer-events: none;
  animation: fadeIn 0.5s;
}
</style>