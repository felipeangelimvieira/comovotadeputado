import React from 'react'
import imagem_congresso from '../../assets/imagem_congresso.jpg';
import {Image} from 'react-bootstrap';
import styles from '../../styles/Landing.module.css';

export default function landing() {

    
    return (
    <div>
        <Image
            className={styles.background}
            responsive
            src={imagem_congresso}>
          </Image>
          <h1 className={styles.textStyle}>Você sabe quem seu candidato foi durante as eleições. <br/> Quem ele é agora? </h1>
    </div>
    )
}