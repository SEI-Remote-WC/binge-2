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
    this.setState({userProfile: updatedProfile})
  }

  handleRemoveFriend = async friendId => {
    const updatedProfile = await profileAPI.unfriend(friendId)
    this.setState({userProfile: updatedProfile})
  }

  render() {
    const { user } = this.state
    return (
      <>
        <NavBar user={user} history={this.props.history} handleLogout={this.handleLogout} />
        <Route
          exact
          path="/"
          render={() => (
            <main>
              
            </main>
        )}/>
        <Route
          exact
          path="/signup"
          render={({ history }) => (
            <Signup
              history={history}
              handleSignupOrLogin={this.handleSignupOrLogin}
            />
        )}/>
        <Route
          exact
          path="/login"
          render={({ history }) => (
            <Login
             history={history}
             handleSignupOrLogin={this.handleSignupOrLogin}
            />
        )}/>
        <Route
          exact
          path="/users"
          render={() =>
            user ? 
            <ProfileList 
              handleAddFriend={this.handleAddFriend}
              handleRemoveFriend={this.handleRemoveFriend}
              userProfile={this.state.userProfile}
            /> : <Redirect to="/login" />
        }/>
        <Route exact path='/search/tv/:query' render={({location, match}) => 
          authService.getUser() ?
            <TvSearch
              location={location}
              match={match}
            />
            :
            <Redirect to='/login'/>
        }/>
        <Route exact path='/search/movie/:query' render={({location, match}) => 
          authService.getUser() ?
            <MovieSearch
              location={location}
              match={match}
            />
            :
            <Redirect to='/login'/>
        }/>
        <Route exact path='/movies/:id' render={({location, match}) => 
          authService.getUser() ?
            <MovieDetails 
              location={location}
              match={match}
            />
            :
            <Redirect to='/login' />
        }/>
        <Route exact path='/tvs/:id' render={({location, match}) => 
          authService.getUser() ?
            <TvDetails 
              location={location}
              match={match}
            />
            :
            <Redirect to='/login' />
        }/>
        <Route exact path='/movies/similar/:id' render={({location, match}) => 
          authService.getUser() ?
            <MovieSearch
              location={location}
              match={match}
            />
            :
            <Redirect to='/login' />
        }/>
        <Route exact path='/tvs/similar/:id' render={({location, match}) => 
          authService.getUser() ?
            <TvSearch 
              location={location}
              match={match}
            />
            :
            <Redirect to='/login' />
        }/>
        <Route exact path='/movies/genre/:id' render={({location, match}) => 
          authService.getUser() ?
            <MovieSearch
              location={location}
              match={match}
            />
            :
            <Redirect to='/login' />
        }/>
        <Route exact path='/tvs/genre/:id' render={({location, match}) => 
          authService.getUser() ?
            <TvSearch
              location={location}
              match={match}
            />
            :
            <Redirect to='/login' />
        }/>
      </>
    );
  }
}

export default App;
