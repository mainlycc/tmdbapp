// app/page.tsx
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

// Dodajemy funkcję do pobierania filmów
async function getMovies(timeWindow: string): Promise<Movie[]> {
  try {
    let endpoint = '';
    switch (timeWindow) {
      case 'day':
        endpoint = 'trending/movie/day';
        break;
      case 'week':
        endpoint = 'trending/movie/week';
        break;
      default:
        endpoint = 'movie/popular';
    }

    const response = await axios.get(`https://api.themoviedb.org/3/${endpoint}`, {
      params: {
        api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
        language: 'pl-PL',
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Błąd podczas pobierania danych:', error);
    return [];
  }
}

// Popraw definicję interfejsu props
interface MoviePageProps {
  params: {
    id: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

// Zaktualizuj sygnaturę komponentu
export default async function MoviePage({ params, searchParams }: MoviePageProps) {
  // ... reszta kodu ...
}
