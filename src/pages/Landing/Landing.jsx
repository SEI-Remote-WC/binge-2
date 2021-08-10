import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as profilesAPI from '../../services/profileService'
import * as moment from 'moment'

class Landing extends Component {
  state = {
    recent_activity: {}
  }

  async componentDidMount() {
    const recent_activity = await profilesAPI.getRecent()
    this.setState({ recent_activity })
  }
  
  render() {
    const { recent_activity } =  this.state 
    return (
      <>
        <h1>Landing Page</h1>
        <h2>Recently Joined:</h2>
          {recent_activity.recentProfiles?.map(profile => 
            <h4 key={profile._id}><Link to={{ pathname: '/profile', state: { profile }}}>{profile.name}</Link> on {moment(profile.createdAt).format('DD-MM-YYYY hh:mm A')}</h4>
          )}
        <h2>Newest TV Shows Collected</h2>
        {recent_activity.recentTv?.map(tv =>
          <>
          <Link to={`/tvs/${tv.api_id}`}>
            <img src={"https://image.tmdb.org/t/p/w200/" + tv.poster_path} alt="poster" />
          </Link>
            <h4 key={tv._id}>{tv.title}  added by {tv.collected_by[0]?.name} on {moment(tv.updatedAt).format('DD-MM-YYYY hh:mm A')}</h4>
          
          </> 
        )}
        <h2>Newest Movies Collected</h2>
        {recent_activity.recentMovies?.map(movie => 
          <>
          <Link to={`/movies/${movie.api_id}`}>
            <img src={"https://image.tmdb.org/t/p/w200/" + movie.poster_path} alt="poster" />
          </Link>
            <h4 key={movie._id}>{movie.title} added by {movie.collected_by[0]?.name} on {moment(movie.updatedAt).format('DD-MM-YYYY hh:mm A')}</h4>
          </>
        )}
      </>
    );
  }
}
 
export default Landing;