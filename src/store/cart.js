let initalState = {    
  cart: [],
  size: 0,
};



// reducer 

export default (state = initalState, action) => {
  console.log(' action in cart>>>',action);
  let {type, payload} = action;
  let cart = state.cart;
  let size=state.size;
  console.log('cart',cart);
  switch(type) {
  case 'ADD_TO_CART':
    console.log('ADD_TO_CART pay load',payload);
    let existItem=false;
    state.cart.forEach(element => {
      if(element.product.name===payload.name){
        element.quantity++;
                    
        existItem=true;
        console.log('cart in after adding cart>>',cart);
        return {cart:state.cart,size:state.size};
      }        
                
    });
    if (!existItem){
      state.cart.push({product:payload,quantity:1});
      state.size++;
      console.log('cart in after adding cart>>',cart);

      return {cart:state.cart,size:state.size};
    }
    console.log('initalState.selectedCategory',initalState.selectedCategory);
    return {cart:state.cart,size:state.size};
  case 'DELETE_FROM_CART':
    state.cart.forEach((item,idx) =>{
      console.log('**from store***',item.product.name);
      console.log('** from user**',payload.product.name);
      if(item.product.name == payload.product.name){
        console.log('**inside if**');
        state.size--;
        cart.splice(idx,1);
      }
    });
    console.log('cart after edit',cart);
    return {cart:state.cart,size:state.size};

        

  default:
    return {cart:state.cart,size:state.size};
  }
};
// actions
export const addToCart =(item) =>{
  console.log('add item to cart',item);
  return {
    type: 'ADD_TO_CART',
    payload: item,
  };
};

export const deleteFromCart =(item) =>{
  console.log('DELETE_FROM_CART',item);
  return {
    type: 'DELETE_FROM_CART',
    payload: item,
  };
};