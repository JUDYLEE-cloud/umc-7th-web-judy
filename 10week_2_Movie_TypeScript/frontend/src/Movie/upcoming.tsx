import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card, { CardList } from './card/card';
import './pagination.css';

type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
};

const BASE_URL = "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2|3&release_date.gte={min_date}&release_date.lte={max_date}";

const Upcoming: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState<number>(0);

  const API_KEY = import.meta.env.VITE_API_TOKEN;

  // 초기 데이터 가져오기
  useEffect(() => {
    const fetchNowPlaying = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(BASE_URL, {
          headers: { Authorization: `Bearer ${API_KEY}` },
          params: { language: "en-US", page },
        });
        setMovies(response.data.results);
        setTotalPages(response.data.total_pages);
      } catch (error: any) {
        setError(error.message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };

    fetchNowPlaying();
  }, [page, API_KEY]);

  return (
    <div>
      <h1>Up-Coming Movies</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <CardList>
        {movies.slice(0, 16).map((movie) => (
           <Card key={movie.id} movie={movie} />
        ))}
      </CardList>

      <div className="pagination-container">
            <button
                className="pagination-button"
                onClick={() => setPage((old) => Math.max(old - 1, 1))}
                disabled={page === 1 || isLoading}>Previous Page</button>

            <span className="pagination-info">Current page: {page}</span>

            <button
              className="pagination-button"
              onClick={() => setPage((old) => Math.min(old + 1, totalPages))}
              disabled={page === totalPages || isLoading}>Next Page</button>
      </div>

    </div>
  );
};

export default Upcoming; 
