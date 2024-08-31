import { useEffect, useState } from "react";
import { searchMovieByName } from "../API/API";
import { useSearchParams, useLocation } from "react-router-dom";
import { SearchForm } from "../components/SearchForm/SearchForm";
import { MovieList } from "../components/MovieList/MovieList";

export default function MoviesPage() {
  const location = useLocation();

  const [movies, setMovies] = useState([]);
  const [params, setParams] = useSearchParams();
  const searchQuery = params.get("query");


  useEffect(() => {
    if (!searchQuery) return;
    const fetchMovies = async () => {
      try {
        const data = await searchMovieByName(searchQuery);
        setMovies(data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchMovies();
  }, [searchQuery]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const query = event.target.elements.query.value.trim();
    setParams({ query: query });
    event.target.reset();
  };

  return (
    <>
      <SearchForm handleSubmit={handleSubmit} />
      {movies.length > 0 && <MovieList movies={movies} location={location} />}
    </>
  );
}