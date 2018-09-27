import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Spinner } from './Spinner';
import axios from 'axios';
import addTopTracks from '../actions/tracksReducer';
import { scrollerReducer } from '../actions/scrollerReducer';
import sortFunction from './sortFunction';
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

        window.addEventListener('scroll', this.handleScroll);
    }
    handleScroll = (e) => {
        if(window.scrollY > window.innerHeight / 2.5){
            this.props.scrollerReducer('up', window.scrollY);
        }
        else if(window.scrollY < window.innerHeight / 2){
            this.props.scrollerReducer('down', window.scrollY);
        }
    }
    fetchTopTracks = (limit) => {
        axios.get(`http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&limit=${limit}&api_key=9e453d7b43fbb0b0499f4399eb2a2807&format=json`)
             .then(res => {
                 let tracks = res.data.tracks.track;
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
            this.props.scrollerReducer('down', window.scrollY);
        }, 500); 
    }

    
    render(){
        let tracks = this.props.top_tracks;
            if(tracks && tracks.length > 0){
                tracks = tracks.sort(sortFunction(this.props.sortBy));
            }
        return tracks && tracks.length > 0 ? (
            <div className="container">
               <div className="tracks-top"><Select /><h1>Top Tracks</h1></div>
               {tracks && tracks.length > 0 && (
                 <div className="tracks-wrapper">  
                      {tracks.map((track, i) => {
                           let artist = track.artist.name ? track.artist.name : track.artist,
                               mbid = track.mbid;
                           return (
                           <div key={track.name + i} className="track-card">
                                 <img src={track.image[2]['#text']} alt="photo" />
                                     <div className="title">{mbid === "" ? (
                                        <p className="name"><strong>{track.name}</strong></p>
                                        )  :  (
                                        <Link className="link" to={`track/${mbid}`}><p className="name"><strong>{track.name}</strong></p></Link>
                                        )}                                 
                                        <Link className="link" to={`artist/${artist}`}><p>{artist}</p></Link>
                                        <p>Listeners: {track.listeners}</p>
                                     </div>
                           </div>
                           )
                       } )}
                  </div>
               )}
               <button className="button show-more" onClick={this.handleShowMore}>Show More...</button>
            </div>  
            ) : (<div className="spinner-container"><Spinner /></div> )
        
    }
}

const mapStateToProps = (state = {}) => ({
    top_tracks: state.tracksReducer.tracks,         
    sortBy: state.filterReducer.sortBy
});

const mapDispatchToProps = (dispatch) => ({
    addTopTracks: (tracks) => dispatch(addTopTracks(tracks)),
    scrollerReducer: (direction, y) => dispatch(scrollerReducer(direction, y))
});

export default connect(mapStateToProps, mapDispatchToProps)(TopTracks);