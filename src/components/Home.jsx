// src/components/Home.jsx
import React, { useState } from 'react';
import { fetchMovies } from '../api/movies';
import { Link } from 'react-router-dom';

const Home = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [page, setPage] = useState(1);
    const [type, setType] = useState('movie');

    const handleSearch = async () => {
        setLoading(true);
        setError('');
        try {
            const data = await fetchMovies(searchTerm, type, page);
            if (data.Response === 'True') {
                setMovies(data.Search);
            } else {
                setError(data.Error);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
        handleSearch();
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Movie Search</h1>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for movies..."
                className="border p-2 w-full mb-2"
            />
            <select value={type} onChange={(e) => setType(e.target.value)} className="border p-2 mb-2">
                <option value="movie">Movies</option>
                <option value="series">Series</option>
                <option value="episode">Episode</option>
            </select>
            <button onClick={handleSearch} className="bg-blue-500 text-white p-2 mb-4">Search</button>

            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {movies.length === 0 && !loading && <p>No results found.</p>}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {movies.map(movie => (
                    <div key={movie.imdbID} className="border p-2">
                        <Link to={`/movie/${movie.imdbID}`}>
                            <img src={movie.Poster} alt={movie.Title} className="w-full h-auto" />
                            <h2 className="font-semibold">{movie.Title}</h2>
                            <p>{movie.Year}</p>
                        </Link>
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-between mt-4">
                <button onClick={() => handlePageChange(page - 1)} disabled={page === 1} className="bg-gray-300 p-2">Previous</button>
                <button onClick={() => handlePageChange(page + 1)} className="bg-gray-300 p-2">Next</button>
            </div>
        </div>
    );
};

export default Home;