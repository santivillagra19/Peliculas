import './App.css'
import { Movies } from './components/Movies'
import { useEffect, useState, useRef, useCallback } from 'react';
import { useMovies } from './hooks/useMovies'
import debounce from "just-debounce-it";

function useSearch() {
  const [search, updateSearch] = useState('');
  const [error, setError] = useState(null);
  const isFirstInput = useRef(true);

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }

    if (search === '') {
      setError('No se puede buscar una pelicula vacía');
      return
    }

    if (search.match(/^\d+$/)) {
      setError('No se puede buscar una pelicula con un numero');
      return
    }

    if (search.length < 2) {
      setError('La busqueda debe tener al menos 2 caracteres');
      return
    }

    setError(null)
  }, [search])

  return { search, updateSearch, error }
}


function App() {
  const [sort, setSort] = useState(false);
  const { search, updateSearch, error } = useSearch();
  const { movies, getMovies, loading } = useMovies({ search, sort })

  const debounceGetMovies = useCallback(
    debounce(search => {
      getMovies({ search })
    }, 300)
    , [getMovies]
  )

  const handleSubmit = (event) => {
    event.preventDefault();
    getMovies({ search });
  }

  const handleSort = () => {
    setSort(!sort);
  }

  const handleChange = (event) => {
    const newSearch = event.target.value;
    updateSearch(newSearch)
    debounceGetMovies(newSearch)
  }


  return (
    <>
      <div className='page'>

        <header>
          <h1>Buscador de Películas</h1>

          <form action="" className='form' onSubmit={handleSubmit}>
            <input onChange={handleChange} value={search} name='query' type='text' placeholder='Search' />
            <input type="checkbox" checked={sort} onChange={handleSort} />
            <button type='submit'>Buscar</button>
          </form>

          {error && <p style={{ color: 'red' }}>{error}</p>}
        </header>
        <main>

          {
            loading ? <p>Cargando...</p> : <Movies movies={movies}></Movies>
          }

        </main>
      </div>

    </>
  )
}


export default App
