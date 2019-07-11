import React, {Component} from 'react';
import {Image} from 'react-bootstrap';
import githubMark from '../../assets/GitHub-Mark-32px.png'
import { Link } from 'react-router-dom';
import './footer.css'

class Footer extends Component {

    render() { 
        return (
            <footer className="footer">
            <div className="footer-container">
                
                <div className="image-container">
                
                <a href="https://github.com/felipeangelimvieira/comovotadeputado">
                    <Image src={githubMark} rounded size='lg' />
                </a>
                <p>Contribua em nosso github</p>
                </div>
            </div>
            </footer>
        )
    }

}

export default Footer;