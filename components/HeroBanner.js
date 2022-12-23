import React from 'react';
import Link from 'next/link';
import Image from 'next/image'
import { getStrapiURL } from '../lib/api';

const HeroBanner = ({ heroBanner }) => {

  let mainPrice = heroBanner.attributes.product.data.attributes.price;
  let salePercentage = heroBanner.attributes.product.data.attributes.SalePercentage
  let priceAfterSale = mainPrice - (mainPrice*salePercentage/100);

  return (
    <div className="hero-banner-container">
      <div>
        <h3> {heroBanner.attributes.miniText}</h3>
        <h1>{heroBanner.attributes.bigText}</h1>
        <Image 
        src={getStrapiURL(heroBanner.attributes.image.data.attributes.url)} 
        alt="headphones" className="hero-banner-image"
        width={450}
        height={450}
        quality={60}
         />

        <div >
          <Link href={`/product/${heroBanner.attributes.product.data.attributes.slug}`}>
            <button className='mainButton' type="button">{heroBanner.attributes.btnText}</button>
          </Link>
          <h4 className='sale-date'>Sale available till {heroBanner.attributes.saleTime}</h4>
        </div>
        
        <div className='percentage'>
         <h4 >{heroBanner.attributes.discount}</h4>
        </div>
        
        <div className='product-info'>
          <h4>{heroBanner.attributes.product.data.attributes.name} | ${priceAfterSale}</h4>
          <p>{heroBanner.attributes.product.data.attributes.description.slice(0,180)}...</p>
        </div>

        
      </div>
    </div>
  )
}

export default HeroBanner