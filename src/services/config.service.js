const base = 'https://api.themoviedb.org/3';
export const ConfigService = {
    themoviedb: {
        urls: {
            discover: `${base}/discover/movie`,
            movie: `${base}/movie/`,
        },
        keys: {
            API_TOKEN: "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYzkyZWJhNzIzZjAxYjM2OTAyZTY5ZTY0YjRiZmNhOSIsInN1YiI6IjY1ZTliNzRkZDEwMGI2MDE4NTRjY2FiNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.epD96id2N2V81Tz6WpEsAh6bIhVsmsh4-_OywNHt6VA",
            API_KEY: "ac92eba723f01b36902e69e64b4bfca9",
            API_AUTH: "Bearer " + "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYzkyZWJhNzIzZjAxYjM2OTAyZTY5ZTY0YjRiZmNhOSIsInN1YiI6IjY1ZTliNzRkZDEwMGI2MDE4NTRjY2FiNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.epD96id2N2V81Tz6WpEsAh6bIhVsmsh4-_OywNHt6VA"
        }
    }
}