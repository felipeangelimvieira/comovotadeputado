import React, { Component } from 'react';
import Autosuggest from '../components/CustomAutosuggest';
import {Image} from 'react-bootstrap';
import imagem_congresso from '../assets/imagem_congresso.jpg';
import Votes from '../components/Votes';


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

class Comovota extends Component {

    state = {
        deputado_id : null
    };

    fetchVoteList = () => {
        if (this.state.deputado_id) {
            return (<Votes selectedCongressman={this.state.deputado_id}/>);
        }
    }
    
    updateCongressman = (id) => {
        this.setState({deputado_id : id})
    }

    render() { return (<div style={{height: '100%'}}>
      
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
                    
                  <Autosuggest numItems={5} onItemSelected={this.updateCongressman}/>
                  <h1>?</h1>
                </div>
              </div>
            </div>
          </div>
          
        </div>

        <div className = "cards-container" style = {{textAlign : 'center'}}>
            {this.fetchVoteList()}
        </div>
      </main>
</div>)
}
}

export default Comovota;