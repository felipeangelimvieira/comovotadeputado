import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import './card.css';

const objetivoStyle = {
  textFamily : "'Open Sans', sans serif",
}

const cardStyle = {border: '1px solid #aaa',
                   width: '80vw',
                   maxWidth : '25rem',
                   margin: '1rem 1rem',
                   padding: '1rem 1rem',
                   textAlign: 'left',
                   borderRadius: '4px'};



class VoteCard extends Component {

    render() {

    if (!this.props.vote) {
      return null;
    }
    console.log(this.props.vote);
    const year = this.props.vote.ano;
    const number = this.props.vote.numero;
    const type = this.props.vote.sigla;
    const voto = this.props.vote.sessoes.votos.voto;
    const data = this.props.vote.sessoes.data;
    const hora = this.props.vote.sessoes.hora;
    const objetivo = this.props.vote.sessoes.objetivo

    return (
    
    <Card>

      <CardContent>
        <h6>{objetivo}</h6>
      </CardContent>
    </Card>
    
    
    /*
    <Card style = {cardStyle}>
        <Card.Header><strong>{`${type} ${number}/${year}`}</strong>     {`${data} ${hora}`}</Card.Header>
        <Card.Body>
            <p style = {objetivoStyle}>
              {`Objetivo: ${objetivo}`}
            </p>
            <p>
              {`${voto}`}
            </p>
        </Card.Body>
      </Card>
    */
    );
    }
}

export default VoteCard;