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
       // this.setState(() => ({ height_bot: height}));    
        
    if(this.state.height < height){
         window.scrollTo(0, this.state.height + 70); 
         setTimeout(this.scrollDown, 10);
         this.setState((prevState) => ({
             height: prevState.height + 70
         }));
    }
  } 

  scrollUp = () => {
    //  this.setState(() => ({  height: 0 }));
      
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
              this.setState(() => ({  height: this.props.y || 0 }));
                setTimeout(() => {       
                  this.scrollDown();
                  this.props.scrollerReducer('up');
                }, 150); 
          }
          else if(direction === 'up'){
             this.setState(() => ({  height_bot: this.props.y || document.body.scrollHeight })); 
             setTimeout(() => {
                 this.scrollUp();  
                 this.props.scrollerReducer('down'); 
             }, 150);          
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
    return{
        direction: state.scrollerReducer.direction,
        y: state.scrollerReducer.y
    }
}

const mapDispatchToProps = (dispatch) => ({
    scrollerReducer: (direction, y) => dispatch(scrollerReducer(direction, y))
})

export default connect(mapStateToProps, mapDispatchToProps)(Scroller);

