import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Spinner } from './Spinner';
import sortFunction from './sortFunction';
import Select from './Select';
import '../css/topTracks.scss';

const SearchTracks  = (props) => {
      let search_tracks = props.search_tracks;
          if(search_tracks.length > 0){
              search_tracks = search_tracks.filter(track => { return track.image[2]['#text'] !== ''});
              search_tracks = search_tracks.sort(sortFunction(props.sortBy));
          } 
      console.log(document.body.scrollHeight);
     return search_tracks && search_tracks.length > 0 ? (
          <div className="container search-container">
             <div className="tracks-top"><Select /><h1>Search Results</h1></div>
             <div className="tracks-wrapper">
                 {search_tracks.map((track, i) => (
                    <div key={track.name + i} className="track-card">
                        <img src={track.image[2]['#text']} alt="photo" />
                        <div className="title">
                            <Link className="link" to={`track/${track.mbid}`}><p className="name"><strong>{track.name}</strong></p></Link>
                            <p>{track.artist}</p>      
                            <p>Listeners: {track.listeners}</p>  
                        </div> 
                    </div>
                 ))}
             </div>
          </div>
      ) : <div className="spinner-container">( <Spinner /> )</div>

}


const mapStateToProps = (state = {}) => ({
    search_tracks: state.tracksReducer.search_tracks,
    sortBy: state.filterReducer.sortBy
});

export default connect(mapStateToProps)(SearchTracks);