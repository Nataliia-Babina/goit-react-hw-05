import css from "./MovieCast.module.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCastByID } from "../../API/API";
import photoNotAvailable from "../../images/photoNotAvailable.png";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const movieCast = async () => {
      try {
        const response = await getCastByID(movieId);
        setCast(response);
        setIsLoading(false);
      } catch (error) {        
        setIsLoading(false);
      }
    };
    movieCast();
  }, [movieId]);

  if (isLoading) {
    return <p className={css.loading}>Loading...</p>;
  }

  return (
    <>
      {cast.length > 0 && (
        <ul className={css.cast}>
          {cast.map((actor) => (
            <li key={actor.id}>
              <img
                className={css.photo}
                src={
                  actor.profile_path ? `https://image.tmdb.org/t/p/w300${actor.profile_path}` : `${photoNotAvailable}`
                }
                alt={actor.original_name}
              />
              <p>{actor.name}</p>
              <p>{actor.character}</p>
            </li>
          ))}
        </ul>
      )}
      {!isLoading && cast.length === 0 && <p>The cast for this movie has not been determined yet.</p>}
    </>
  );
}

export default MovieCast;