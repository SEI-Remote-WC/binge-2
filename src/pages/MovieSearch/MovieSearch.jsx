import React, { Component } from 'react'
import * as mediaAPI from '../../services/media-api'
import MovieCard from '../../components/MovieCard/MovieCard'
import MediaForm from '../../components/MediaForm/MediaForm'

class MovieSearch extends Component {
  state = {
    type: 'movie',
    searchResults: {},
    query: this.props.match.params.query,
    id: this.props.match.params.id,
    genre: this.props.match.params.genre
  }

  async componentDidMount() {
    if (this.state.query) {
      const searchResults = await mediaAPI.search(this.state.type, this.state.query)
      this.setState({searchResults})
    } else if (this.state.id) {
      const searchResults = await mediaAPI.searchSimilar(this.state.type, this.state.id)
      this.setState({searchResults})
    } else if (this.state.genre) {
      const searchResults = await mediaAPI.searchGenre(this.state.type, this.state.genre)
      this.setState({searchResults})
    }
  }

  render() { 
    return (
      <>
        <h1>Movie Results</h1>
        {this.state.searchResults.results?.map((movie, idx) => 
          <>
            <MovieCard 
              key={movie.id}
              movie={movie}
            />
            <MediaForm
              key={idx} 
              userProfile={this.props.userProfile}
              handleAddMedia={this.props.handleAddMedia}
              handleRemoveMedia={this.props.handleRemoveMedia}
              media={movie}
              type="movie"
            />
          </>
        )}
        
      </>  
    );
  }
}
 
export default MovieSearch;