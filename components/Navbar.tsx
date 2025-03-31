'use client'

import React, { FormEvent, useState } from "react";
import { Movie } from "@/types";
import { Dispatch, SetStateAction } from "react";

interface NavbarProps {
  setMovies: Dispatch<SetStateAction<Movie[]>>;
}

const Navbar = ({ setMovies }: NavbarProps) => {
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (query.length === 0) {
      return setError('⚠️ Please enter a movie name');
    }

    const res = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      return setError("❌ Failed to fetch movies. Please try again.");
    }

    const data = await res.json();
    setMovies(data.results || []);
    setError('');
  };

  return (
    <div className="w-full border-b border-gray-700 bg-black py-4 flex justify-center">
      <form onSubmit={handleSubmit} className="flex items-center gap-3">
        <input
          type="text"
          value={query}
          className="border-2 border-gray-600 bg-gray-800 text-white text-lg px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-red-700 caret-red-500"
          placeholder="🔍 Search for a movie..."
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="bg-red-700 hover:bg-red-600 text-white px-5 py-2 rounded-full font-semibold transition duration-300"
          type="submit"
        >
          Search
        </button>
      </form>

      {error && <p className="text-red-500 mt-2 text-sm font-medium">{error}</p>}
    </div>
  );
};

export default Navbar;