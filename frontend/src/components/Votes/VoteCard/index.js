import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import './card.css';


const cardStyle = {border: '1px solid #aaa',
                   width: '80vw',
                   maxWidth : '25rem',
                   margin: '1rem 1rem',
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
    return (<Card style = {cardStyle}>
        <Card.Header>{`${type} ${number}/${year}`}</Card.Header>
        <Card.Body>
          <blockquote className="blockquote mb-0">
            <p>
              {`${voto}`}
            </p>
          </blockquote>
        </Card.Body>
      </Card>
    );
    }
}

export default VoteCard;