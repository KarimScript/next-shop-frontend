import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import {getCookie , hasCookie, setCookie } from 'cookies-next'

const Context = createContext();

export const StateContext = ({ children }) => {

  // const cart = hasCookie('cart') ? JSON.parse(getCookie('cart')) : null ;
  // const items = cart ? cart.cartItems : null ;
  // const total = cart ? cart.total : null ;
  // const quantities = cart ? cart.quantities : null ;

  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);
  
  let foundProduct;
  let items = []


  useEffect(() => {
 
    document.addEventListener('snipcart.ready', ()=>{
      setCartItems(
         Snipcart.store.subscribe(() => {
          return Snipcart.store.getState().cart.items.items;
          
         })
      )
      // console.log('cartItems state:',cartItems)
      
    })
  
  }, [])
  

  const getPriceAfterSale = (product) =>{
    let priceAfterSale = product.attributes.price;
    if(product.attributes.SalePercentage !==null || product.attributes.SalePercentage>0){
        let mainPrice = product.attributes.price;
        let salePercentage = product.attributes.SalePercentage
        priceAfterSale = mainPrice - (mainPrice*salePercentage/100);
    }
    return priceAfterSale ;
  }


  const checkProductInCart = (product) =>{

   return cartItems?.find((item) => item.id === product.id);  
    
  }

  const onAdd = (product, quantity) => {
   
    setTotalPrice((prevTotalPrice) => prevTotalPrice + getPriceAfterSale(product)* quantity);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
    
    if(checkProductInCart(product)) {
      const updatedCartItems = cartItems?.map((cartProduct) => {
        if(cartProduct.id === product.id) return {
          ...cartProduct,
          quantity: cartProduct.attributes.quantity + quantity
        }
      })

      setCartItems(updatedCartItems);
      
    } else {
      product.quantity = quantity;
      
      setCartItems([...cartItems, { ...product }]);
     
      
    }
    setCookie('cart',JSON.stringify({
      cartItems: cartItems,
      total:totalPrice,
      quantities:totalQuantities
    }),{maxAge:60*60*24*7});
    
    toast.success(`${qty} ${product.attributes.name} added to the cart.`);
  } 

  const onRemove = (product) => {
    foundProduct = cartItems?.find((item) => item.id === product.id);
    const newCartItems = cartItems?.filter((item) => item.id !== product.id);

    setTotalPrice((prevTotalPrice) => prevTotalPrice -getPriceAfterSale(foundProduct) * foundProduct.quantity);
    setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
    setCartItems(newCartItems);
    setCookie('cart',JSON.stringify({
      cartItems: cartItems,
      total:totalPrice,
      quantities:totalQuantities
    }),{maxAge:60*60*24*7});
    
  }

  const toggleCartItemQuanitity = (id, value) => {
    foundProduct = cartItems?.find((item) => item.id === id)
    index = cartItems?.findIndex((product) => product.id === id);
    const newCartItems = cartItems?.filter((item) => item.id !== id)

    if(value === 'inc') {
      setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 } ]);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + getPriceAfterSale(foundProduct))
      setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1)
    } else if(value === 'dec') {
      if (foundProduct.quantity > 1) {
        setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 } ]);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - getPriceAfterSale(foundProduct))
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1)
      }
    }
    setCookie('cart',JSON.stringify({
      cartItems: cartItems,
      total:totalPrice,
      quantities:totalQuantities
    }),{maxAge:60*60*24*7});
    
  }

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  }

  const decQty = () => {
    setQty((prevQty) => {
      if(prevQty - 1 < 1) return 1;
     
      return prevQty - 1;
    });
  }

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuanitity,
        onRemove,
        setCartItems,
        setTotalPrice,
        setTotalQuantities, 
        getPriceAfterSale,
        checkProductInCart
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context);



    // if(hasCookie('cart')){
    //   setCartItems(JSON.parse(getCookie('cart')).cartItems);
    //   setTotalPrice(JSON.parse(getCookie('cart')).total);
    //   setTotalQuantities(JSON.parse(getCookie('cart')).quantities);
    // }