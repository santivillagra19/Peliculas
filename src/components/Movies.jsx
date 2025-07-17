export function ListMovies({ movies }) {
    return (
        <ul className="movies">
            {movies.map(movie => (
                <li className="movie" key={movie.id}>
                    <h3>{movie.title}</h3>
                    <p>{movie.year}</p>
                    <img src={movie.poster} alt={movie.title} />
                </li>
            ))}
        </ul>
    )
}

export function NoMoviesResults() {
    return (
        <div className='no-results'>
            <p>No se encontraron resultados</p>
        </div>
    );
}

export function Movies({ movies }) {
    const hasMovies = movies?.length > 0;

    return (
        hasMovies
            ? <ListMovies movies={movies} />
            : <NoMoviesResults />
    )
}