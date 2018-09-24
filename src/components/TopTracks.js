import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from './Spinner';
import axios from 'axios';
import addTopTracks from '../actions/tracksReducer';
import Select from './Select';
import '../css/topTracks.scss';

class TopTracks extends React.Component{
    state = {
        top_tracks: [],
        limit: 28
    };
    componentDidMount(){
        let { limit } = this.state;
        this.fetchTopTracks(limit);
    }
    fetchTopTracks = (limit) => {
        axios.get(`http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&limit=${limit}&api_key=9e453d7b43fbb0b0499f4399eb2a2807&format=json`)
             .then(res => {
                 let tracks = res.data.tracks.track;
                 console.log(tracks);
                 this.setState((prevState) => ({
                    top_tracks: prevState.top_tracks.concat(tracks)
                 }));   
                 this.props.addTopTracks(tracks);
             })
             .catch(err => console.log(err));
    }
    handleShowMore = () => {
        this.setState((prevState) => ({
            limit: prevState.limit + 16
        }));
        setTimeout(() => {
            this.fetchTopTracks(this.state.limit);   
        }, 500);        
    }

    
    render(){
        let tracks = this.props.top_tracks;
            if(tracks && tracks.length > 0){
                tracks = tracks.sort((a, b) => {
                    if(this.props.sortBy === 'artistA'){
                          if(a.artist.name && b.artist.name){
                              return a.artist.name.toLowerCase() > b.artist.name.toLowerCase() ? 1 : -1;
                          }
                          else if(a.artist && b.artist){
                              return a.artist.toLowerCase() > b.artist.toLowerCase() ? 1 : -1;
                          }
                        
                    }
                    else if(this.props.sortBy === 'artistZ'){
                        if(a.artist.name && b.artist.name){
                             return a.artist.name.toLowerCase() < b.artist.name.toLowerCase() ? 1 : -1;
                        }
                        else if(a.artist && b.artist){
                             return a.artist.toLowerCase() < b.artist.toLowerCase() ? 1 : -1;
                        }
                      
                    }
                    else if(this.props.sortBy === 'track'){
                          return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
                    }
                    else if(this.props.sortBy === 'listeners'){
                        return parseInt(a.listeners) > parseInt(b.listeners) ? -1 : 1;
                    }
                })
            }
        
        return tracks && tracks.length > 0 ? (
            <div className="container">
               <Select />
               {tracks && tracks.length > 0 && (
                 <div className="tracks-wrapper">  
                      {tracks.map((track, i) => {
                           let artist = track.artist.name ? track.artist.name : track.artist,
                               mbid = track.mbid;
                           return (
                           <div key={track.name + i} className="track-card">
                                 <img src={track.image[2]['#text']} alt="photo" />
                                 <div className="title">{mbid === "" ? (
                                    <p><strong>{track.name}</strong></p>
                                 )  :  (
                                    <Link className="link" to={`track/${mbid}`}><p><strong>{track.name}</strong></p></Link>
                                 )}
                                 
                                 <p>{artist}</p>
                                 <p>Listeners: {track.listeners}</p>
                                 </div>
                           </div>
                           )
                       } )}
                  </div>
               )}
               <button className="button show-more" onClick={this.handleShowMore}>Show More...</button>
            </div>  
            ) : (<Spinner /> )
        
    }
}

const mapStateToProps = (state = {}) => ({
    top_tracks: state.tracksReducer.tracks,         
    sortBy: state.filterReducer.sortBy
});

const mapDispatchToProps = (dispatch) => ({
    addTopTracks: (tracks) => dispatch(addTopTracks(tracks))
});

export default connect(mapStateToProps, mapDispatchToProps)(TopTracks);