import css from "./HomePage.module.css";
import { getTrends } from "../API/API";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { MovieList } from "../components/MovieList/MovieList";

export default function HomePage() {
  const location = useLocation();

  const [error, setError] = useState(false);
  const [trends, setTrends] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      try {
        const fetchTrends = await getTrends({
          abortController: controller,
        });
        setTrends(fetchTrends);
      } catch (error) {
        if (error.code !== "ERR_CANCELED") {
          setError(true);
          console.log(error);
        }
      }
    }
    fetchData();
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <>
      <h2 className={css.title}>Trending today</h2>
      {error && <p className={css.error}>API Error!</p>}
      {trends.length > 0 && <MovieList movies={trends} location={location} />}
    </>
  );
}