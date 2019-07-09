import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
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

    const year = this.props.vote.ano;
    const number = this.props.vote.numero;
    const type = this.props.vote.sigla;
    const voto = this.props.vote.sessoes.votos.voto;
    const data = this.props.vote.sessoes.data;
    const hora = this.props.vote.sessoes.hora;
    const objetivo = this.props.vote.sessoes.objetivo

    return (<Card style = {cardStyle}>
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
    );
    }
}

export default VoteCard;