import React, {Component} from 'react';

import {Image} from 'react-bootstrap';
import NavBar from './components/NavBar/NavBar';
import Autocomplete from './components/CustomAutoComplete';
import imagem_congresso from './assets/imagem_congresso.jpg';

class App extends Component {

  
  render() {

  var background = { width: '100%',
  backgroundSize: 'cover'};
  var textStyle = { 
    position: 'absolute',
    top: '13vw',
    'text-align' : 'left',
    color: '#fff',
    margin: '0 10% 0 10%',
    'font-size' : '4vw',
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
    marginTop: '',
    display: 'inline',
    'text-align': 'center',
    border: 'none'}}>
        <Image
          style={background} responsive
          src={imagem_congresso}>
        </Image>
        <h1 style={textStyle}>Você sabe quem seu candidato foi durante as eleições. <br/> Quem ele é agora? </h1>
        <div style = {{marginTop : '3vw'}}>
        <Autocomplete items={[
    { name: 'apple' },
    { name: 'banana' },
    { name: 'pear' }
  ]}/>
      </div>
      </div>
      </main>
    </div>
  );
}
}

export default App;
