const key = process.env.REACT_APP_MOVIE_DB_API

export const posterSrcDefault = "https://image.tmdb.org/t/p/w500/"
export const posterSrcSm = "https://image.tmdb.org/t/p/w185/"

export const getAllDetails = (movie_id) => {

    const string = "https://api.themoviedb.org/3/movie/" + movie_id + "?api_key=" + key
    const allDetails = fetch(string)
        .then(response => response.json());
}



