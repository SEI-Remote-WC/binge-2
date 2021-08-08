import React, { Component } from 'react'
import * as tvAPI from '../../services/tv-api'
import TvCard from '../../components/TvCard/TvCard'
import MediaForm from '../../components/MediaForm/MediaForm'

class TvSearch extends Component {
  state = {
    searchResults: {},
    query: this.props.match.params.query,
    id: this.props.match.params.id,
    genre: this.props.match.params.genre
  }

  async componentDidMount() {
    if (this.state.query) {
      const searchResults = await tvAPI.search(this.state.query)
      this.setState({searchResults})
    } else if (this.state.id) {
      const searchResults = await tvAPI.searchSimilar(this.state.id)
      this.setState({searchResults})
    } else if (this.state.genre) {
      const searchResults = await tvAPI.searchGenre(this.state.genre)
      this.setState({searchResults})
    }
  }

  render() { 
    return (
      <>
        <h1>TV Results</h1>
        {this.state.searchResults.results?.map((tv, idx) => 
          <>
            <TvCard 
              key={idx}
              tv={tv}
            />
            <MediaForm
              key={idx} 
              userProfile={this.props.userProfile}
              handleAddMedia={this.props.handleAddMedia}
              handleRemoveMedia={this.props.handleRemoveMedia}
              media={tv}
              type="tv"
            />
        </>
        )}
      </>  
    );
  }
}
 
export default TvSearch;