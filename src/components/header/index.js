import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from 'react-redux';
import { selectCategory } from '../../store/categories';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { left } from '@popperjs/core';



const Header = props => {
  console.log('props in header>>',props.cartSize.size);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
      // console.log('event.target.textContent>>>',event.target.textContent);
      props.selectCategory(event.target.textContent)
      setValue(newValue);
  };

  // console.log('----', props);
  // let selectedCategory = props.selectCategory;
  // function handleCategoryClick(e) {
  //     console.log(e.target.textContent);
  //     selectedCategory = e.target.textContent
  //     selectCategory(e.target.textContent)
  // }
  return (
    <div> 
    <h1>OUR STORE</h1>
  <p>Cart: {props.cartSize.size}</p>
    </div>
  )
}

  


// we only care about state from the store, no actions needed
const mapStateToProps = state => ({
  cartSize: state.cart,

});


// no need to add dispatch part (no actions)
export default connect(mapStateToProps)(Header);


