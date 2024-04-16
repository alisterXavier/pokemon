'use client';
import { Loading, PageTitle, Tile } from '@/app/components/utils';
import { Initialize } from '@/utils/query/fetch';
import axios from 'axios';
import styled from 'styled-components';

const SearchWrapper = styled.div`
  .search-results {
    display: flex;
    flex-wrap: wrap;
  }
`;

const Search = ({ params }: { params: { search: string } }) => {
  const query = Initialize(axios);

  const { data, isPending, error } = query.usePokemonSearch(params.search);

  return (
    <SearchWrapper>
      <PageTitle title={`Search results for ${params.search}`} />
      <div className="search-results">
        {isPending ? (
          <Loading />
        ) : data.length > 0 ? (
          data.map((pokemon: { name: string }, index: number) => {
            return (
              <Tile
                key={index}
                url={`/pokemon/${pokemon.name}`}
                name={pokemon.name}
              />
            );
          })
        ) : (
          <p>No Pokemon found for &quot;{params.search}&quot;</p>
        )}
      </div>
    </SearchWrapper>
  );
};

export default Search;
