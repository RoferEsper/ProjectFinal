import { createContext } from "react";
import { useLocalStorage } from "../../utils/useLocalStorage";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useLocalStorage("cart", []);
 

  const addItem = (newItem) => {
    setCart((prev) => {
      return [...prev, newItem];
    });
  };

  const deleteItem = (id) => {
    const newCart = cart.filter((item) => item._id !== id);
    setCart(newCart);
  };

  const cartTotalSum = cart.reduce((acc, item) => acc + item.precio, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addItem,
        deleteItem,
        itemCount: cart.length,
        cartTotalSum,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;