import React from 'react'

const TvCard = ({ tv }) => {
  return (
    <>
      <a href={'/tvs/' + tv.id}><img src={`https://image.tmdb.org/t/p/w500/${tv.backdrop_path}`} alt="backdrop" />
      <p>{tv.name}</p></a>
      <img src={`https://image.tmdb.org/t/p/w500/${tv.poster_path}`} alt="poster" />
      <p>{tv.first_air_date}</p>
      <p>{tv.id}</p>
      <p>{tv.overview}</p>
    </>
  );
}
 
export default TvCard;