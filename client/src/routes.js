import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Sobre from './pages/Sobre';

export default function Routes() {

    return (
        <Switch>
            <Route path='/' exact component={Home}/>
            <Route path='/sobre' component={Sobre}/>
        </Switch>
    )

}