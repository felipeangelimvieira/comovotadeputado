import React, {Component} from 'react';

import {Image} from 'react-bootstrap';
import axios from 'axios';
import NavBar from './components/NavBar/NavBar';
import Autocomplete from './components/CustomAutoComplete';
import Footer from './components/Footer';
import imagem_congresso from './assets/imagem_congresso.jpg';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      deputados : []
    }
  }
    
  componentDidMount() {
    axios.get('http://localhost:3333/deputados')
    .then(response => {
      console.log(response)
      this.setState({deputados : response})
    });
  }
  
  render() {

  var background = { width: '100%',
  backgroundSize: 'cover'};
  var textStyle = { 
    position: 'absolute',
    top: '13vw',
    textAlign : 'left',
    color: '#fff',
    margin: '0 10% 0 10%',
    fontSize : '4vw',
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
        <Autocomplete items={this.state.deputados.data}/>
        <Footer />
      </div>
      </div>
      </main>
    </div>
  );
}
}

export default App;
