export interface Movie {
    id: number;
    poster: string;
    title: string;
    release_date: string;
    rating: number;
    genres: string;
}

export interface Genre {
    id: number;
    name: string;
}

const apiKey = "1be86dc7b91cb6a46c1a3868d35979b4";

export const fetchGenres = async (): Promise<Genre[]> => {
    const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.genres;
    } catch (error) {
        console.error("Ошибка при загрузке жанров:", error);
        throw error;
    }
};

export const fetchMovies = async (): Promise<Movie[]> => {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=3`;

    try {
        const [moviesResponse, genres] = await Promise.all([
            fetch(url),
            fetchGenres(),
        ]);

        const moviesData = await moviesResponse.json();

        const genreMap = genres.reduce((map: Record<number, string>, genre) => {
            map[genre.id] = genre.name;
            return map;
        }, {});

        const movies: Movie[] = moviesData.results.map((movie: any) => ({
            id: movie.id,
            poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            title: movie.title,
            release_date: movie.release_date,
            rating: movie.vote_average,
            genres: movie.genre_ids.map((id: number) => genreMap[id]).join(", "),
        }));

        return movies;
    } catch (error) {
        console.error("Ошибка при загрузке фильмов:", error);
        throw error;
    }
};