const base = 'https://api.themoviedb.org/3';
export const ConfigService = {
    themoviedb: {
        urls: {
            discover: `${base}/discover/movie`,
            movie: `${base}/movie/`,
            search: `${base}/search/movie`,
        },
        keys: {
            API_TOKEN: process.env.API_TOKEN,
            API_KEY: process.env.API_KEY,
            API_AUTH: "Bearer " + process.env.API_TOKEN,
        }
    }
}