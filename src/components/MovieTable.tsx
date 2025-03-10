import React, { useState, useEffect, useMemo } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Modal, Box, Typography, TextField } from "@mui/material";
import { fetchMovies } from "../api/api";
import { Movie } from "../types/Movie.Interface";

const MovieTable: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>(() => {
        const savedQuery = localStorage.getItem("searchQuery");
        return savedQuery ? savedQuery : "";
    });
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    const [open, setOpen] = useState(false);

    const [paginationModel, setPaginationModel] = useState({
        pageSize: 5,
        page: 0,
    });

    useEffect(() => {
        fetchMovies()
            .then((data) => {
                setMovies(data);
                localStorage.setItem("movies", JSON.stringify(data));
            })
            .catch((error) => console.error("Failed to fetch movies:", error));
    }, []);

    useEffect(() => {
        localStorage.setItem("searchQuery", searchQuery);
    }, [searchQuery]);

    const filteredMovies = useMemo(() => {
        return movies.filter(movie =>
            movie.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [movies, searchQuery]);

    const columns: GridColDef[] = [
        {
            field: "poster",
            headerName: "Poster",
            width: 120,
            renderCell: (params) => (
                <img
                    src={params.value}
                    alt={params.row.title}
                    style={{ width: 80, height: 'auto', cursor: 'pointer' }}
                    onClick={() => {
                        setSelectedMovie(params.row);
                        setOpen(true);
                    }}
                />
            ),
        },
        { field: "title", headerName: "Title", width: 200 },
        { field: "release_date", headerName: "Release date", width: 150 },
        { field: "rating", headerName: "Rating", width: 100, type: "number" },
        { field: "genres", headerName: "Genres", width: 150 },
    ];

    return (
        <>
            <TextField
                label="Search"
                variant="outlined"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                fullWidth
                sx={{ mb: 2 }}
            />

            <DataGrid
                rows={filteredMovies}
                columns={columns}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                pageSizeOptions={[5, 10, 20, 40]}
                checkboxSelection
                disableRowSelectionOnClick
            />

            <Modal open={open} onClose={() => setOpen(false)}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 2,
                        borderRadius: 2,
                    }}
                >
                    {selectedMovie && (
                        <>
                            <img src={selectedMovie.poster} alt={selectedMovie.title}
                                 style={{ width: '100%', marginBottom: 15 }} />
                            <Typography variant="h6">{selectedMovie.title}</Typography>
                            <Typography>Release date: {selectedMovie.release_date}</Typography>
                            <Typography>Rating: {selectedMovie.rating}</Typography>
                            <Typography>Genres: {selectedMovie.genres}</Typography>
                        </>
                    )}
                </Box>
            </Modal>
        </>
    );
};

export default MovieTable;