import { searchMovies } from '../services/movies.service';
import { useCallback, useRef, useState } from 'react';
import { useMemo } from 'react';

export function useMovies({ search, sort }) {
    const [movies, setMovies] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const previousSearch = useRef(search);

    const getMovies = useCallback(async ({ search }) => {
        if (search === previousSearch.current) return;

        try {
            setLoading(true)
            setError(null)
            previousSearch.current = search;
            const newMovies = await searchMovies({ search });
            setMovies(newMovies);

        } catch (e) {
            setError(e.message)

        } finally {
            setLoading(false)
        }

    }, [])

    const sortedMovies = useMemo(() => {
        return sort
            ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
            : movies;

    }, [sort, movies])

    return { movies: sortedMovies, getMovies, loading, error };
}
