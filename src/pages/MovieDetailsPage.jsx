import { useEffect, useState, useRef, Suspense } from "react";
import { Link, Outlet, useParams, useLocation } from "react-router-dom";
import { getMovieByID } from "../API/API";
import css from "./MovieDetailsPage.module.css";
import { GoArrowLeft } from "react-icons/go";

export default function MoviesDetailsPage() {
  const location = useLocation();
  const backLinkRef = useRef(location.state);

  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedMovie = await getMovieByID(movieId);
        setMovie(fetchedMovie);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [movieId]);

  let cover = null;
  let year = 0;
  let userScore = "";
  let genresList = [];

  if (movie) {
    cover = "https://image.tmdb.org/t/p/w500/" + movie.poster_path;
    year = new Date(movie.release_date).getFullYear();
    userScore = Math.round(movie.vote_average * 10);
    genresList = movie?.genres?.map((genre) => genre.name).join(", ");
  }

  return (
    <>
      {movie && (
        <div key={movie.id}>
          <Link to={backLinkRef.current ?? "/movies"}>
            <button className={css.btn}>
              <GoArrowLeft /> GoBack
            </button>
          </Link>
          <div className={css.wrapper}>
            <img className={css.cover} src={cover} alt={movie.original_title} />
            <div className={css.details}>
              <h1>
                {movie.original_title} ({year})
              </h1>
              <p>User Score: {userScore !== "" ? userScore + "%" : "No user score for this movie"}</p>
              <h2>Overview</h2>
              <p>{movie.overview !== "" ? movie.overview : "No overview for this movie"}</p>
              <h2>Genres</h2>
              <p>{genresList}</p>
            </div>
          </div>
          <hr />
          <div className={css.info}>
            <p>Additional information</p>
            <ul>
              <li>
                <Link to="cast">Cast</Link>
              </li>
              <li>
                <Link to="reviews">Reviews</Link>
              </li>
            </ul>
          </div>
          <hr />
          <Suspense fallback={<div className={css.loading}>Loading ...</div>}>
            <Outlet />
          </Suspense>
        </div>
      )}
    </>
  );
}