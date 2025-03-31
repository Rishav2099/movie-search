'use client'

import MoviesDisplay from "@/components/MoviesDisplay";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";

export default function Home() {

  const [movies , setMovies ] = useState<any[]>([])

  useEffect(() => {
    const fetchDefaultMovies = async () => {
      const res = await fetch(`https://api.themoviedb.org/3/movie/popular`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`, // Bearer Token
          "Content-Type": "application/json",
        },
      });

      const data = await res.json()
      setMovies(data.results || [])
    };

    fetchDefaultMovies()
  }, [])
  

  return (
   <div className="bg-black text-white">
    <Navbar setMovies={setMovies} />
    <MoviesDisplay movies={movies} />
   </div>
  );
}
