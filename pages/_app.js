import { useEffect } from 'react';
import '../styles/globals.css'
import { StateContext } from '../context/StateContext';
import AuthProvider from '../components/AuthProvider/AuthProvider';
import { Toaster } from 'react-hot-toast';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useStateContext } from '../context/StateContext';
import { getCookie } from 'cookies-next'

export default function App({ Component, pageProps }) {

  
  return (
   <AuthProvider >
    <StateContext>
     <Navbar />
     <Toaster />
     <Component {...pageProps} />
     <Footer />
    </StateContext>
   </AuthProvider>
  )
}
