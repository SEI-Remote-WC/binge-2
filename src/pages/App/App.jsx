import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import Signup from "../Signup/Signup";
import Login from "../Login/Login";
import ProfileList from '../ProfileList/ProfileList'
import * as authService from '../../services/authService'
import "./App.css";
import MovieSearch from '../MovieSearch/MovieSearch'
import TvSearch from '../TvSearch/TvSearch'
import MovieDetails from '../MovieDetails/MovieDetails'
import TvDetails from '../TvDetails/TvDetails'
import * as profileAPI from '../../services/profileService'
import ProfileDetails from '../ProfileDetails/ProfileDetails'

class App extends Component {
  state = {
    user: authService.getUser(),
    userProfile: null
  }
  
  handleLogout = () => {
    authService.logout();
    this.setState({ user: null, userProfile: null });
    this.props.history.push("/");
  };

  handleSignupOrLogin = async () => {
    this.setState({ user: await authService.getUser(), userProfile: await profileAPI.getUserProfile()});
  };

  async componentDidMount() {
    if (!this.state.userProfile) {
      const userProfile = await profileAPI.getUserProfile()
      this.setState({userProfile})
    }
  }

  handleAddFriend = async friendId => {
    const updatedProfile = await profileAPI.friend(friendId)
    this.setState({userProfile: updatedProfile}, ()=> this.props.history.push('/users'))
  }

  handleRemoveFriend = async friendId => {
    const updatedProfile = await profileAPI.unfriend(friendId)
    this.setState({userProfile: updatedProfile}, ()=> this.props.history.push('/users'))
  }

  handleAddMedia = async media => {
    const updatedProfile = await profileAPI.addMedia(media)
    this.setState({userProfile: updatedProfile})
  }

  handleRemoveMedia = async media => {
    const updatedProfile = await profileAPI.removeMedia(media)
    this.setState({userProfile: updatedProfile})
  }

  render() {
    const { user, userProfile } = this.state
    return (
      <>
        <NavBar user={user} history={this.props.history} handleLogout={this.handleLogout} />
        <Route exact path="/" render={() => (
          <main></main>
        )}/>
        <Route exact path="/signup" render={({ history }) => (
          <Signup
            history={history}
            handleSignupOrLogin={this.handleSignupOrLogin}
          />
        )}/>
        <Route exact path="/login" render={({ history }) => (
          <Login
            history={history}
            handleSignupOrLogin={this.handleSignupOrLogin}
          />
        )}/>
        <Route exact path="/users" render={() =>
          authService.getUser() ?
          <ProfileList 
            handleAddFriend={this.handleAddFriend}
            handleRemoveFriend={this.handleRemoveFriend}
            userProfile={userProfile}
          /> : <Redirect to="/login" />
        }/>
        <Route exact path="/profile" render={({ location }) =>
          authService.getUser() ?
          <ProfileDetails 
            handleAddFriend={this.handleAddFriend}
            handleRemoveFriend={this.handleRemoveFriend}
            userProfile={userProfile}
            location={location}
          /> : <Redirect to="/login" />
        }/>
        <Route exact path='/search/tvs/:searchType/:query' render={({ match }) => 
          authService.getUser() ?
            <TvSearch
              match={match}
              userProfile={userProfile}
              handleAddMedia={this.handleAddMedia}
              handleRemoveMedia={this.handleRemoveMedia}
            /> : <Redirect to='/login'/>
        }/>
        <Route exact path='/search/movies/:searchType/:query' render={({ match }) => 
          authService.getUser() ?
            <MovieSearch
              match={match}
              userProfile={userProfile}
              handleAddMedia={this.handleAddMedia}
              handleRemoveMedia={this.handleRemoveMedia}
            /> : <Redirect to='/login'/>
        }/>
        <Route exact path='/movies/:id' render={({ match }) => 
          authService.getUser() ?
            <MovieDetails 
              match={match}
              userProfile={userProfile}
              handleAddMedia={this.handleAddMedia}
              handleRemoveMedia={this.handleRemoveMedia}
            /> : <Redirect to='/login' />
        }/>
        <Route exact path='/tvs/:id' render={({ match }) => 
          authService.getUser() ?
            <TvDetails 
              match={match}
              userProfile={userProfile}
              handleAddMedia={this.handleAddMedia}
              handleRemoveMedia={this.handleRemoveMedia}
            /> : <Redirect to='/login' />
        }/>
      </>
    );
  }
}

export default App;
