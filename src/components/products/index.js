import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { addToCart } from '../../store/cart';
import { setProducts, updateInStock } from '../../store/products'
import { reduceStockQuantity, getRemoteProductData } from '../../store/apiActions'
import { Link } from 'react-router-dom';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    const useStyles = makeStyles((theme) => ({
        root: {
            '& > *': {
                margin: theme.spacing(1),
            },
        },
    }));
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};
function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));
const Products = props => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
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
        let data = await getRemoteProductData()
        props.setProducts(data)
    }, []);
    return (
        <>
            <div className={classes.root}>
                <div style={{ display: 'flex' }}>
                    {props.products.map((product, idx) => {
                        if (product.category.toLowerCase() == props.selectedCategory.toLowerCase()) {
                            console.log('>>>>>>props.selectedCategory>>>>>>>', props.selectedCategory);
                            return (
                                <div key={idx} style={{ border: '1px solid black', width: 'fit-content', padding: '10px', margin: '10px' }}>
                                    
                                        <h3 id='productName'>{product.name}</h3>
                                        <img id='productImg' src={`${product.img}`} style={{ width: '15rem' }}></img>
                                        <p>in stok : <strong>{product.inStock}</strong></p>
                                        <p>price : <strong id='producPrice'>{product.price}</strong></p>
                                    
                                        <Button onClick={() => { handleAddToCart(product) }} variant="contained" color="primary">Order</Button>
                                        <Link to={{pathname: "/productDetails/"+product._id ,state: product  }}>View Details</Link>
                                </div>
                            )
                        }
                    })}
                </div>
            </div>
        </>
    )
}
const mapStateToProps = state => (
    {
        products: state.products.products,
        selectedCategory: state.categories.selectedCategory
    }
);
const mapDispatchToProps = { addToCart, setProducts, updateInStock };
export default connect(mapStateToProps, mapDispatchToProps)(Products);