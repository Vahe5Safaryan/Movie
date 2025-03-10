import React, { useState, useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { Modal, Box, Button, Typography } from "@mui/material";
import { fetchMovies } from "../api/api";
import {Movie} from "../types/Movie.Interface";
import useTheme from "../hooks/useTheme";

const MovieTable: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);

    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

    const [open, setOpen] = useState(false);
    const [paginationModel, setPaginationModel] = useState({
        pageSize: 5,
        page: 0,
    });

    useEffect(() => {
        fetchMovies()
            .then(setMovies)
            .catch((error) => console.error("Failed to fetch movies:", error));
    }, []);

    const columns: GridColDef[] = [
        {
            field: "poster",
            headerName: "Poster",
            width: 120,
            renderCell: (params) => (
                <img
                    src={params.value}
                    alt="Movie Poster"
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

    const [theme, darkMode, toggleDarkMode] = useTheme();

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div style={{ padding: 15 }}>
                <Button
                    style={{ margin: 15 }}
                    variant="contained"
                    color="primary"
                    onClick={toggleDarkMode}
                >
                    {darkMode ? "LIGHT MODE" : "DARK MODE"}
                </Button>

                <DataGrid
                    rows={movies}
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
                                <img src={selectedMovie.poster} alt={selectedMovie.title} style={{ width: '100%', marginBottom: 15 }} />
                                <Typography variant="h6">{selectedMovie.title}</Typography>
                                <Typography>Release date: {selectedMovie.release_date}</Typography>
                                <Typography>Rating: {selectedMovie.rating}</Typography>
                                <Typography>Genres: {selectedMovie.genres}</Typography>
                            </>
                        )}
                    </Box>
                </Modal>
            </div>
        </ThemeProvider>
    );
};

export default MovieTable;