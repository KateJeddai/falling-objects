import React from 'react';
import { connect } from 'react-redux';
import { scrollerReducer } from '../actions/scrollerReducer';
import '../css/scroller.scss';

class Scroller extends React.Component{
  state = {
      height: 0,
      height_bot: 0
  };  
  
  scrollDown = () => {
    let height = document.body.scrollHeight;
        this.setState(() => ({ height_bot: height}));    
        
    if(this.state.height < height){
         window.scrollTo(0, this.state.height + 70); 
         setTimeout(this.scrollDown, 10);
         this.setState((prevState) => ({
             height: prevState.height + 70
         }));
    }
    else if(this.state.height >= height){
        this.setState(() => ({  height: 0 }));
    }
  } 
  scrollUp = () => {
      this.setState(() => ({  height: 0 }));
      
      if(this.state.height_bot > 0){
         window.scrollTo(0, this.state.height_bot - 70); 
         setTimeout(this.scrollUp, 10);
         this.setState((prevState) => ({
             height_bot: prevState.height_bot - 70
         }));
     }     
  } 


  handleScroll = (e) => {
      let direction = this.props.direction;
          if(direction === 'down'){
             this.setState(() => ({  height: 0 }));
                setTimeout(() => {       
                  this.scrollDown();
                  this.props.scrollerReducer('up');
                }, 150); 
          }
          else if(direction === 'up'){
             this.scrollUp();  
             this.props.scrollerReducer('down');           
          };
  }

  render(){ 
      return(
        <div className="scroll-container">
            <div className="scroller" onClick={this.handleScroll}><i className={ this.props.direction === 'down' ? "fas fa-angle-down" : "fas fa-angle-up" }></i></div>
        </div>
      )
  }
}

const mapStateToProps = (state = {}) => {
    console.log(state.scrollerReducer.direction);
    return{
        direction: state.scrollerReducer.direction
    }
}

const mapDispatchToProps = (dispatch) => ({
    scrollerReducer: (direction) => dispatch(scrollerReducer(direction))
})

export default connect(mapStateToProps, mapDispatchToProps)(Scroller);

