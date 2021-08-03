import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import Signup from "../Signup/Signup";
import Login from "../Login/Login";
import Users from '../Users/User'
import * as authService from '../../services/authService'
import "./App.css";
import MovieSearch from '../MovieSearch/MovieSearch'
import TvSearch from '../TvSearch/TvSearch'
import MovieDetails from '../MovieDetails/MovieDetails'
import TvDetails from '../TvDetails/TvDetails'

class App extends Component {
  state = {
    user: authService.getUser()
  }
  
  handleLogout = () => {
    authService.logout();
    this.setState({ user: null });
    this.props.history.push("/");
  };

  handleSignupOrLogin = () => {
    this.setState({ user: authService.getUser() });
  };

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
          )}
        />
        <Route
          exact
          path="/signup"
          render={({ history }) => (
            <Signup
              history={history}
              handleSignupOrLogin={this.handleSignupOrLogin}
            />
          )}
        />
        <Route
          exact
          path="/login"
          render={({ history }) => (
            <Login
              history={history}
              handleSignupOrLogin={this.handleSignupOrLogin}
            />
          )}
        />
        <Route
          exact
          path="/users"
          render={() =>
            user ? <Users /> : <Redirect to="/login" />
          }
        />
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
      </>
    );
  }
}

export default App;
