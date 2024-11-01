import axios from 'axios';

const API_KEY = '7066700f'; // Replace with your OMDB API key
const BASE_URL = 'http://www.omdbapi.com/';

export const fetchMovies = async (searchTerm, type, page) => {
    try {
        const response = await axios.get(`${BASE_URL}?s=${searchTerm}&type=${type}&page=${page}&apikey=${API_KEY}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch movies');
    }
};

export const fetchMovieDetails = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}?i=${id}&apikey=${API_KEY}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch movie details');
    }
};