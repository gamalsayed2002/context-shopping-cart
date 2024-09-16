import { createContext, useContext, useEffect, useState } from "react";
import ShoppintCart from "../components/ShoppintCart";
const shoppingCartContext = createContext({});
const initialCartItems = localStorage.getItem("shopping-cart")
  ? JSON.parse(localStorage.getItem("shopping-cart"))
  : [];

export default function ShoppingCartProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const openCart = () => {
    setIsOpen(true);
  };
  const closeCart = () => {
    setIsOpen(false);
  };
  const [cartItems, setCartItems] = useState(initialCartItems);
  useEffect(() => {
    localStorage.setItem("shopping-cart", JSON.stringify(cartItems));
  }, [cartItems]);
  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );
  const getItemsQuantity = (id) => {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  };

  const increaseItemQuantity = (id) => {
    setCartItems((currItems) => {
      // هتدور علي العنصر عندك في التايت و لو ملقتوش هتضيف ع العناصر القديمة الايدي الي اتبعتلك و العدد هيبقي واحد
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const decreaseItemQuantity = (id) => {
    setCartItems((currItems) => {
      // هتدور علي العنصر عندك في التايت و لو ملقتوش هتضيف ع العناصر القديمة الايدي الي اتبعتلك و العدد هيبقي واحد
      if (currItems.find((item) => item.id === id) == null) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const removeItem = (id) => {
    setCartItems((currItems) => currItems.filter((item) => item.id !== id));
  };

  return (
    <shoppingCartContext.Provider
      value={{
        cartItems,
        getItemsQuantity,
        increaseItemQuantity,
        decreaseItemQuantity,
        removeItem,
        openCart,
        closeCart,
        cartQuantity,
      }}
    >
      {children}
      <ShoppintCart isOpen={isOpen} />
    </shoppingCartContext.Provider>
  );
}

export const useShoppingCart = () => {
  return useContext(shoppingCartContext);
};
