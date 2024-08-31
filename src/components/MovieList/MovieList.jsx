import { Link } from "react-router-dom";
import css from "./MovieList.module.css";

export const MovieList = ({ movies, location }) => {
  return (
    <>
      <ul className={css.list}>
        {movies.length > 0 &&
          movies.map((movie) => (
            <li key={movie.id}>
              <Link to={`/movies/${movie.id}`} state={location}>
                {movie.original_title}
              </Link>
            </li>
          ))}
      </ul>
    </>
  );
};

export default MovieList;