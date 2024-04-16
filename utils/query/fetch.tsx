import axios, { AxiosInstance } from 'axios';
import { useQuery } from '@tanstack/react-query';

export type Queries = ReturnType<typeof MakeQueries>;

function Queries(queries: Queries) {
  return {
    useGetCategories: () =>
      useQuery({
        queryKey: ['category'],
        queryFn: queries.Categories,
      }),
    useGetPokemon: (type: string | null) =>
      useQuery({
        queryKey: [`${type}-pokemon`],
        queryFn: () => type && queries.Pokemon(type),
      }),
    usePokemonSearch: (pokemon: string | undefined) =>
      useQuery({
        queryKey: [`${pokemon}-search`],
        queryFn: () =>
          pokemon &&
          queries.PokemonSearch().then((res) => {
            const pattern = new RegExp(pokemon);

            const filtered = res.results.filter((i: { name: string }) => {
              return pattern.test(i.name);
            });
            return filtered;
          }),
      }),
    useGetPokemonStats: (pokemon: string | null) =>
      useQuery({
        queryKey: [`${pokemon}-stats`],
        queryFn: () => pokemon && queries.PokemonStats(pokemon),
      }),
  };
}

export function MakeQueries(axios: AxiosInstance) {
  return {
    Categories: async () =>
      await axios
        .get('https://pokeapi.co/api/v2/type/')
        .then((res) => res.data),
    Pokemon: async (type: string) =>
      await axios
        .get(`https://pokeapi.co/api/v2/type/${type}`)
        .then((res) => res.data),
    PokemonStats: async (pokemon: string) =>
      await axios
        .get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then((res) => res.data),
    PokemonSearch: async () =>
      await axios
        .get(`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`)
        .then((res) => res.data),
  };
}

export function Initialize(axios: AxiosInstance) {
  const q = MakeQueries(axios);
  return Queries(q);
}
