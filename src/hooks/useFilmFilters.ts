// import { useEffect, useState } from 'react';
// import { useGetTopMoviesQuery } from '../app/api/films/films.api';
//
// export const useFilmFilters = () => {
//     const { data: movies } = useGetTopMoviesQuery({ limit: 1 });
//     const [filters, setFilters] = useState({
//         genres: [] as Array<{ value: string; label: string }>,
//         countries: [] as Array<{ value: string; label: string }>,
//
//     });
//
//     useEffect(() => {
//         if (movies?.docs) {
//
//             const allGenres = movies.docs.flatMap(movie =>
//                 movie.genres.map(genre => genre.name)
//             );
//             const uniqueGenres = [...new Set(allGenres)];
//
//
//             const allCountries = movies.docs.flatMap(movie =>
//                 movie.countries.map(country => country.name)
//             );
//             const uniqueCountries = [...new Set(allCountries)];
//
//             setFilters({
//                 genres: uniqueGenres.map(genre => ({ value: genre, label: genre })),
//                 countries: uniqueCountries.map(country => ({ value: country, label: country })),
//
//             });
//         }
//     }, [movies]);
//
//     return filters;
// };