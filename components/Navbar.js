import React from "react";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineShoppingCart, AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { useRef } from "react";
import { BsPatchPlusFill, BsPatchMinusFill } from "react-icons/bs";
import { IoBagCheck } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";
import { useState } from "react";


const Navbar = ({logout, user, cart, addToCart, removeFromCart, clearCart, subTotal }) => {
  const [dropdown, setDropdown] = useState(false)
  console.log(cart, addToCart, removeFromCart, clearCart, subTotal)
  const toggleCart = () => {
    if (ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-full");
      ref.current.classList.add("translate-x-0");
    } else if (!ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-0");
      ref.current.classList.add("translate-x-full");
    }
  };

  const ref = useRef();
  return (
    <div className="flex flex-col md:flex-row md:justify-start justify-center items-center shadow-md sticky top-0 bg-white z-10">
      <div className="logo mr-auto md:mx-5">
        <Link href={"/"} passHref>
          <a>
            <Image src="/jaipa logo.png" alt="" width={175} height={70} />
          </a>
        </Link>
      </div>
      <div className="nav">
        <ul className="flex items-center space-x-4 font-bold md:text-md p-5">
          <Link href={"/tshirts"} passHref>
            <a>
              <li className="hover:text-purple-500">T-Shirts</li>
            </a>
          </Link>
          <Link href={"/hoodies"} passHref>
            <a>
              <li className="hover:text-purple-500">Hoodies</li>
            </a>
          </Link>
          <Link href={"/stickers"} passHref>
            <a>
              <li className="hover:text-purple-500">Stickers</li>
            </a>
          </Link>
          <Link href={"/mugs"} passHref>
            <a>
              <li className="hover:text-purple-500">Mugs</li>
            </a>
          </Link>
        </ul>
      </div>
      <div
        className="cart items-center absolute right-0 top-4 mx-5 cursor-pointer flex"
      >
        <span onMouseOver={()=>{setDropdown(true)}} onMouseLeave={()=>{setDropdown(false)}}>
        {dropdown && <div onMouseOver={()=>{setDropdown(true)}} onMouseLeave={()=>{setDropdown(false)}} className="absolute right-8 bg-white shadow-lg border-2 top-7 py-2 rounded-md px-5 w-32">
        <ul>
          <Link href={'/myaccount'} passHref><a><li className="py-1 hover:text-purple-700 text-sm font-bold">My Account</li></a></Link>
          <Link href={'/orders'} passHref><a><li className="py-1 hover:text-purple-700 text-sm font-bold">Orders</li></a></Link>
          <li onClick={logout} className="py-1 hover:text-purple-700 text-sm font-bold">Logout</li>
        </ul>
      </div>}
        {user.value && <MdAccountCircle className="text-3xl mx-2"/>}
        </span>
        {!user.value && <Link href={'/login'}><a>
          <button className="bg-purple-600 px-2 py-1 rounded-md text-sm text-white mx-2">Login</button>
          </a></Link>}
        <AiOutlineShoppingCart onClick={toggleCart} className="text-3xl" />
      </div>

      <div
        ref={ref}
        className={`w-72 h-[100vh] sidecart overflow-y-scroll absolute top-0 right-0 bg-purple-100 px-8 py-10 transform transition-transform ${Object.keys(cart).length!==0?'translate-x-0' : 'translate-x-full'}`}
      >
        <h2 className="font-bold text-xl text-center">Shopping cart</h2>
        <span
          onClick={toggleCart}
          className="absolute top-2 right-2 cursor-pointer text-2xl text-purple-600"
        >
          <IoMdClose />
        </span>
        <ol className="list-decimal font-semibold">
          {Object.keys(cart).length==0 && 
          
          
          <div className="my-4 font-semibold mx-2">Your cart is empty!</div>}
          {Object.keys(cart).map((k)=>{return <li key={k}>
            <div className="item flex my-5">
            <div className="w-2/3 font-semibold">{cart[k].name} ( {cart[k].size} / {cart[k].variant} )</div>
            <div className=" flex items-center justify-center w-1/3 font-semibold text-lg">
            <BsPatchMinusFill onClick={()=>{removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant)}}className="cursor-pointer text-purple-600"/> 
            <span className="mx-2 text-sm">{cart[k].qty}</span> 
            <BsPatchPlusFill onClick={()=>{addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant)}}className="cursor-pointer text-purple-600"/></div>
            </div>
          </li>})}
        </ol>
        <div className="font-bold my-4">Subtotal: ₹{subTotal}</div>
        <div className="flex">
        <Link href={'/checkout'} passHref><button disabled={Object.keys(cart).length === 0 } className="disabled:bg-purple-300 flex mx-2  text-white bg-purple-500 border-0 py-2 px-2 focus:outline-none hover:bg-purple-600 rounded text-sm"><IoBagCheck className=" m-1 text-sm"/>Checkout</button></Link>
        <button disabled={Object.keys(cart).length === 0} onClick={clearCart} className="disabled:bg-purple-300 flex mx-2 text-white bg-purple-500 border-0 py-2 px-2 focus:outline-none hover:bg-purple-600 rounded text-sm">Clear Cart</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
