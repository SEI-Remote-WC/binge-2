import React from 'react'
import * as movieGenreLookup from '../../services/genreLookup'

const MovieCard = ({ movie }) => {
  return (
    <>
      <a href={'/movies/' + movie.id}><img src={"https://image.tmdb.org/t/p/w500/" + movie.backdrop_path} alt="backdrop" />
      <p>{movie.title}</p></a>
      <img src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path} alt="poster" />
      <p>{movie.release_date}</p>
      <p>{movie.overview}</p>
      <h4>Genres:</h4>
      {movie.genre_ids?.map((genre, idx) => 
        <a key={idx} href={`/search/movies/genre/${genre}`}>
          <p key={idx}>{movieGenreLookup.identifyMovieGenre(genre)}</p>
        </a>
      )}
    </>
  );
}
 
export default MovieCard;