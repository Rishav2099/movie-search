"use client";

import React from "react";

interface MovieDetailsProps {
  movie: any;
  providers: any[];
  movieId: string;
  cast: any[];
}

async function getMovieTrailer(id: string) {
  const movieRes = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/videos`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!movieRes.ok) {
    throw new Error("Failed to fetch movie trailer");
  }

  const movieTrailer = await movieRes.json();

  const trailer = movieTrailer.results.find(
    (vid: any) => vid.type === "Trailer" && vid.site === "YouTube"
  );

  return trailer ? trailer.key : null;
}

export default function MovieDetails({
  movie,
  providers,
  movieId,
  cast,
}: MovieDetailsProps) {
  const handleWatchTrailer = async () => {
    try {
      const videoKey = await getMovieTrailer(movieId);
      if (videoKey) {
        window.open(`https://www.youtube.com/watch?v=${videoKey}`, "_blank");
      } else {
        alert("Trailer not available!");
      }
    } catch (error) {
      console.error("Error fetching trailer:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-5 space-y-6">
    <h1 className="text-5xl font-bold text-amber-400 drop-shadow-lg">{movie.title}</h1>
  
    {/* Movie Poster */}
    <div className="relative">
      <img
        className="w-full max-w-md rounded-xl shadow-xl border border-gray-700"
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
    </div>
  
    {/* Movie Overview */}
    <p className="mt-4 text-lg max-w-3xl text-gray-300 text-center leading-relaxed bg-gray-800 p-4 rounded-lg shadow-md">
      {movie.overview}
    </p>
  
    {/* Movie Info */}
    <div className="flex flex-wrap gap-6 justify-center text-gray-400 text-lg bg-gray-800 p-4 rounded-lg shadow-lg">
      <p>📅 <span className="text-white">{movie.release_date}</span></p>
      <p>🎬 <span className="text-white">{movie.runtime} min</span></p>
      <p>⭐ <span className="text-white">{movie.vote_average}/10</span></p>
    </div>
  
    {/* Watch Trailer Button */}
    <button
      onClick={handleWatchTrailer}
      className="mt-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold px-5 py-2 rounded-lg shadow-lg hover:scale-105 transition-transform"
    >
      🎥 Watch Trailer
    </button>
  
    {/* Genres */}
    <div className="mt-5">
      <h3 className="text-2xl font-semibold text-amber-400">Genres</h3>
      <div className="flex gap-3 mt-3">
        {movie.genres.map((genre: { id: React.Key | null | undefined; name: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }) => (
          <span key={genre.id} className="bg-gray-700 px-4 py-2 rounded-full text-sm font-medium text-white">
            {genre.name}
          </span>
        ))}
      </div>
    </div>
  
    {/* Cast Section */}
    <div className="mt-5 w-full max-w-4xl">
      <h3 className="text-2xl font-semibold text-amber-400">Cast</h3>
      <div className="flex gap-4 overflow-x-auto py-3 px-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900 rounded-lg bg-gray-800 shadow-lg">
        {cast.map((actor) => (
          <div key={actor.id} className="flex flex-col items-center min-w-[120px]">
            {actor.profile_path && (
              <img
                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                alt={actor.name}
                className="w-24 h-24 object-cover rounded-full border border-gray-600 shadow-md"
              />
            )}
            <span className="text-sm text-gray-300 mt-1 text-center">{actor.name}</span>
          </div>
        ))}
      </div>
    </div>
  
    {/* Budget & Revenue */}
    {movie.budget !== null && movie.revenue !== null && (
      <div className="mt-5 bg-gray-800 p-4 rounded-lg shadow-md text-gray-300 text-center max-w-lg">
        <h3 className="text-2xl font-semibold text-amber-400">Financials</h3>
        <p>💰 Budget: {movie.budget > 0 ? `$${new Intl.NumberFormat("en-US").format(movie.budget)}` : "N/A"}</p>
        <p>📈 Revenue: {movie.revenue > 0 ? `$${new Intl.NumberFormat("en-US").format(movie.revenue)}` : "N/A"}</p>
      </div>
    )}
  
    {/* Production Companies */}
    <div className="mt-5">
      <h3 className="text-2xl font-semibold text-amber-400">Production Companies</h3>
      <div className="flex flex-wrap gap-4 mt-3 justify-center">
        {movie.production_companies.map((company: { id: React.Key | null | undefined; logo_path: any; name: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }) => (
          <div key={company.id} className="flex flex-col items-center">
            {company.logo_path && (
              <img
                src={`https://image.tmdb.org/t/p/w92${company.logo_path}`}
                alt={'company.name'}
                className="w-16 h-16 rounded-lg border border-gray-600 shadow-md"
              />
            )}
            <p className="text-sm text-gray-300 mt-1">{company.name}</p>
          </div>
        ))}
      </div>
    </div>
  
    {/* Watch Providers */}
    {providers.length > 0 && (
      <div className="mt-5">
        <h3 className="text-2xl font-semibold text-amber-400">Available On</h3>
        <div className="flex flex-wrap gap-4 justify-center mt-3 bg-gray-800 p-4 rounded-lg shadow-lg">
          {providers.map((provider) => (
            <div key={provider.provider_id} className="flex flex-col items-center">
              <img
                src={`https://image.tmdb.org/t/p/w92${provider.logo_path}`}
                alt={provider.provider_name}
                className="w-16 h-16 rounded-lg border border-gray-600 shadow-md"
              />
              <p className="text-sm text-gray-300 mt-1">{provider.provider_name}</p>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
  
  );
}
