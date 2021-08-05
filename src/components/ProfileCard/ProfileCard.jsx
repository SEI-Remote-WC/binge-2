import React from 'react'

const ProfileCard = ({ profile, user, userProfile, handleAddFriend, handleRemoveFriend }) => {
  return (
    <>
      <h4>{profile.name}</h4>
      { !(userProfile?._id === profile._id) && !(userProfile?.friends?.includes(profile._id)) &&
      <button onClick={() => handleAddFriend(profile._id)}>Befriend {profile.name}</button> 
      }
      { !(userProfile?._id === profile._id) && (userProfile?.friends?.includes(profile._id)) &&
      <button onClick={() => handleRemoveFriend(profile._id)}>Defriend {profile.name}</button> 
      }     
    </>
  );
}
 
export default ProfileCard;