const sortFunction = (sortBy) => {
    return (a, b) => {
    if(sortBy === 'artistA'){
        if(a.artist.name && b.artist.name){
            return a.artist.name.toLowerCase() > b.artist.name.toLowerCase() ? 1 : -1;
        }
        else if(a.artist && b.artist){
            return a.artist.toLowerCase() > b.artist.toLowerCase() ? 1 : -1;
        }
      
  }
  else if(sortBy === 'artistZ'){
      if(a.artist.name && b.artist.name){
           return a.artist.name.toLowerCase() < b.artist.name.toLowerCase() ? 1 : -1;
      }
      else if(a.artist && b.artist){
           return a.artist.toLowerCase() < b.artist.toLowerCase() ? 1 : -1;
      }
    
  }
  else if(sortBy === 'track'){
        return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
  }
  else if(sortBy === 'listeners'){
      return parseInt(a.listeners) > parseInt(b.listeners) ? -1 : 1;
  }
}
}


export default sortFunction;