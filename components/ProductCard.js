import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { getStrapiURL } from '../lib/api';
import { useStateContext } from '../context/StateContext';
import { BsBagPlus , BsFillBagCheckFill } from 'react-icons/bs'
import { toast } from 'react-hot-toast';

const ProductCard = ({product}) => {

  const {getPriceAfterSale , checkProductInCart , onAdd , onRemove} = useStateContext();

  // const checkProductInSnipcart = (product) =>{
  //   if (typeof window !== "undefined") {

  //   document.addEventListener('snipcart.ready',()=>{
  //      Snipcart.store.subscribe(() => {
  //       console.log(Snipcart.store.getState().cart.items.items.find((item) => item.id == product.id))
  //       return Snipcart.store.getState().cart.items.items.find((item) => item.id == product.id);
        
  //     });
  
  //   })
  //  }   
  // }

  const AddToCart = async (product) => {

    try {
      await Snipcart.api.cart.items.add({
          id: product.id,
          name: product.attributes.name,
          price: getPriceAfterSale(product),
          url: `/product/${product.attributes.slug}`,
          quantity: 1,
      });
     

  } catch (error) {
      console.log(error);
  }
  toast.success(`${product.attributes.name} added to the cart.`);
  }


  return (
    <div>
       
        <div className="product-card">
          <Image 
            src={getStrapiURL(product.attributes.mainImage.data.attributes.url)}
            width={250}
            height={250}
            className="product-image"
            alt='product'
          />
        
            <div onClick={()=>AddToCart(product)} className='add add-to-cart'> <BsBagPlus size={30} /></div>
          
          {product.attributes.SalePercentage > 0 && (
            <h3 className='card-sale-mark'> {product.attributes.SalePercentage}% SALE !</h3>
          )}
          <div className='card-info'>
           <p className="product-name">{product.attributes.name}</p>
           <p className="product-price">${getPriceAfterSale(product)}</p>
          </div>
          <Link className='details-btn' href={`/product/${product.attributes.slug}`}>View details</Link>
        </div>
      
    </div>
  )
}

export default ProductCard