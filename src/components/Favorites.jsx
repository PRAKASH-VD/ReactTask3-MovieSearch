// src/components/Favorites.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Favorites = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Favorites</h1>
            {favorites.length === 0 ? (
                <p>No favorites added yet.</p>
            ) : (
                <ul>
                    {favorites.map(id => (
                        <li key={id}>
                            <Link to={`/movie/${id}`} className="text-blue-500">{id}</Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Favorites;