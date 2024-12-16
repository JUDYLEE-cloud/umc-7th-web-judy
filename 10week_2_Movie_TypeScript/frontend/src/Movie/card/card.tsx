import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import '../../variable.css';

// Movie 타입 정의
interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
}

// Card 컴포넌트 Props 타입 정의
interface CardProps {
  movie: Movie | null;
}

const Card: React.FC<CardProps> = ({ movie }) => {
  const navigate = useNavigate();

  const handleCardClick = (): void => {
    if (movie) {
      navigate(`/movie/${movie.id}`, {
        replace: false,
        state: { MovieId: movie.id },
      });
    }
  };

  if (!movie) {
    return <SkeletonCard />;
  }

  return (
    <>     
      <CardWrapper key={movie.id} onClick={handleCardClick}>
        <CardPoster
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={`${movie.title} Poster`}
        />
        <CardTitle>{movie.title}</CardTitle>
        <CardReleaseDate>{movie.release_date}</CardReleaseDate>
      </CardWrapper>
    </>
  );
}; 

export default Card;

const SkeletonCard = styled.div`
  width: 150px;
  height: 250px;
  border-radius: 10px;
  margin: 10px;
  animation: shimmer 2s infinite linear;

  @keyframes shimmer {
    0% {
      background-position: -150px 0;
    }
    100% {
      background-position: 150px 0;
    }
  }

  background-image: linear-gradient(
    90deg,
    #e0e0e0 0px,
    #f0f0f0 40px,
    #e0e0e0 80px
  );
  background-size: 200% 200%;
`; 

export const CardList = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 80px;
`;

export const CardWrapper = styled.div`
  margin: 10px;
  cursor: pointer;

  &:hover {
    filter: brightness(0.9);
  }
`;

export const CardPoster = styled.img`
  width: 150px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
`;

export const CardTitle = styled.h3`
  font-size: 15px;
  color: var(--text-color);
  width: 150px;
  word-break: break-word;
  overflow-wrap: break-word;
`;

export const CardReleaseDate = styled.p`
  color: var(--text-color);
`;
