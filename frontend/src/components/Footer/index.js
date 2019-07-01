import React, {Component} from 'react';
import './footer.css'

class Footer extends Component {

    render() { 
        return (
            <footer className="footer">
            <div className="footer-content" style = {{position: 'relative', left: 0, marginTop: '50vh', bottom: 0, width: '100%', textAlign: 'center'}}>
            footer
            </div>
            </footer>
        )
    }

}

export default Footer;