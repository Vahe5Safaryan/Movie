import {Genre} from "../types/Genre.interface";
import {Movie} from "../types/Movie.Interface";

const apiKey = process.env.REACT_APP_API_KEY;
const baseUrl = process.env.REACT_APP_API_BASE_URL;

export const fetchGenres = async (): Promise<Genre[]> => {
    const url = `${baseUrl}/genre/movie/list?api_key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.genres;
    } catch (error) {
        console.error("Error while fetching Genres:", error);
        throw error;
    }
};

export const fetchMovies = async (): Promise<Movie[]> => {
    const url = `${baseUrl}/movie/popular?api_key=${apiKey}&page=3`;

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

        return moviesData.results.map((movie: any) => ({
            id: movie.id,
            poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            title: movie.title,
            release_date: movie.release_date,
            rating: movie.vote_average,
            genres: movie.genre_ids.map((id: number) => genreMap[id]).join(", "),
        }));
    } catch (error) {
        console.error("Error while fetching Movies:", error);
        throw error;
    }
};