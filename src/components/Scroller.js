import React from 'react';

class Scroller extends React.Component{
  state = {
      direction: 'down'
  };

  handleScroll = () => {
      window.scrollY()
  }

  render(){      
      return(
          <div className="scroller" onClick={this.handleScroll}></div>
      )
  }
}
