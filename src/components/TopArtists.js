import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { sortByArtistA, sortByArtistZ, sortByListeners } from '../actions/filterReducer';
import Spinner from './Spinner';
import addTopArtists from '../actions/artistReducer';
import '../css/select.scss';
import '../css/topArtists.scss';


class TopArtists extends React.Component{
    state = {
        limit: 28
    };
    componentDidMount(){
        let { limit } = this.state;
        this.fetchTopArtists(limit);
    }
    fetchTopArtists = (limit) => {
        axios.get(`http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&limit=${limit}&api_key=9e453d7b43fbb0b0499f4399eb2a2807&format=json`)
             .then(res => {
                let artists = res.data.tracks.track;
                this.props.addTopArtists(artists); 
             })
    }     
    handleShowMore = () => {
        this.setState((prevState) => ({
            limit: prevState.limit + 16
        }));
        setTimeout(() => {
            this.fetchTopArtists(this.state.limit);   
        }, 500);        
    }
    handleSort = (e) => {
        switch(e.target.value){
            case 'artistA': return this.props.sortByArtistA();
            case 'artistZ': return this.props.sortByArtistZ();
            case 'listeners': return this.props.sortByListeners();
        } 
        return null;
    }
    

    render(){
        const artists = this.props.top_artists;        
        let artists_new = [];          
        let obj = {};

        if(artists && artists.length > 0){
          for (let i = 0; i < artists.length; i++){
            if(!obj[artists[i]['artist']['name']]){
                obj[artists[i]['artist']['name']] = artists[i];
            }
          }
          for (let key in obj){
            artists_new.push(obj[key]);                    
          } 
        }  

        artists_new = artists_new.sort((a, b) => {
            let sortBy = this.props.sortBy;
                if(sortBy === 'artistA'){
                    return a.artist.name.toLowerCase() > b.artist.name.toLowerCase() ? 1 : -1;
                }
                else if(sortBy === 'artistZ'){
                    return a.artist.name.toLowerCase() < b.artist.name.toLowerCase() ? 1 : -1;
                } 
                else if(this.props.sortBy === 'listeners'){
                    return parseInt(a.listeners) > parseInt(b.listeners) ? -1 : 1;
                }   
        });
        console.log(artists_new);
                 
        return artists_new && artists_new.length > 0 ? (
           <div className="container">
                <select onChange={this.handleSort} className="sort-group">
                     <option>Sort By:</option>
                     <option value="artistA">Artist Name (A-Z)</option>
                     <option value="artistZ">Artist Name (Z-A)</option>
                     <option value="listeners">Listeners</option>
                </select> 
               {artists_new && artists_new.length > 0 && (
                 <div className="artists-wrapper">  
                      {artists_new.map((artist, i) => (
                            <div key={artist.artist.name + i} className="artist-card">
                                 <img src={artist.image[2]['#text']} alt="photo" />
                                 <div className="title">
                                     <Link className="link" to={`artist/${artist.artist.name}`}><p><strong>{artist.artist.name}</strong></p></Link>
                                     <p>Listeners: {artist.listeners}</p>
                                 </div>    
                           </div>
                          ))}
                  </div>
               )}
               <button className="button show-more" onClick={this.handleShowMore}>Show More...</button>
            </div>
        ) : ( <Spinner /> )
    }    
}


const mapStateToProps = (state = {}) => ({
    top_artists: state.artistReducer.artists,
    sortBy: state.filterReducer.sortBy
});

const mapDispatchToProps = (dispatch) => ({
    addTopArtists: (artists) => dispatch(addTopArtists(artists)),
    sortByArtistA: () => dispatch(sortByArtistA()),
    sortByArtistZ: () => dispatch(sortByArtistZ()),
    sortByListeners: () => dispatch(sortByListeners())
});


export default connect(mapStateToProps, mapDispatchToProps)(TopArtists);