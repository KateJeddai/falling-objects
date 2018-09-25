import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { Dashboard } from '../components/Dashboard';
import { Header } from '../components//Header';
import { Footer } from '../components/Footer';
import TopTracks from '../components/TopTracks';
import TopArtists from '../components/TopArtists';
import SearchTracks from '../components/SearchTracks';
import Track from '../components/Track';
import Artist from '../components/Artist';
import Album from '../components/Album';


export const history = createHistory();

const AppRouter = () => (
    <Router history={history}>
      <div>
        <Header />            
        <Switch>
            <Route 
              path="/"
              component={Dashboard}
              exact={true}
              />
            <Route 
              path="/toptracks"  
              component={TopTracks}
              />
            <Route
              path="/topartists"  
              component={TopArtists}
              />
            <Route 
              path="/searchresults"
              component={SearchTracks}
              />
            <Route path="/track/:id" 
                   component={Track} 
                   exact={true} 
            /> 
            <Route path="/artist/:id" 
                   component={Artist} 
                   exact={true} 
            /> 
            <Route path="/album/:id"
                   component={Album}
                   exact={true}
            />
        </Switch>
        <Footer />
      </div>  
    </Router>
);

export default AppRouter;