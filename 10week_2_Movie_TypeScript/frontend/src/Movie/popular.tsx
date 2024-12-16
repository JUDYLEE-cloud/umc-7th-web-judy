import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card, { CardList } from './card/card';
import styled from 'styled-components';

type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
};

const BASE_URL = "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc";

const Popular: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const API_KEY = import.meta.env.VITE_API_TOKEN;

  // 초기 데이터 가져오기
  useEffect(() => {
    const fetchNowPlaying = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(BASE_URL, {
          headers: { Authorization: `Bearer ${API_KEY}` },
          params: { language: "en-US", page: 1 },
        });
        setMovies(response.data.results);
      } catch (error: any) {
        setError(error.message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };

    fetchNowPlaying();
  }, [API_KEY]);

  // 무한 스크롤 이벤트 핸들러
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
        !isLoading
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading]);

  // 추가 데이터 가져오기
  useEffect(() => {
    const fetchMoreMovies = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(BASE_URL, {
          headers: { Authorization: `Bearer ${API_KEY}` },
          params: { language: "en-US", page },
        });
        setMovies((prevMovies) => [...prevMovies, ...response.data.results]);
      } catch (error: any) {
        console.error("Error fetching more movies:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (page > 1) fetchMoreMovies();
  }, [page, API_KEY]);

  return (
    <div>
      <h1>Popular Movies</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <CardList>
        {movies.length === 0 && isLoading
          ? Array.from({length: 6}).map((_, index) => (
            <Card key={index} movie={null} />
          ))
        : movies.map((movie) => <Card key={movie.id} movie={movie} />)}
      </CardList>

      {movies.length > 0 && isLoading && <Spinner />}
    </div>
  );
};

export default Popular; 

const Spinner = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-left-color: #fff;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 20px auto;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;