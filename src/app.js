import React from 'react';

import './styles.scss';
// import VotesCounter from './components/vote-counter'; 
import Categories from './components/categories'; 
import Header from './components/header';
import Products from './components/products'; 
import Cart from './components/cart'; 




export default props => {
  return (
    <>
    <Header>
    </Header>
    <Categories />
    <Products/>
    <Cart/>
        {/* <VotesCounter /> */}
    </>

  )
};