import React, { Component } from 'react';
import createHistory from 'history/createBrowserHistory';
import { Link } from 'react-router-dom';
import Spinner from './Spinner';
import axios from 'axios';
import LinesEllipsis from 'react-lines-ellipsis';
import '../css/artist.scss';

const history = createHistory();

export default class Artist extends Component{
  state = {
     artist_name: '',
     artist_bio: '',
     artist_img: '',
     similar: '',
     full_text: false
  };

 fetchArtist = (id) => {
    axios.get(`http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${id}&api_key=9e453d7b43fbb0b0499f4399eb2a2807&format=json`)
    .then(res => {
        console.log(res.data);
        let artist = res.data.artist;
        this.setState(() => ({
           artist_name: artist.name,
           artist_bio: artist.bio.content,
           artist_img: artist.image[2]['#text'],
           similar: artist.similar.artist
        }));
    })
    .catch(err => console.log(err));
 };
   
  componentDidMount(){
       this.fetchArtist(this.props.match.params.id);
  }

  componentDidUpdate(prevProps){
       let id = this.props.match.params.id;
       if(id !== prevProps.match.params.id){
           this.fetchArtist(id);
       }
  }

  handleReadMore = () => {
      this.setState((prevState) => ({
          full_text: !prevState.full_text
      }));
  }

  render(){
      let artist_name = this.state.artist_name,
          artist_bio = this.state.artist_bio,
          artist_img = this.state.artist_img,
          similar = this.state.similar;
          
    return artist_name === '' ? (<Spinner /> ) :
         (
     <div className="container">
        <div><button className="button" onClick={history.goBack}>Go Back</button></div>
        <div className="artist-card">
            <div className="artist-wrapper">
                <div className="img">
                    <img src={artist_img} alt="photo" />
                </div>
                {this.state.full_text ? (
                    <div className="text">
                        <h2>{artist_name}</h2>            
                        <pre>{artist_bio}</pre>
                    </div> 
                ) : (
                  <div>  
                    <h2>{artist_name}</h2>   
                    <LinesEllipsis
                       text={artist_bio}
                       maxLine='10'
                       ellipsis='...'
                       trimRight
                       basedOn='letters'
                       className="text"
                    /> 
                  </div>
                  )
                }                 
                <button className="button" onClick={this.handleReadMore}>
                    {this.state.full_text ? 'Show less' : 'Read more'}
                </button>  
                          
            </div>
         </div>
        { similar.length > 0 ? (
           <div className="similar-container">
             <h2>You may also be interested in: </h2>   
             <div className="similar-group">
                { similar.map(sim => (<div className="similar" key={sim.name}>
                        <div><img src={sim.image[2]["#text"]} /></div>
                        <div className="title"><p><strong><Link className="link" to={`${sim.name}`}>{sim.name}</Link></strong></p></div>
                    </div>))  }
              </div> 
            </div>  
              ) : (
                    null
         )} 
     </div>
        )
  }
}
