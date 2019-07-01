import React, {Component} from 'react';

import {Image} from 'react-bootstrap';
import axios from 'axios';
import NavBar from './components/NavBar/NavBar';
import Autocomplete from './components/CustomAutoComplete';
import Autosuggest from './components/CustomAutosuggest';
import Footer from './components/Footer';
import imagem_congresso from './assets/imagem_congresso.jpg';
import Votes from './components/Votes'




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
        
        <div style={{width : '100%',
                    padding: 0,
                    left: 0,
                    right: 0,
                    marginTop: '',
                    display: 'inline',
                    textAlign: 'center',
                    border: 'none'}}>
          <Image
            style={background} responsive
            src={imagem_congresso}>
          </Image>
          <h1 style={textStyle}>Você sabe quem seu candidato foi durante as eleições. <br/> Quem ele é agora? </h1>
          <div className="input-container"style = {{marginTop : '3vw', textAlign: 'center'}}>
            <div className = "centered-container" style= {{display: 'inline-block'}}>
              <div className="comovota-container" style = {{ margin: 0}}>
                  <h1 style={{fontFamily : "'Open Sans', sans-serif", margin: 0}}>Como vota,</h1>
                <div className="autosuggest-container" style = {{display: 'flex', margin: 0, padding: 0}}>
                  <Autosuggest congressmen={this.state.deputados.data} numItems={5}/>
                  <h1>?</h1>
                </div>
              </div>
            </div>
          </div>
          
        </div>

        <div className = "cards-container" style = {{textAlign : 'center'}}>
        </div>
      </main>
      <div className="footer" style = {{position: 'relative', left: 0, marginTop: '50vh', bottom: 0, width: '100%', textAlign: 'center'}}>
            <Footer />
      </div>
    </div>
  );
}
}

export default App;
