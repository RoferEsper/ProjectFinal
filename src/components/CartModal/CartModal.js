import { useState, useContext } from "react";
import { CartContext } from "../CartProvider/CartProvider";
import { useCart } from "../../utils/useCart";

import './CartModal.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {

  faCartShopping,

} from "@fortawesome/free-solid-svg-icons";

export const CartModal = () => {

  const { itemCount } = useContext(CartContext);

  const { CartOpen, setCartOpen } = useCart();
  const { cart, deleteItem } = useContext(CartContext);



  const cartTotalSum = cart.reduce((acc, item) => acc + item.precio, 0);
  const cartItemCount = cart.length;

  return (



    <>
      <div onClick={() => setCartOpen(!CartOpen
      )}
        onMouseLeave={() => setCartOpen(CartOpen
        )}>


        {" "}
        <span className="itemcount">{itemCount}</span>


        <FontAwesomeIcon
          color="grey"
          fontSize={28}
          icon={faCartShopping}
        />
      </div>


      {CartOpen && (
        <div className="cart">

          <h5>Mi carrito [{cartItemCount}]</h5>
          {cartItemCount === 0 ?
            <p className="cartVacio">Tu carrito esta vacio</p> :
            (

              <div className="cart__container">
                {cart.map((item) => {
                  return (
                    <div key={item._id} class="cart__producto">
                      <img src={item.imgUrl} alt='' />
                      <div className="col-1">
                        <p>{item.producto}</p>


                      </div>
                      <div className="col-2">
                        <p>${item.precio}</p>
                        <button onClick={() => deleteItem(item._id)}>Borrar</button>

                      </div>
                    </div>
                  );
                })}
                <h5 className="total">Subtotal: ${cartTotalSum}</h5>
                <a className="comprar" href="/cartpage">Comprar</a>
              </div>

            )}







        </div>)}

    </>
  );
};

export default CartModal;