import React from 'react';
import '../styles/Sobre.css'

export default class Sobre extends React.Component {

    render() {

        return (<div className="sobre-container">
                    <h1>Sobre</h1>
                    <div className="sobre-content">
                    <p> "Como vota, deputado?" é uma iniciativa de cidadãos brasileiros preocupados com a transparência
                       do congresso nacional. Esse projeto visa complementar a base de dados aberta do congresso
                       prezando por uma interface mais simples e acessível. O site ainda está sendo construído,
                       sinta-se a vontade para contribuir em nosso github.</p>   
                    </div>
                </div>);
    }
}