'use client';
import Link from 'next/link';
import styled from 'styled-components';
import loader from '@/public/simple-pokeball.gif';
import Image from 'next/image';

const LinkW = styled(Link)`
  padding: 10px;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 200px;
  max-width: 300px;
  height: 80px;
  margin: 10px;
  background: #1f1f1f;
  border-radius: 5px;
`;
const Title = styled.h1`
  font-size: 30px;
  text-transform: uppercase;
`;

export const Tile = ({ url, name }: { url: string; name: string }) => {
  return (
    <LinkW href={url} className="type-link">
      {name}
    </LinkW>
  );
};

export const PageTitle = ({ title }: { title: string }) => {
  return (
    <div>
      <Title>{title}</Title>
    </div>
  );
};

export const Loading = () => {
  return (
    <div className="loader">
      <Image src={loader} alt={'loader'} width={200} height={200} />
    </div>
  );
};



export const PokemonImage = ({ url }: { url: string }) => {
  return url ? <Image src={url} alt="" width={100} height={100} /> : <></>;
};
