import React from 'react';

import './styles.scss';
import Categories from './components/categories';
import Products from './components/products';
import Header from './components/header';
import ProductDtl from './components/productDtl'
import CartDetails from './components/cartDtl'
import { Route, Switch } from 'react-router-dom';


export default propsimport => {
  return (
    <div id='main'>
      <Header/>
      <Switch>
        <Route exact path="/">
            <Categories/>
            <Products/>
        </Route>
        <Route exact path="/productDetails/:id" component={ProductDtl} />
        <Route component={CartDetails} exact path="/cartDetails"/>
        <Route>404 Page Not Found!</Route>
      </Switch>

    </div>

  )
};
