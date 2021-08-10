import React, { Component } from 'react'
import * as mediaAPI from '../../services/mediaService'
import MovieCard from '../../components/MovieCard/MovieCard'
import MediaForm from '../../components/MediaForm/MediaForm'

class MovieSearch extends Component {
  state = {
    type: 'movie',
    searchResults: {},
    query: this.props.match.params.query,
    searchType: this.props.match.params.searchType
  }

  async componentDidMount() {
    if (this.state.searchType === 'byName') {
      const searchResults = await mediaAPI.search(this.state.type, this.state.query)
      this.setState({searchResults})
    } else if (this.state.searchType === 'similar') {
      const searchResults = await mediaAPI.searchSimilar(this.state.type, this.state.query)
      this.setState({searchResults})
    } else if (this.state.searchType === 'genre') {
      const searchResults = await mediaAPI.searchGenre(this.state.type, this.state.query)
      this.setState({searchResults})
    }
  }
  render() { 
    return (
      <>
        <h1>Movie Results</h1>
        {this.state.searchResults.results?.map((movie, idx) => 
          <div key={idx}>
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
          </div>
        )}
        
      </>  
    );
  }
}
 
export default MovieSearch;