import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3/";
const api_key = "7d6842efb1101d7c583b422de9257ff5";
const language = "language=en-US";

export const getTrends = async ({ abortController }) => {
  const response = await axios.get("/trending/movie/day", {
    signal: abortController.signal,
    params: {
      language,
      api_key,
    },
  });
  return response.data.results;
};

export const getMovieByID = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}`, {
    params: {
      language,
      api_key,
    },
  });
  return response.data;
};

export const searchMovieByName = async (movieName) => {
  const response = await axios.get(`/search/movie`, {
    params: {
      query: movieName,
      language,
      api_key,
    },
  });
  return response.data;
};

export const getCastByID = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}/credits`, {
    params: {
      language,
      api_key,
    },
  });
  return response.data.cast;
};

export const getReviewsByID = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}/reviews`, {
    params: {
      language,
      api_key,
    },
  });
  return response.data.results;
};
