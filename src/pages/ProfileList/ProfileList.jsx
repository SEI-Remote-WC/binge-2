import React, { Component } from "react"
import { getAllProfiles } from "../../services/profileService"
import ProfileCard from '../../components/ProfileCard/ProfileCard'

class ProfileList extends Component {
  state = {
    profiles: [],
  }

  handleRefreshProfiles = async () => {
    const profiles = await getAllProfiles()
    this.setState({ profiles })
  }

  handleAddFriend = async (id, profile) => {
    await this.props.handleAddFriend(id, profile)
    const profiles = await getAllProfiles()
    this.setState({ profiles })
  }

  handleRemoveFriend = async (id, profile) => {
    await this.props.handleRemoveFriend(id, profile)
    const profiles = await getAllProfiles()
    this.setState({ profiles })
  }

  async componentDidMount() {
    const profiles = await getAllProfiles()
    this.setState({ profiles })
  }

  render() {
    return (
      <>
        <h1>Hello. This is a list of all the users.</h1>
        {this.state.profiles.map((profile) => (
          <ProfileCard 
            key={profile._id}
            profile={profile}
            handleAddFriend={this.handleAddFriend}
            handleRemoveFriend={this.handleRemoveFriend}
            userProfile={this.props.userProfile}
            location={this.props.location}
            handleRefreshProfiles={this.handleRefreshProfiles}
          />
        ))}
      </>
    )
  }
}

export default ProfileList