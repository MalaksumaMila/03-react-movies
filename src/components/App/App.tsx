import { useState, useEffect } from 'react';
import css from './App.module.css';

import type { Movie } from '../../types/movie';
import fetchMovies from '../../services/movieService';
import SearchBar from '../SearchBar/SearchBar';
import toast from 'react-hot-toast';
import MovieGrid from '../MovieGrid/MovieGrid';

function App() {
  const [topic, setTopic] = useState<string>('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const handleSearch = (q: string) => setTopic(q);

  useEffect(() => {
    const loadMovies = async () => {
      if (!topic.trim()) return;

      setIsError(false);
      setIsLoading(true);
      setMovies([]);
      try {
        const data = await fetchMovies(topic);

        if (data.length === 0) {
          toast.error('No movies found for your request');
        }
        setMovies(data);
      } catch {
        setIsError(true);
        toast.error('There was an error, please try again...');
      } finally {
        setIsLoading(false);
      }
    };
    loadMovies();
  }, [topic]);

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <p className={css.text}>Loading movies, please wait...</p>}
      {isError && (
        <p className={css.text}>There was an error, please try again...</p>
      )}
      <MovieGrid />
    </>
  );
}

export default App;
