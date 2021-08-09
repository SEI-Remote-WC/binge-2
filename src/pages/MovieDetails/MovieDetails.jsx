import React, { Component } from 'react'
import * as mediaAPI from '../../services/media-api'
import ReviewForm from '../../components/ReviewForm/ReviewForm'

class MovieDetails extends Component {
  state = {
    searchResult: {},
    id: this.props.match.params.id,
    type: 'movie'
  }

  async componentDidMount() {
    const searchResult = await mediaAPI.searchOne(this.state.type, this.state.id)
    this.setState({searchResult})
  }

  render() { 
    return (
      <>
        <h1>Movie Deets</h1>
        <a href={`https://www.imdb.com/title/${this.state.searchResult.imdb_id}`}>View on IMDB</a>
        <a href={`/search/movies/similar/${this.state.searchResult.id}`}>Find similar shows</a>
        {this.state.searchResult.genres?.map(genre => 
          <a key={genre.id} href={`/search/movies/genre/${genre.id}`}>
            <p>{genre.name}</p>
          </a>
        )}
        {this.state.searchResult.videos?.results.map((video, idx) => 
           <iframe key={idx} title={`search-video-${idx}`} src={`http://www.youtube.com/embed/${video.key}`}
           width="560" height="315" frameBorder="0"></iframe>  
        )}
        <ReviewForm />
      </>
    );
  }
}
 
export default MovieDetails;