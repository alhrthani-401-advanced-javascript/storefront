import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { deleteFromCart } from '../../store/cart';
import { Link } from 'react-router-dom';

const Cart = props => {
    return (
        <>
            <div className='cart'>
                <Link to="/cartDetails">see more details</Link>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {props.cart.cart.map((item, idx) => {
                        return (
                            <div key={idx} style={{ border: '1px solid black', width: '90%', padding: '10px', margin: '10px' }}>
                                <h3>{item.product.name}</h3>
                                <p>price : {item.product.price}</p>
                                <p>Quantity : {item.quantity}</p>
                                <Button onClick={() => { props.deleteFromCart(item) }} variant="contained" color="primary">Delete</Button>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    );
}
const mapStateToProps = state => (
    {        cart: state.cart,   }
);

const mapDispatchToProps = { deleteFromCart };
export default connect(mapStateToProps, mapDispatchToProps)(Cart);