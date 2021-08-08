import React from 'react'
import { Link } from 'react-router-dom'


const ProfileDetails = ({ location }) => {
  const tvs = location.state.profile.media.filter(media => media.type === 'tv')
  const movies = location.state.profile.media.filter(media => media.type === 'movie')

  return (
    <>
      <h1>{location.state.profile.name}'s Deets</h1>
      <h2>Friends</h2>
      {location.state.profile.friends.map(profile => 
        <Link
          to={{
            pathname: '/profile',
            state: {profile}
          }}
        >
          <h3>{profile.name}</h3>
        </Link>
      )}
      <h2>TV Shows</h2>
      {tvs.map(tv => 
        <h3>{tv.title}</h3>
      )}
      <h2>Movies</h2>
      {movies.map(movie => 
        <h3>{movie.title}</h3>
      )}
    </>
  );
}
 
export default ProfileDetails;
 
