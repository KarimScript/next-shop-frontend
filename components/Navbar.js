import React from 'react'
import Link from 'next/link'
import { useStateContext} from '../context/StateContext';
import { AiOutlineShopping ,AiOutlineUser } from 'react-icons/ai'
import { removeToken } from '../helpers';
import { useAuthContext } from '../context/AuthContext';
import { useRouter } from 'next/router'
import Cart from './Cart'

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();
  const { user } = useAuthContext();
  const router = useRouter();

  const handleLogout = () => {
    removeToken();
    router.replace('/');
    router.reload();
  };

  return (
   
    <div className="navbar-container">
      <h1 className="logo">
        <Link href="/">ELECTRO</Link>
      </h1>
        
     <div className='btns'>
      <button type="button" className="cart-icon" onClick={() => setShowCart(true)}>
        <AiOutlineShopping />
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>

      <div className='auth-btns'>
        {user ? (
          <>
          <Link className='profile-btn' href='/profile'><AiOutlineUser size={30}/> {user?.username}</Link>
          <button className='logout-btn' onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
          <Link className='login-btn' href='/login'>Login</Link>
          <Link href='/register'>Sign up</Link>
          </>
        ) }
         
      </div>
     </div>

      {showCart && <Cart />}
    </div>
 
  )
}

export default Navbar