'use client'

import React from "react";
import { useRouter } from "next/navigation";

const MoviesDisplay = ({ movies }: { movies: any[] }) => {
  const router = useRouter();

  return (
    <div className="mt-8 px-6">
      <h1 className="text-4xl font-extrabold text-center text-amber-400 drop-shadow-lg">
        🎬 Trending Movies
      </h1>
      <div className="flex flex-wrap items-center justify-center gap-6 mt-6">
        {movies.length === 0 ? (
          <p className="text-center w-full text-lg text-gray-400">
            No movies found
          </p>
        ) : (
          movies.map((movie) => (
            <div
              key={movie.id}
              onClick={() => router.push(`/movie/${movie.id}`)}
              className="relative w-[90%] sm:w-[48%] lg:w-[22%] cursor-pointer border border-gray-700 p-3 rounded-lg shadow-lg 
              bg-gray-800 bg-opacity-75 backdrop-blur-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out"
            >
              <div className="overflow-hidden rounded-lg">
                <img
                  className="w-full h-auto max-h-[350px] object-cover rounded-lg hover:opacity-90 transition-opacity duration-300"
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
              </div>
              <h2 className="font-bold text-lg mt-2 text-center text-white line-clamp-2">
                {movie.title}
              </h2>
              <p className="text-center text-gray-400 text-sm mt-1">
                📅 {movie.release_date ? movie.release_date : "Coming Soon"}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MoviesDisplay;
