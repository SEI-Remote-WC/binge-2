import React, { Component } from 'react'
import * as moviesAPI from '../../services/movies-api'

class MovieDetails extends Component {
  state = {
    searchResult: {},
    id: this.props.match.params.id
  }

  async componentDidMount() {
    const searchResult = await moviesAPI.searchOne(this.state.id)
    console.log(searchResult)
    this.setState({searchResult})
  }

  render() { 
    return (
      <>
        <h1>Movie Deets</h1>
        <a href={`/movies/similar/${this.state.searchResult.id}`}>Find similar shows</a>
        {this.state.searchResult.videos?.results.map((video, idx) => 
           <iframe key={idx} title={`search-video-${idx}`} src={`http://www.youtube.com/embed/${video.key}`}
           width="560" height="315" frameBorder="0"></iframe>  
        )}
      </>
    );
  }
}
 
export default MovieDetails;