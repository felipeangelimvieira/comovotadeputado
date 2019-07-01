import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Comovota from './pages/Comovota';

export default function Routes() {

    return (
        <Switch>
            <Route path='/' component={Comovota}/>
        </Switch>
    )

}