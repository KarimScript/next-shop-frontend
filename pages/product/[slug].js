import React,{useState,useEffect} from 'react'
import { fetchAPI , getStrapiURL } from '../../lib/api'
import Image from 'next/image'
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { useStateContext } from '../../context/StateContext';
// import { getCookie , hasCookie } from 'cookies-next';

const ProductDetails = ({product}) => {


    const [index, setIndex] = useState(0);
    const { decQty, incQty, qty, onAdd, setShowCart ,setCartItems , getPriceAfterSale} = useStateContext();


    // useEffect(() => {
    //   if(hasCookie('cart')){
    //    const items = JSON.parse(getCookie('cart')) ;
    //    if(items){
    //      setCartItems(items) ;
    //      console.log('pasred from cookie :' , items)
    //    }
    //   }
       
    //  }, [])



    const handleBuyNow = () => {
        onAdd(product, qty);
    
        setShowCart(true);
      }

  return (
<div>
    <div className="product-detail-container">
       
          <div className="image-container">
            <Image 
            src={getStrapiURL(product.attributes.mainImage.data.attributes.url)} 
            className="product-detail-image"
            width={450}
            height={450}
            alt='product' />
          </div>
         
    

        <div className="product-detail-desc">
          <h1>{product.attributes.name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>
              (20)
            </p>
          </div>
          <h4>Details: </h4>
          <p>{product.attributes.description}</p>
          
          {product.attributes.SalePercentage > 0 ? (
            <>
            <h3 className='sale-txt'>
            A sale of <span style={{color:'rgb(32 178 105)'}} > {product.attributes.SalePercentage}% </span>
            </h3>
             <div className='sales'>
              <p className="price old-price">${product.attributes.price} </p>
             
              <p className="price new"> ${getPriceAfterSale(product)}</p>

             </div>
             </>
          ) : (
            <p className="price">${product.attributes.price}</p>
          )}
         
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}><AiOutlineMinus /></span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={incQty}><AiOutlinePlus /></span>
            </p>
          </div>
          <div className="buttons">
            <button type="button" className="add-to-cart" onClick={() => onAdd(product, qty)}>Add to Cart</button>
            <button type="button" className="buy-now" onClick={handleBuyNow}>Buy Now</button>
          </div>
        </div>
    </div>
</div>
  )
}

export default ProductDetails




export async function getStaticPaths() {
    const products = await fetchAPI("/products");
  
    return {
      paths: products?.data.map((item) => ({
        params: {
          slug: item.attributes.slug,
        },
      })),
      fallback: false,
    }
  }

  export async function getStaticProps({ params }) {
    const matchingProduct = await fetchAPI(`/products?filters\[Slug\][$eq]=${params.slug}&populate=*`)
  
    return {
      props: {
        product: matchingProduct?.data[0] ,
      },
      revalidate: 10,
    }
  }

