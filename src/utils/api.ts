const Api = {
  pokemon: async (pokemonNumber: number) => {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`).then((res) => res.json());
  },
  pokemonList: async (limit: number) => {
    return fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`).then((res) => res.json());
  },
  pokemonSpecies: async (pokemonNumber: number) => {
    return fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonNumber}`).then((res) =>
      res.json()
    );
  },
  type: async (typeName: string) => {
    return fetch(`https://pokeapi.co/api/v2/type/${typeName}`).then((res) => res.json());
  }
};

export default Api;
