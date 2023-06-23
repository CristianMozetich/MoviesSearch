import {useState, useEffect} from 'react'
import './Netflix.css'

const Netflix = () => {
    const [peliculas, setpeliculas] = useState([]);
    const [busqueda, setbusqueda] = useState("");
    
    const apiKey = "3ccba42e";

    useEffect(()=>{
        fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${busqueda}`)
        .then (resp => resp.json())
        .then (data => setpeliculas(data.Search))
        .catch(error => console.log(error))
    },[busqueda]);

    const handleclick = (event)=>{
        event.preventDefault()
        setbusqueda(event.target.busqueda.value)

    }

  return (
    <div className="principal">
        <h1 className="title text-center">Fridays Movies</h1>
        <form className="search-form text-center" onSubmit={handleclick}>
            <input type="text" name="busqueda" className="search-input"/>
            <br />
            <br />
            <button type="submit" className="search-button">Buscar</button>
        </form>
        <ul className='movie-list d-flex flex-wrap justify-content-center'>
            {
                peliculas === undefined ? <h2 className='adicional'>La pelicula no esta disponible</h2> : peliculas.map(peli =>
                (<li key={peli.imdbID} className='movie-item m-2 d-flex flex-column'>
                    <img src={peli.Poster} className="movie-poster" />
                    <h5 className="movie-title">{peli.Title}</h5>
                </li>))
            }
        </ul>
      
    </div>
  )
}

export default Netflix
