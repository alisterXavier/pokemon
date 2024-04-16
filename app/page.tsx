'use client';
import { Initialize } from '@/utils/query/fetch';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styled from 'styled-components';
import { Loading, PageTitle, Tile } from './components/utils';

const TypeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .search-wrapper {
    width: 100%;
    margin: 10px 0px 10px 0px;

    & input {
      padding: 10px;
      width: 100%;
      height: 80px;
      font-size: 25px;
      border: 4px solid 2f2f2f;
      border-radius: 10px;
      background: #1b1b1b;
    }
  }
  .type-link-container {
    width: 100%;
    margin-top: 20px;

    .type-link-inner {
      display: flex;
      flex-wrap: wrap;
    }
  }
`;

export default function Home() {
  const query = Initialize(axios);
  const router = useRouter();
  const [searchValue, setSearchValue] = useState<string | undefined>();
  const { data, isPending } = query.useGetCategories();

  const handleSearch = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      router.push(`/search/${searchValue}`);
    }
  };

  return isPending ? (
    <Loading />
  ) : (
    <TypeWrapper>
      <div className="search-wrapper">
        <PageTitle title="Search" />
        <input
          placeholder="Search"
          onKeyDown={handleSearch}
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.currentTarget.value);
          }}
        />
      </div>
      <div className="type-link-container">
        <PageTitle title="Type" />
        <div className="type-link-inner">
          {data.results.map((i: any, index: number) => {
            return (
              <Tile
                url={`/pokemons/${i.name}`}
                name={i.name}
                key={index}
              />
            );
          })}
        </div>
      </div>
    </TypeWrapper>
  );
}
