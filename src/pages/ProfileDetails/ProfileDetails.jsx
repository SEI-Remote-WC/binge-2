import React from 'react'
import { Link } from 'react-router-dom'


const ProfileDetails = ({ location, userProfile, handleAddFriend, handleRemoveFriend }) => {
  const tvs = location.state.profile.media.filter(media => media.type === 'tv')
  const movies = location.state.profile.media.filter(media => media.type === 'movie')
  const profile = location.state.profile
  return (
    <>
      <h1>{location.state.profile.name}'s Deets</h1>
      { !(userProfile?._id === profile._id) && !(userProfile?.friends?.includes(profile._id)) &&
      <button onClick={() => handleAddFriend(profile._id, location.state.profile)}>Befriend {profile.name}</button> 
    }
      { !(userProfile?._id === profile._id) && (userProfile?.friends?.includes(profile._id)) &&
      <button onClick={() => handleRemoveFriend(profile._id, location.state.profile)}>Defriend {profile.name}</button> 
    }     
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
 
