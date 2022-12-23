import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { getStrapiURL } from '../lib/api';
import { useStateContext } from '../context/StateContext';
import { BsBagPlus , BsFillBagCheckFill } from 'react-icons/bs'

const ProductCard = ({product}) => {

  const {getPriceAfterSale , checkProductInCart , onAdd , onRemove} = useStateContext();

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
          {checkProductInCart(product) ? (
            <div onClick={() => onRemove(product)} className='add add-to-cart'> <BsFillBagCheckFill size={30} /></div>
          ) : (
            <div onClick={() => onAdd(product, 1)} className='add added-to-cart'> <BsBagPlus size={30} /></div>
          )}
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