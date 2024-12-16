import axios from 'axios';

const axiosInstance = axios.create({
    headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TMDB_TOKEN}`,
    },
    baseURL: process.env.REACT_APP_MOVIE_API_URL,
})

export {axiosInstance};