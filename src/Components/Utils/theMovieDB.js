const key = process.env.REACT_APP_MOVIE_DB_API



export const getAllDetails = async (movie_id) => {

    const string = "https://api.themoviedb.org/3/movie/" + movie_id + "?api_key=" + key
    const allDetails = await fetch(string)
        .then(response => response.json());

    console.log("UTILS", allDetails)
}



