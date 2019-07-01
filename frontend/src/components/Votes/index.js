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
        votos : [],
        loading : true
    }

    }

    getVotos = async (deputado_id) => {
        var res = await requestVotes(deputado_id);
        console.log("RESPONSE", res);
        this.setState({ votos : res.data})
    }

    render() {
        return <VoteCard/>;
    }

}

export default Votes;