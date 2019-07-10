import React from 'react';
import Autosuggest from '../CustomAutosuggest';
import '../../styles/comovota.module.css';
import styles from '../../styles/comovota.module.css';
import Votes from '../Votes';


class ComoVota extends React.Component {

    /* 
    State:

    deputado_id: deputado escolhido pelo usuário. Valor inicial nulo.
    numVotes: número de votos a serem renderizados
    hasMore: se ainda existem votos a serem mostrados
    */ 
    state = {
        deputado_id : null,
        numVotes : 10,
        hasMore : false,
    };

    
    /*

    Essa função verifica se algum deputado foi escolhido pelo usuário.
    Se algum deputado foi escolhido, retorna o componente
    Votes
    */
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

    /*

    Callback passado para os child componentes
    para atualizar estado 'hasMore'

    @param bool: novo valor do estado 'hasMore'
    */
    setHasMore = (bool) => {
        this.setState({hasMore : bool})
    }


    /*
    Callback passado para os child components
    para atualizar o estado deputado_id

    @param id: id do deputado escolhido
    */
    updateCongressman = (id) => {
        this.setState({deputado_id : id})
    }

    /* 
    
    Callback para aumentar o número de votos
    a serem renderizados

    @param e: event.
    */
    fetchMoreVotes = (e) => {
        this.setState((state, props) => ({numVotes :  state.numVotes + 10}));
    }



    render () {
        return(
        <div>
        <div className="input-container"style = {{marginTop : '3vw', textAlign: 'center'}}>
                    
            <div>
                <h1 className={styles.message}>Como vota,</h1>
            <div className={styles.autosuggestQuestionContainer}>
                <Autosuggest onItemSelected={this.updateCongressman}/>
            </div>
            </div>
        </div>

        <div className = "cards-container" style = {{textAlign : 'center'}}>
            {this.fetchVoteList()}
        <div className = "button-container">
            {(this.state.deputado_id && this.state.hasMore) ? <button onClick={this.fetchMoreVotes}>+</button> : null} 
        </div>
        </div>
    </div>
        );
}
}

export default ComoVota;