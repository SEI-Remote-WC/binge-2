import React from 'react'

const MovieCard = ({ movie }) => {
  return (
    <>
      <a href={'/movies/' + movie.id}><img src={"https://image.tmdb.org/t/p/w500/" + movie.backdrop_path} alt="backdrop" />
      <p>{movie.title}</p></a>
      <img src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path} alt="poster" />
      <p>{movie.release_date}</p>
      <p>{movie.overview}</p>
    </>
  );
}
 
export default MovieCard;