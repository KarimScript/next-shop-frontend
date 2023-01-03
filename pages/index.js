import React,{useState,useEffect} from 'react'
import Head from 'next/head'
import Image from 'next/image'
import HeroBanner from '../components/HeroBanner'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProductCard from '../components/ProductCard'
import { fetchAPI } from '../lib/api';
import { useStateContext } from '../context/StateContext'
// import { getCookie, deleteCookie ,hasCookie} from 'cookies-next'

export default function Home({banner,products}) {
  // console.log('strapi product:',products)

  useEffect(() => {
    document.addEventListener('snipcart.ready',()=>{
      Snipcart.store.subscribe(() => {
        const Items = Snipcart.store.getState().cart.items.items;
        // console.log('snipcart items:',Items)
      });
    })
  
  }, [])

  const { setCartItems } = useStateContext();
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(0);
  const [filteredProducts, setFilteredProducts] = useState(products)

// fetch categories from all products
  products?.map((item)=>{
    let category = item.attributes.category.data;
    if(categories.findIndex(object => object.id === category.id)===-1){
      categories.push({id:category.id,name:category.attributes.name})
    }
  })


  useEffect(() => {
    setFilteredProducts(products?.filter((item)=>
    activeCategory > 0 ? item.attributes.category.data.id===activeCategory : item 
    ))
  
  }, [activeCategory])
  




  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className="main-container">
        <HeroBanner heroBanner={banner} />
        <div className="products-heading">
         <h2>Our Products</h2>
         <div className='filter'>
            <h3  
            onClick={()=>setActiveCategory(0)}
            className={activeCategory === 0 ? 'active' : '' } key={0}
            >
              All
            </h3>
           {categories.map((item)=>(
            <h3 onClick={()=>setActiveCategory(item.id)} 
            key={item.id}
            className={activeCategory === item.id ? 'active' : '' }
            >
            {item.name}
            </h3>
           ))}
         </div>
        </div>
        <div className="products-container">
         {filteredProducts?.map((product) => <ProductCard key={product.id} product={product}  />)}
        </div>
      </main>
     
    </>
  )
}


export async function getStaticProps() {

  const bannerData =  await fetchAPI("/hero-banner?populate=*");
  const products = await fetchAPI("/products?populate=*");
 
   return {
     props: {
       banner: bannerData.data,
       products : products.data,
     },
     revalidate: 10,
   }
 }
 