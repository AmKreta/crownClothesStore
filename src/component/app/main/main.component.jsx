import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

//importing custom components
import Home from './home/home.component';
import ShopItem from './shopItem/shopItem.component';
import Shop from './shop/shop.component';
import Checkout from './checkout/checkout.component';

const Main = ({match}) => {
    return (
        <Switch>
            <Route exact path='/' component={Home} />
            <Route path={`/shop/:item`} component={ShopItem} />
            <Route path='/shop' component={Shop} />
            <Route path='/checkout' component={Checkout} />
            <Redirect to='/404' />
        </Switch>
    );
}

export default Main;