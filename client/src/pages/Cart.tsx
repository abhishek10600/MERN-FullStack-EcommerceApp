import { useEffect, useState } from "react";
import {VscError} from "react-icons/vsc";
import CartItem from "../components/CartItem";
import {Link} from "react-router-dom";

const cartItems = [
  {
    productId:"ase234873289",
    photo:"https://m.media-amazon.com/images/I/71S4sIPFvBL._SX679_.jpg",
    name:"Macbook",
    price:300000,
    quantity:4,
    stock:10
  }
];
const subTotal = 4000;
const tax = Math.round(subTotal * 0.18);
const shippingCharges = 200;
const discount = 400
const total = subTotal + tax + shippingCharges;


const Cart = () => {
  const [couponCode, setCouponCode] = useState<string>("");
  const [isValidCouponCode, setIsValidCouponCode] = useState<boolean>(false);
  useEffect(()=>{
    const timeOutId = setTimeout(() => {
      if(Math.random() > 0.5) setIsValidCouponCode(true);
      else setIsValidCouponCode(false);
    }, 1000);
    return ()=>{
      clearTimeout(timeOutId);
      setIsValidCouponCode(false);
    }
  },[couponCode])
  return (
    <div className="cart">
      <main>
        {
          cartItems.length > 0 ? cartItems.map((i,index)=>(
            <CartItem key={index} cartItem={i} />
          )):<h1>No Items Added</h1>
        }
      </main>
      <aside>
        <p>Subtotal: &#8377; {subTotal}</p>
        <p>Shipping Charges: &#8377; {shippingCharges}</p>
        <p>Tax: &#8377; {tax}</p>
        <p>
          Discount: <em> - &#8377; {discount}</em>
        </p>
        <p>
          <b>Total: &#8377; {total}</b>
        </p>
        <input type="text" placeholder="Enter coupon code" value={couponCode} onChange={e=>setCouponCode(e.target.value)}/>
        {
          couponCode && (
            isValidCouponCode? (
              <span className="green">
                &#8377;{discount} off using the <code>{couponCode}</code> 
              </span>
              ): 
              (
                <span className="red">
                  <VscError/>Invalid Coupon
                </span>
              )
          )
        }
        {
          cartItems.length > 0 && <Link to="/shipping">Checkout</Link>
        }
      </aside>
    </div>
  )
}

export default Cart