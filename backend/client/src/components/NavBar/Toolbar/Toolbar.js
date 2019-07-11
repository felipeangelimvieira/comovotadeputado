import React from 'react';
import {Link} from 'react-router-dom';
import styles from '../../../styles/typography.module.css'
import './Toolbar.css';
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';


const toolbar = props => (
    <header className="toolbar">
        <nav className="toolbar_navigation">
            <div className="toolbar_toggle-button">
                <DrawerToggleButton click={props.drawerClickHandler}/>
            </div>
            <div className="toolbar_logo"> <a href="/"><h4 className={styles.h4}>Como vota, deputado?</h4></a></div>
            <div className="spacer"></div>
            <div className="toolbar_navigation-items">
                <ul>
                    <li><Link to="/sobre"><h5 className={styles.h5}>Sobre</h5></Link></li>
                </ul>
            </div>
        </nav>
    </header>
);

export default toolbar;

