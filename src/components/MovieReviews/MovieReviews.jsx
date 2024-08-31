import css from "./MovieReviews.module.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getReviewsByID } from "../../API/API";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const movieReviews = async () => {
      try {
        const response = await getReviewsByID(movieId);
        setReviews(response);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    movieReviews();
  }, [movieId]);

  if (isLoading) {
    return <p className={css.loading}>Loading...</p>;
  }

  return (
    <>
      {reviews.length > 0 && (
        <ul className={css.review}>
          {reviews.map((review) => (
            <li key={review.id}>
              <p className={css.author}>{review.author}</p>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
      {!isLoading && reviews.length === 0 && (
        <div className={css.noreview}>Sorry. We dont have reviews for this movie.</div>
      )}
    </>
  );
};

export default MovieReviews;