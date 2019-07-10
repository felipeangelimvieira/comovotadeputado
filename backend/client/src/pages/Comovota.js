import React, { Component } from 'react';
import Autosuggest from '../components/CustomAutosuggest';
import {Image} from 'react-bootstrap';
import imagem_congresso from '../assets/imagem_congresso.jpg';
import Votes from '../components/Votes';
import './comovota.css';
import styles from '../styles/typography.module.css';

var background = { 
  width: '100%',
                    height: '100vh',
                    objectFit : 'cover',
                    backgroundSize: 'cover'};

var textStyle = {
  fontFamily: "'Cabin', sans-serif",
  position: 'absolute',
  top: '13vw',
  textAlign : 'left',
  color: '#fff',
  margin: '16vh 10% 0 10%',
  fontSize : 'calc(30px + 2vw )',
}



class Comovota extends Component {

    state = {
        deputado_id : null,
        numVotes : 10,
        hasMore : false,
    };

    fetchVoteList = () => {
        if (this.state.deputado_id) {
            return (<Votes 
                        selectedCongressman={this.state.deputado_id}
                        numItems={this.state.numVotes}
                        setHasMore={this.setHasMore}
                        hasMore = {this.state.hasMore}
                        />);
        }
    }

    setHasMore = (bool) => {
        this.setState({hasMore : bool})
    }


    
    updateCongressman = (id) => {
        this.setState({deputado_id : id})
    }

    fetchMoreVotes = (e) => {
        console.log(this.state.numVotes);
        this.setState((state, props) => ({numVotes :  state.numVotes + 10}));
    }

    render() { 
        
     console.log("?", this.state.deputado_id && this.state.hasMore, this.state.deputado_id, this.state.hasMore);
     return (<div style={{height: '100%'}}>
      
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
                  <h1 className={styles.h3}>Como vota,</h1>
                <div className="autosuggest-container" style = {{display: 'flex', margin: 0, padding: 0}}>
                  <Autosuggest onItemSelected={this.updateCongressman}/>
                  <h1>?</h1>
                </div>
              </div>
            </div>
          </div>
          
        </div>

        <div className = "cards-container" style = {{textAlign : 'center'}}>
            {this.fetchVoteList()}
            <div className = "button-container">
                {(this.state.deputado_id && this.state.hasMore) ? <button onClick={this.fetchMoreVotes}>+</button> : null} 
            </div>
        </div>
        
      </main>
</div>)
}
}

export default Comovota;