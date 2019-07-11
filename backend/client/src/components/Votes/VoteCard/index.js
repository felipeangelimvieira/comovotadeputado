import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx'
import styles from '../../../styles/votecard.module.css';

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



    state = {
      expanded : false
    }

    setExpanded = (val) => {
      console.log("SET EXPANDED", val);
      this.setState({expanded : val});
    }

    handleExpandClick = () => {
      this.setExpanded(!this.state.expanded);
    }

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
    const detalhes = this.props.vote.detalhes[0];
    const autor = detalhes.autor;
    const explicacaoEmenta =  detalhes.explicacaoEmenta == "\r\n  " ? "" : detalhes.explicacaoEmenta;
    const tema = detalhes.tema
    const ementa = detalhes.ementa
    const link = detalhes.link
    const linkCamara = `https://www.camara.leg.br/propostas-legislativas/${number}`;


    return (
    
    <Card className={styles.card}>

      <CardContent>
      <p className={styles.tema}>{tema}</p>
      <p className={styles.nome}>{`${type} ${number}/${year}`}</p>
      <IconButton
          className={this.state.expanded ? styles.expandOpen : styles.expand}
          onClick={this.handleExpandClick}
          aria-expanded={this.state.expanded}
          aria-label="Show more"
        >
          <ExpandMoreIcon />
      </IconButton>
      <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
        <CardContent>
        <p className={styles.ementa}>{ementa}</p>    
        </CardContent>
      </Collapse>
      <p className={styles.objetivo}>{objetivo}</p>
      <p className={styles.voto}>{voto}</p>
        
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