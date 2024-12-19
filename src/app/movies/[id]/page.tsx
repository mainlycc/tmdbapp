import { CommentSection } from '@/components/comment-section';
import axios from 'axios';
import Image from 'next/image';

// Importujemy typy z Next.js
import { Metadata } from 'next';

interface MovieDetails {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  runtime: number;
  director?: string;
  vote_average: number;
  genres: Array<{ id: number; name: string }>;
  watchProviders?: {
    flatrate?: Array<{ provider_name: string; logo_path: string }>;
    rent?: Array<{ provider_name: string; logo_path: string }>;
    buy?: Array<{ provider_name: string; logo_path: string }>;
  };
}

async function getMovieDetails(id: string): Promise<MovieDetails> {
  const [movieResponse, creditsResponse, watchProvidersResponse] = await Promise.all([
    axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
      params: {
        api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
        language: 'pl-PL',
      },
    }),
    axios.get(`https://api.themoviedb.org/3/movie/${id}/credits`, {
      params: {
        api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
        language: 'pl-PL',
      },
    }),
    axios.get(`https://api.themoviedb.org/3/movie/${id}/watch/providers`, {
      params: {
        api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
      },
    }),
  ]);

  const director = creditsResponse.data.crew.find((person: any) => person.job === 'Director');
  const watchProviders = watchProvidersResponse.data.results.PL || {};

  return {
    ...movieResponse.data,
    director: director?.name,
    watchProviders: {
      flatrate: watchProviders.flatrate || [],
      rent: watchProviders.rent || [],
      buy: watchProviders.buy || [],
    },
  };
}

interface MoviePageProps {
  params: { id: string };
}

export default async function MoviePage({
  params,
}: MoviePageProps) {
  const movie = await getMovieDetails(params.id);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-black to-red-950 pt-24 pb-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-500/30 via-transparent to-transparent" />
      
      <div className="max-w-4xl mx-auto relative">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="relative w-full md:w-1/3 aspect-[2/3]">
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              fill
              className="rounded-lg object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
            <div className="space-y-4">
              <p className="text-gray-300">{movie.overview}</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400">Reżyser</p>
                  <p>{movie.director || 'Brak danych'}</p>
                </div>
                <div>
                  <p className="text-gray-400">Data premiery</p>
                  <p>{new Date(movie.release_date).toLocaleDateString('pl-PL')}</p>
                </div>
                <div>
                  <p className="text-gray-400">Czas trwania</p>
                  <p>{movie.runtime} min</p>
                </div>
                <div>
                  <p className="text-gray-400">Ocena</p>
                  <p>{movie.vote_average.toFixed(1)}/10</p>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-400">Gatunki</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {movie.genres.map((genre) => (
                      <span 
                        key={genre.id}
                        className="px-3 py-1 bg-red-900/50 rounded-full text-sm"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sekcja platform streamingowych */}
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-4">Gdzie obejrzeć</h2>
                
                {movie.watchProviders?.flatrate?.length ? (
                  <div className="mb-4">
                    <p className="text-gray-400 mb-2">Dostępne w subskrypcji:</p>
                    <div className="flex gap-4 flex-wrap">
                      {movie.watchProviders.flatrate.map((provider) => (
                        <div key={provider.provider_name} className="flex items-center gap-2">
                          <Image
                            src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                            alt={provider.provider_name}
                            width={40}
                            height={40}
                            className="rounded-lg"
                          />
                          <span>{provider.provider_name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}

                {movie.watchProviders?.rent?.length ? (
                  <div className="mb-4">
                    <p className="text-gray-400 mb-2">Dostępne do wypożyczenia:</p>
                    <div className="flex gap-4 flex-wrap">
                      {movie.watchProviders.rent.map((provider) => (
                        <div key={provider.provider_name} className="flex items-center gap-2">
                          <Image
                            src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                            alt={provider.provider_name}
                            width={40}
                            height={40}
                            className="rounded-lg"
                          />
                          <span>{provider.provider_name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}

                {!movie.watchProviders?.flatrate?.length && 
                 !movie.watchProviders?.rent?.length && (
                  <p className="text-gray-400">
                    Film obecnie nie jest dostępny na żadnej platformie streamingowej w Polsce.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Opcjonalnie, jeśli potrzebujesz metadanych
export async function generateMetadata({ params }: MoviePageProps): Promise<Metadata> {
  const movie = await getMovieDetails(params.id);
  return {
    title: movie.title,
    description: movie.overview,
  };
}