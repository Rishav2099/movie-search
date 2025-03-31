import MovieDetails from "@/components/MovieDetails";

async function getMovieDetails(id: string) {
  const movieRes = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
  });

  const providersRes = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/watch/providers`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );

  const castRes = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!movieRes.ok || !providersRes.ok || !castRes.ok) {
    throw new Error("Failed to fetch movie details");
  }

  const movie = await movieRes.json();
  const providersData = await providersRes.json();
  const castData = await castRes.json();

  return {
    movie,
    providers: providersData.results?.IN?.flatrate || [],
    cast: castData?.cast || [],
  };
}

export default async function MoviePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; // Await params and destructure id
  const { movie, providers, cast } = await getMovieDetails(id);

  return <MovieDetails movie={movie} providers={providers} cast={cast} movieId={id} />;
}