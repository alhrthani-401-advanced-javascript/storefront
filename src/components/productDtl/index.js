import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { addToCart } from '../../store/cart';
import { setProducts, updateInStock } from '../../store/products'
import { reduceStockQuantity, getRemoteProductData } from '../../store/apiActions'




const ProductDtl = props => {  
    const id=props.match.params.id;    

    
    
    const handleAddToCart = async (product) => {
        if (product.inStock > 0) {
            props.addToCart(product);
            await reduceStockQuantity(product)
            props.updateInStock(product._id);
        } else {
            alert('No available Items left')
        }

    }

    useEffect(async () => {
        if(props.products.length==0){
            let data = await getRemoteProductData()
            props.setProducts(data);
        }
    
    }, []);



    return (
        <>
            <div className="">
                <div style={{ display: 'flex' }}>
                {props.products.map((product) => {
            if (product._id == id) {
                return(
                    <div style={{ border: '1px solid black', width: 'fit-content', padding: '10px', margin: '10px' }}>
                        <h3 id='productName'>{product.name}</h3>
                        <img id='productImg' src={`${product.img}`} style={{ width: '15rem' }}></img>
                        <p><strong>In stok: </strong>{product.inStock}</p>
                        <p><strong>Price: </strong>{product.price}</p>
                        <p><strong>Description: </strong>{product.description} </p>
                        <Button onClick={() => { handleAddToCart(product) }} variant="contained" color="primary">Order</Button>
                </div>
                )         
           }})}                 
                </div>
            </div>
        </>
    )
}

const mapStateToProps = state => (
    {        products: state.products.products,    }
);

const mapDispatchToProps = { addToCart, setProducts, updateInStock };

export default connect(mapStateToProps, mapDispatchToProps)(ProductDtl);