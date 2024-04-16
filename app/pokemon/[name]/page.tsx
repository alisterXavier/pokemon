'use client';
import { Initialize } from '@/utils/query/fetch';
import axios from 'axios';
import styled from 'styled-components';
import { ReactNode, useMemo } from 'react';
import {
  Loading,
  PageTitle,
  PokemonImage,
} from '@/app/components/utils';
import { RadarChart } from '@/app/components/radar';

const PokemonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .pokemon-details{
    display: flex;
    flex-direction: column;
    justify-context: center
    align-items: center;

    & div{
      margin: 0px 10px 0px 10px
    }
  }
  .pokemon-info {
    margin: 10px 0px 10px 0px;
  }

  .pokemon-info-title {
    font-size: 20px;
  }
`;
const PokemonHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
`;
const Table = styled.div`
  min-height: 200px;
  max-height: 350px;
  width: 450px;
  overflow-y: scroll;
  border-top: 1px solid white;
  padding: 5px;
  margin-bottom: 20px;
  & > div {
    width: 300px;
    display: flex;
    & > p {
      padding: 5px;
    }
  }
`;

const PokemonStats = ({ params }: { params: { name: string } }) => {
  const query = Initialize(axios);
  const { data, isPending, error } = query.useGetPokemonStats(params.name);
  const memoizedAbilities = useMemo(() => {
    return data?.abilities.map(
      (i: { ability: { name: string } }, index: number) => (
        <div key={index}>
          <p>{index + 1}</p>
          <p className="mr-3">{i.ability.name}</p>
        </div>
      )
    );
  }, [data]);
  const memoizedMoves = useMemo(() => {
    return data?.moves.map((i: { move: { name: string } }, index: number) => (
      <div key={index}>
        <p>{index + 1}</p>
        <p className="mr-3">{i.move.name}</p>
      </div>
    ));
  }, [data]);
  const memoizedAppearance = useMemo(() => {
    return data?.['game_indices'].map(
      (i: { version: { name: string } }, index: number) => (
        <div key={index}>
          <p>{index + 1}</p>
          <p className="mr-3">{i.version.name}</p>
        </div>
      )
    );
  }, [data]);

  const PokemonInfoSection = ({
    title,
    children,
  }: {
    title: string;
    children: ReactNode;
  }) => (
    <div>
      <h1 className="pokemon-info-title">{title}</h1>
      {children}
    </div>
  );
  return (
    <div>
      {isPending ? (
        <Loading />
      ) : (
        <PokemonWrapper>
          <PokemonHeader>
            <PageTitle title={data.species.name} />
            <PokemonImage url={data.sprites['front_default']} />
          </PokemonHeader>

          <div>
            <div className="pokemon-stats">
              <RadarChart data={data.stats} />
            </div>
            <div className="pokemon-details">
              <PokemonInfoSection title="Abilities">
                <Table>{memoizedAbilities}</Table>
              </PokemonInfoSection>
              <PokemonInfoSection title="Game Appearance">
                <Table>{memoizedAppearance}</Table>
              </PokemonInfoSection>
              <PokemonInfoSection title="Moves List">
                <Table>{memoizedMoves}</Table>
              </PokemonInfoSection>
            </div>
          </div>
        </PokemonWrapper>
      )}
    </div>
  );
};

export default PokemonStats;
