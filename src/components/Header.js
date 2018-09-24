import React from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';
import '../css/header.scss';

export const Header = () => (
    <div className="header">
      <div className="header-inner">
        <div className="brand-logo">
            <Link className="header-link" to="/">
               <h1>ReactMusic</h1>
            </Link>
        </div>
        <nav>
            <Link className="nav-link" to="/toptracks">Top Tracks</Link>
            <Link className="nav-link" to="/topartists">Top Artists</Link>
        </nav>  
        <div className="search"><Search /></div>
      </div>  
    </div>
);