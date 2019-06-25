import React, {Component} from 'react';

import {Image} from 'react-bootstrap';
import NavBar from './components/NavBar/NavBar';
import imagem_congresso from './assets/imagem_congresso.jpg'

class App extends Component {

  
  render() {

  var background = { width: '100%',
  backgroundSize: 'cover'};
  var textStyle = { 
    position: 'absolute',
    top: '10vw',
    'text-align' : 'center',
    color: '#fff',
    margin: '0 10% 0 10%',
    'font-size' : '4vw',
    'horizontal-align': 'middle',
  }

  return (
    <div style={{height: '100%'}}>
      <NavBar />
      <main style={{top: 0, left: 0, width : '100%'}}>
        
      <div style={{
    width : '100%',
    padding: 0,
    left: 0,
    right: 0,
    margin: '0 auto',
    display: 'inline',
    'text-align': 'center',
    border: 'none'}}>
        <Image
          style={background} responsive
          src={imagem_congresso}>
        </Image>
        <h1 style={textStyle}>Voce sabe quem seu candidato foi durante as eleições. <br/> Quem ele é agora? </h1>
      </div>
      </main>
    </div>
  );
}
}

export default App;
