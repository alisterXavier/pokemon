'use client';
import { Initialize } from '@/utils/query/fetch';
import axios from 'axios';
import styled from 'styled-components';
import { Loading, PageTitle, Tile } from '../../components/utils';

const PokemonWrapper = styled.div`
  .pokemon-link-container {
    width: 100%;
    margin-top: 20px;
    .pokemon-link-inner {
      display: flex;
      flex-wrap: wrap;
    }
  }
`;

const Pokemons = ({ params }: { params: { type: string } }) => {
  const query = Initialize(axios);
  const { data, isPending, error } = query.useGetPokemon(params.type);

  return (
    <PokemonWrapper>
      {isPending ? (
        <Loading />
      ) : (
        <>
          <PageTitle title="Pokemons" />
          <div className="pokemon-link-container">
            <div className="pokemon-link-inner">
              {data.pokemon.length > 0 ? (
                data.pokemon.map(
                  (
                    pokemonEntry: { pokemon: { name: string; url: string } },
                    index: number
                  ) => {
                    return (
                      <Tile
                        key={index}
                        url={`/pokemon/${pokemonEntry.pokemon.name}`}
                        name={pokemonEntry.pokemon.name}
                      />
                    );
                  }
                )
              ) : (
                <h1>No pokemons</h1>
              )}
            </div>
          </div>
        </>
      )}
    </PokemonWrapper>
  );
};

export default Pokemons;
