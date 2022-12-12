const Api = {
  pokemon: async (pokemonNumber) => {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`).then(
      (res) => res.json()
    );
  },
  pokemonList: async (limit) => {
    return fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`).then(
      (res) => res.json()
    );
  },
  pokemonSpecies: async (pokemonNumber) => {
    return fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${pokemonNumber}`
    ).then((res) => res.json());
  },
  type: async (pokemonNumber) => {
    return fetch(`https://pokeapi.co/api/v2/type/${typeName}`).then((res) =>
      res.json()
    );
  },
};

export default Api;
