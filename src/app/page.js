"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

import { tempMovieData, tempWatchedData } from "@/mocks/movies";
import NavBar from "@/containers/NavBar/NavBar";
import Main from "@/pages/Main";
import { MovieList } from "@/features/movies/components/MovieList";

import Box from "@/components/ui/Box/Box";
import { MediaSummaryStats } from "@/containers/MediaSummaryStats";
import { MediaDetailsList } from "@/containers/MediaDetailsList";
import { Loader } from "@/containers/Loader";
import { ErrorMessage } from "@/containers/ErrorMessage";
import { MediaDetailsCard } from "@/containers/MediaDetailsCard";

const KEY = process.env.NEXT_PUBLIC_API_KEY;



export default function Home() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedId, setSelectedID] = useState(null);
  const QUERY = "gladiator";

  // fetch(
  //   `http://www.omdbapi.com/?apikey=${KEY}&s=interstellar`
  //     .then((res) => res.json())
  //     .then((data) => console.log(data))
  // );

  function handleSelectMovie(id) {
    setSelectedID((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovie() {
    setSelectedID(null);
  }

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        setError("");
        const response = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
        );
        if (!response.ok)
          throw new Error("Something went wrong with fetching movies");

        const data = await response.json();

        if (data.Response === "False") throw new Error("Movie not found");
        setMovies(data.Search);
      } catch (error) {
        console.error("Ошибка:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }
    fetchData();
  }, [query]);

  // useEffect(
  //   function () {
  //     if (!title) return;
  //     document.title = `Movie: | ${title}`;
  //   },
  //   [title]
  // );

  // function Loader() {
  //   return <p className="loader"> LOADING . . . </p>;
  // }



// export default function Home() {
//   return (
//     <main className="min-h-screen bg-black text-white">
//       {/* Header */}
//       <header className="p-4">
//         <div className="container mx-auto">
//           <Image
//             src="/logo.png"
//             alt="GhoukieVerse"
//             width={200}
//             height={50}
//             className="text-green-500"
//           />
//         </div>
//       </header>

//       {/* Hero Section */}
//       <section className="relative h-[300px] mb-12">
//         <div className="absolute inset-0">
//           <Image
//             src="/hero-bg.jpg"
//             alt="Hero background"
//             fill
//             className="object-cover"
//           />
//         </div>
//         <div className="relative container mx-auto h-full flex items-center justify-center">
//           <h1 className="text-3xl font-medium text-center text-white">
//             Твой персональный гид в развлекательном мире
//           </h1>
//         </div>
//       </section>

//       {/* Tracker Section */}
//       <section className="container mx-auto px-4 mb-16">
//         <div className="flex flex-col md:flex-row items-center gap-8">
//           <div className="w-full md:w-1/2">
//             <Image
//               src="/tracker-interface.png"
//               alt="Tracker Interface"
//               width={400}
//               height={400}
//               className="rounded-lg"
//             />
//           </div>
//           <div className="w-full md:w-1/2">
//             <p className="text-xl text-center md:text-left">
//               Добро пожаловать в GHOUKIEVERSE — твой персональный трекер игр, фильмов и аниме.
//               Сохраняй пройденное, планируй к просмотру, открывай новое и делись впечатлениями с
//               комьюнити. Начни сейчас — это бесплатно
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Media Grid Section */}
//       <section className="container mx-auto px-4 mb-16">
//         <h2 className="text-2xl font-medium text-center mb-8">
//           Что посмотрим сегодня?
//         </h2>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           {/* Media Cards */}
//           {[...Array(8)].map((_, index) => (
//             <div
//               key={index}
//               className={`aspect-[2/3] relative rounded-lg overflow-hidden ${
//                 index === 1 ? 'border-2 border-dashed border-gray-600 flex items-center justify-center' : ''
//               }`}
//             >
//               {index === 1 ? (
//                 <span className="text-4xl text-gray-600">+</span>
//               ) : (
//                 <Image
//                   src="/media-card.jpg"
//                   alt="Media card"
//                   fill
//                   className="object-cover"
//                 />
//               )}
//             </div>
//           ))}
//         </div>
//       </section>
//     </main>
//   );
// }

  return (
    <>
      <NavBar movies={movies} query={query} setQuery={setQuery} />
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList
              movies={movies}
              onSelectMovie={handleSelectMovie}
              onCloseMovie={handleCloseMovie}
            />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MediaDetailsCard selectedID={selectedId} />
          ) : (
            <>
              <MediaSummaryStats watched={watched} />
              <MediaDetailsList watched={watched} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
