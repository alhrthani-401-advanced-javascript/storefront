import React from 'react';
import { connect } from 'react-redux';
import { deleteFromCart } from '../../store/cart';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { left } from '@popperjs/core';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

const Cart = props => {
    console.log('props in cart component>>>',props);
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        // console.log('event.target.textContent>>>',event.target.textContent);
        props.selectCategory(event.target.textContent)
        setValue(newValue);
    };

    // console.log('cart props', props);

    return (
        <>
            <div className={classes.root}>
                <div style={{ display: 'flex' }}>
                    {props.cart.cart.map((item, idx) => {
                        console.log('>>>>>>>>>>>>>', item.product.name);
                        return (
                            <div key={idx} style={{ border: '1px solid black', width: 'fit-content', padding: '10px', margin: '10px' }}>
                                <h3>{item.product.name}</h3>
                                <p>Quantity : {item.quantity}</p>
                                <p>price : {item.product.price}</p>
                                <Button onClick={()=>{props.deleteFromCart(item)}} variant="contained" color="primary">Delete</Button>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}



// we only care about state from the store, no actions needed
const mapStateToProps = state => ({
    cart: state.cart,
    deleteFromCart: state.cart.deleteFromCart,

});

const mapDispatchToProps = { deleteFromCart };

// no need to add dispatch part (no actions)
export default connect(mapStateToProps, mapDispatchToProps)(Cart);






















