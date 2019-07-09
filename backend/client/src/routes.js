import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Comovota from './pages/Comovota';
import Sobre from './pages/Sobre';

export default function Routes() {

    return (
        <Switch>
            <Route path='/' exact component={Comovota}/>
            <Route path='/sobre' component={Sobre}/>
        </Switch>
    )

}