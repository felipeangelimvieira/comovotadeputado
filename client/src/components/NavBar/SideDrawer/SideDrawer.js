import React from 'react';
import {Link} from 'react-router-dom';
import './SideDrawer.css';
import styles from '../../../styles/typography.module.css'

const sideDrawer = props => {
    
    let drawerClasses = ['side-drawer'];
    if (props.show) {
        drawerClasses = ['side-drawer', 'open']
    }

    return (
    <nav className={drawerClasses.join(' ')}>
        <ul>
            <li><Link to="/sobre"><h5 className={styles.h5}>Sobre</h5></Link></li>
        </ul>
    </nav>
);}

export default sideDrawer;