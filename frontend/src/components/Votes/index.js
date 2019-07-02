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

    console.log("PROPS", props)
    this.state = {
        votes : [],
        selectedCongressman : null,
        loading : false,
    }

    }

    getVotes = async (deputado_id) => {
        try {
            this.setState({loading : true})
        var res = await requestVotes(deputado_id);
        this.setState({ votes : res.data,
                        selectedCongressman : deputado_id,
                        loading : false});

        if (this.state.votes.length > this.props.numItems) {
            this.props.setHasMore(true);
        }
        
        return 0
}   
 catch (e) {
     console.log(e);
     return e;
 }

}

    render() {
        console.log(this.state.votes, this.state.votes.length, this.props.selectedCongressman, this.state.selectedCongressman, this.state.loading);
        console.log('num items render', this.props)
        if ((this.props.selectedCongressman !== this.state.selectedCongressman  || this.state.votes.length === 0) && !this.state.loading)
        { 
            this.getVotes(this.props.selectedCongressman);
        }
        
        // check if has more votes to show
        if (this.state.votes.length <= this.props.numItems && this.props.hasMore) {
            console.log("SASAS SETTING TO FALSE", this.state.votes.length, this.props.numItems)
            this.props.setHasMore(false);
        }


        if (this.state.votes.length > 0 && this.props.selectedCongressman === this.state.selectedCongressman && !this.state.loading) {
            return (
                <div id="vote-list" style = {{textAlign: 'center', display : 'inline-block'}}>
                {this.state.votes.slice(0, this.props.numItems).map((x,index) => <VoteCard vote={x} key={index} />)}
                </div>
            )
        }
        return <VoteCard vote={null} />;
        } 

}

export default Votes;