

export const searchMovies = async ({ search }) => {
    if (search === '') return;

    if (search) {
        try {
            const res = await fetch(`http://omdbapi.com/?apikey=846122e8&s=${search}`);
            const json = await res.json();

            const movies = json.Search;

            return movies?.map(movie => ({
                id: movie.imdbID,
                title: movie.Title,
                year: movie.Year,
                poster: movie.Poster,
            }));

        } catch (e) {
            throw new Error('Error searching movies');
        }
    }
}
