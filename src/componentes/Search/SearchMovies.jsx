import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';  
import "./estilo.css";
import logo from "/vscode/clone-netflix/netflix/src/assets/logo.png";

function Movies() {
  const [genres, setGenres] = useState([]);
  const [moviesByGenre, setMoviesByGenre] = useState({});
  const [selectedMovie, setSelectedMovie] = useState();
  const carrouselRefs = useRef([]);
  const navigate = useNavigate();  

  useEffect(() => {
    fetchGenres();
  }, []);

  function fetchGenres() {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYjk0YjIxYTk2Yzk2NTNkNmIyNzQyOTk3NWYxMzVmYyIsIm5iZiI6MTcyMzkxNTM5Ni4yMjk3NTksInN1YiI6IjY2YzBkYzI0OTk5ZmYwYTFjNTE2YWJlYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iDJlCrfeWekoLcduT2xlDmJJ8sjBEHgBoeMsdd8lN20'
      }
    };

    fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
      .then(response => response.json())
      .then(response => {
        console.log('Genres:', response.genres);
        setGenres(response.genres);
        response.genres.forEach(genre => {
          fetchMoviesByGenre(genre.id);
        });
      })
      .catch(err => console.error(err));
  }

  function fetchMoviesByGenre(genreId) {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYjk0YjIxYTk2Yzk2NTNkNmIyNzQyOTk3NWYxMzVmYyIsIm5iZiI6MTcyMzkxNTM5Ni4yMjk3NTksInN1YiI6IjY2YzBkYzI0OTk5ZmYwYTFjNTE2YWJlYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iDJlCrfeWekoLcduT2xlDmJJ8sjBEHgBoeMsdd8lN20'
      }
    };

    fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&language=en-US&page=1`, options)
      .then(response => response.json())
      .then(response => {
        setMoviesByGenre(prevState => ({
          ...prevState,
          [genreId]: response.results
        }));
      })
      .catch(err => console.error(err));
  }

  function handleMovieClick(movie) {
    setSelectedMovie(movie);
  }

  function closeModal() {
    setSelectedMovie(null);
  }

  function scroll(index, direction) {
    const container = carrouselRefs.current[index];
    const scrollAmount = container.clientWidth * 0.8;
    container.scrollBy({
      left: scrollAmount * direction,
      behavior: 'smooth'
    });
  }

  function handleSignInClick() {
    navigate('/login'); 
  }

  return (
    <main className="background header">
      <title>Filmes | Netflix Official Site</title>
      <header className='headerM'>
        <img src={logo} alt="netflix" />
        <div>
          <a>UNLIMITED TV SHOWS & MOVIES</a>
          <button>Join Now</button>
          <button className="entrar" onClick={handleSignInClick}>Sign in</button>  {/* Adicionando onClick para redirecionar */}
        </div>
      </header>
      <section className="background main">
        <div className="filho-p-b">
          <h1>Movies</h1>
          <span>Scary, funny, dramatic, romantic... Nothing like a movie to stir our emotions! There is no shortage of paths and experiences waiting for you</span>
        </div>

        {genres.map((genre, index) => (
          <div className="Carrousel" key={genre.id}>
            <span className="Carrousel-title">{genre.name}</span>
            <div className="Carrousel-flex" ref={el => carrouselRefs.current[index] = el}>
              {moviesByGenre[genre.id]?.map((movie) => (
                <div className="Carrousel-content" key={movie.id} onClick={() => handleMovieClick(movie)}>
                  <img
                    className="Content"
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.original_title}
                  />
                  <span className="Content-span">{movie.original_title}</span>
                </div>
              ))}
            </div>
            <button className="arrow" onClick={() => scroll(index, -1)}>{"<"}</button>
            <button className="arrow" onClick={() => scroll(index, 1)}>{">"}</button>
          </div>
        ))}

        {selectedMovie && (
          <div className="modal" onClick={closeModal}>
            <div className='modal-box'>
              <div className="modal-content" onClick={e => e.stopPropagation()}>
                <span className="close" onClick={closeModal}>&times;</span>
                <div className='modal-foto'>
                  <h2>{selectedMovie.title}</h2>
                  <img
                    className="Content "
                    src={`https://image.tmdb.org/t/p/w500/${selectedMovie.poster_path}`}
                    alt={selectedMovie.original_title}
                  />
                </div>
              </div>
              <div className='modal-p'>
                <p className='resumo'>{selectedMovie.overview}</p>
                <p><strong>Release Date:</strong> {selectedMovie.release_date}</p>
                <p><strong>Rating:</strong> {selectedMovie.vote_average}</p>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

export default Movies;
