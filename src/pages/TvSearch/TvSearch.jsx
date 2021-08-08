import React, { Component } from 'react'
import * as mediaAPI from '../../services/media-api'
import TvCard from '../../components/TvCard/TvCard'
import MediaForm from '../../components/MediaForm/MediaForm'

class TvSearch extends Component {
  state = {
    type: 'tv',
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
        <h1>TV Results</h1>
        {this.state.searchResults.results?.map((tv, idx) => 
          <div key={idx}>
            <TvCard 
              key={tv.id}
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
        </div>
        )}
      </>  
    );
  }
}
 
export default TvSearch;