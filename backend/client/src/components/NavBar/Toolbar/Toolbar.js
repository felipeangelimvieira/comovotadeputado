import React from 'react';
import {Link} from 'react-router-dom';

import './Toolbar.css';
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';
const toolbar = props => (
    <header className="toolbar">
        <nav className="toolbar_navigation">
            <div className="toolbar_toggle-button">
                <DrawerToggleButton click={props.drawerClickHandler}/>
            </div>
            <div className="toolbar_logo"> <a href="/">Como vota, deputado?</a></div>
            <div className="spacer"></div>
            <div className="toolbar_navigation-items">
                <ul>
                    <li><Link to="/sobre">Sobre</Link></li>
                </ul>
            </div>
        </nav>
    </header>
);

export default toolbar;

