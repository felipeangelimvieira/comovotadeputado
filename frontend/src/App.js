import React, {Component} from 'react';


import Routes from './routes';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import NavBar from './components/NavBar/NavBar';
import Autosuggest from './components/CustomAutosuggest';
import Footer from './components/Footer';
import Votes from './components/Votes'




function App() {
  
  return (
    <div>
    <BrowserRouter>
    <NavBar />
    <Routes />
    <Footer/>
    </BrowserRouter>

    </div>
    );
}

export default App;
