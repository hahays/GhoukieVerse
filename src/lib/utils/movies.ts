// src/lib/utils/movies.js
import { average } from "./math";

export const calculateMovieAverages = (movies) => ({
  avgImdbRating: average(movies.map((m) => m.imdbRating)),
  avgUserRating: average(movies.map((m) => m.userRating)),
  avgRuntime: average(
    movies.map((m) => m.runtime),
    0
  ),
});
