// src/components/MovieDetails.jsx
import React, { useEffect, useState } from 'react';
import { fetchMovieDetails } from '../api/movies';
import { useParams } from 'react-router-dom';

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [favorites, setFavorites] = useState(() => {
        return JSON.parse(localStorage.getItem('favorites')) || [];
    });

    useEffect(() => {
        const getMovieDetails = async () => {
            try {
                const data = await fetchMovieDetails(id);
                if (data.Response === 'True') {
                    setMovie(data);
                } else {
                    setError(data.Error);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        getMovieDetails();
    }, [id]);

    const handleFavoriteToggle = () => {
        if (favorites.includes(movie.imdbID)) {
            setFavorites(favorites.filter(fav => fav !== movie.imdbID));
        } else {
            setFavorites([...favorites, movie.imdbID]);
        }
        localStorage.setItem('favorites', JSON.stringify(favorites));
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!movie) return null;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">{movie.Title} ({movie.Year})</h1>
            <img src={movie.Poster} alt={movie.Title} className="w-full h-auto mb-4" />
            <p><strong>Genre:</strong> {movie.Genre}</p>
            <p><strong>Plot:</strong> {movie.Plot}</p>
            <p><strong>Ratings:</strong> {movie.Ratings.map(r => `${r.Source}: ${r.Value}`).join(', ')}</p>
            <p><strong>Cast:</strong> {movie.Actors}</p>
            <button onClick={handleFavoriteToggle} className="mt-4 bg-blue-500 text-white p-2">
                {favorites.includes(movie.imdbID) ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
        </div>
    );
};

export default MovieDetails;