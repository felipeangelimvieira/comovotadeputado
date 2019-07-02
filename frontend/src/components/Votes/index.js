import React, { Component } from 'react';
import VoteCard from './VoteCard'
import axios from 'axios';


function requestVotes(deputado_id) {
    return new Promise(function(resolve, reject) { 
        axios.get(`http://localhost:3333/deputado/${deputado_id}/votos`)
        .then((res) => resolve(res))
        .catch(res => reject(res));

    });
}

class Votes extends Component {

    
    constructor(props) {
    super(props);
    this.state = {
        votes : [],
        selectedCongressman : null,
        loading : false
    }

    }

    getVotes = async (deputado_id) => {
        try {
            this.setState({loading : true})
        var res = await requestVotes(deputado_id);
        console.log(res.data)
        this.setState({ votes : res.data,
                        selectedCongressman : deputado_id,
                        loading : false});
        return 0
}   
 catch (e) {
     console.log(e);
     return e;
 }

}

    getVotesAndCards = () =>
    {

    }

    render() {
        console.log(this.state.votes, this.state.votes.length, this.props.selectedCongressman, this.state.selectedCongressman, this.state.loading);
        
        if ((this.props.selectedCongressman !== this.state.selectedCongressman  || this.state.votes.length === 0) && !this.state.loading)
        { 
            this.getVotes(this.props.selectedCongressman);
        }

        if (this.state.votes.length > 0 && this.props.selectedCongressman === this.state.selectedCongressman && !this.state.loading) {
            return (
                <div id="vote-list" style = {{textAlign: 'center'}}>
                {this.state.votes.slice(0, 5).map((x,index) => <VoteCard vote={x} key={index}/>)}
                </div>
            )
        }
        return <VoteCard vote={null} />;
        } 

}

export default Votes;