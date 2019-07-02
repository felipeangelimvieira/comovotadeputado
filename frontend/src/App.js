import React from 'react';
import Routes from './routes';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer';




function App() {
  return (
    <BrowserRouter>
    <NavBar />
    <Routes />
    <Footer/>
    </BrowserRouter>
    );
}

export default App;
