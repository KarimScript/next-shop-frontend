import React,{useState,useEffect} from 'react'
import { fetchAPI , getStrapiURL } from '../../lib/api'
import Image from 'next/image'
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { useStateContext } from '../../context/StateContext';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
// import { getCookie , hasCookie } from 'cookies-next';

const ProductDetails = ({product , related}) => {
console.log(product)
// console.log('related : ' ,related)

    const [index, setIndex] = useState(0);
    const { decQty, incQty, qty, onAdd, setShowCart ,setCartItems , getPriceAfterSale} = useStateContext();
    const router = useRouter();
    

    const handleBuyNow = () => {
        AddToCart(product, qty);
        
        Snipcart.api.theme.cart.open()
        
      }

  const AddToCart = async (product,qty) => {

    try {
      await Snipcart.api.cart.items.add({
          id: product.id,
          name: product.attributes.name,
          price: getPriceAfterSale(product),
          url: `/product/${product.attributes.slug}`,
          quantity: qty,
      });
      toast.success(`${qty} ${product.attributes.name} added to the cart.`);

  } catch (error) {
      console.log(error);
      toast.error('An error occured!')
  }
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
            <button type="button" className="add-to-cart snipcart-add-item"
             data-item-id={product.id}
             data-item-url={`/product/${product.attributes.slug}`}
             data-item-price={getPriceAfterSale(product)}
             data-item-image={getStrapiURL(product.attributes.mainImage.data.attributes.url)}
             data-item-name={product.attributes.name}
             data-item-quantity={qty}
            >Add to Cart</button>
            <button type="button" className="buy-now" onClick={handleBuyNow}>Buy Now</button>
          </div>
        </div>

        {/* 
         onClick={() => onAdd(product, qty)}
        <div className="maylike-products-wrapper">
          <h2>You may also like</h2>
          <div className="marquee">
            <div className="maylike-products-container track">
              {products.map((item) => (
                <Product key={item._id} product={item} />
              ))}
            </div>
          </div>
      </div> */}
    </div>
</div>
  )
}

export default ProductDetails




export async function getStaticPaths() {
    const products = await fetchAPI("/products?populate=*");
  
    return {
      paths: products?.data.map((item) => ({
        params: {
          slug: item.attributes.slug,
          category:item.attributes.category.data.id ,
        },
      })),
      fallback: false,
    }
  }

  export async function getStaticProps({ params }) {
    const matchingProduct = await fetchAPI(`/products?filters\[Slug\][$eq]=${params.slug}&populate=*`)
    const relatedProduct = await fetchAPI(`/products?filters\[category\][id][$eq]=${params.category}&populate=*`)
    return {
      props: {
        product: matchingProduct?.data[0] ,
        related : relatedProduct?.data
      },
      revalidate: 3,
    }
  }

