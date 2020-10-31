import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import {deleteFromCart} from '../../store/cart';

const Cart = props => {
    console.log('props in cart details', props);
    return (
        <>
            <div className='cart'>
                <div style={{ display: 'flex',flexDirection:'column' }}>
                    {props.cart.cart.map((item, idx) => {
                            // console.log('>>>>>>>>>>>>>', props.selectedCategory);
                            return (
                                <div key={idx} style={{ border: '1px solid black', width: '90%', padding: '10px', margin: '10px' }}>
                                    <h3>{item.product.name}</h3>
                                    <p>price : {item.product.price}</p>
                                    <p>Quantity : {item.quantity}</p>
                                    <Button onClick={()=>{props.deleteFromCart(item)}} variant="contained" color="primary">Delete</Button>
                                </div>
                            )
                    })}
                </div>
            </div>
        </>
    );
}
// we only care about state from the store, no actions needed
const mapStateToProps = state => (
    {
    cart:state.cart,
    deleteFromCart : state.cart.deleteFromCart
}
);

const mapDispatchToProps = { deleteFromCart };
export default connect(mapStateToProps,mapDispatchToProps)(Cart);