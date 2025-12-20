import { createContext, useState, useMemo } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // -------------------------------
  // ADD TO CART
  // -------------------------------
  const addToCart = (product) => {
    const exists = cart.find((item) => item._id === product._id);

    if (exists) {
      setCart(
        cart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          _id: product._id,
          name: product.name,
          price: product.price, // locked price
          quantity: 1,
          imageUrl: product.imageUrl,
          unit: product.unit,
        },
      ]);
    }
  };

  // -------------------------------
  // UPDATE QUANTITY ✅ (FIX)
  // -------------------------------
  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;

    setCart(
      cart.map((item) =>
        item._id === id
          ? { ...item, quantity }
          : item
      )
    );
  };

  // -------------------------------
  // REMOVE ITEM
  // -------------------------------
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item._id !== id));
  };

  // -------------------------------
  // CLEAR CART
  // -------------------------------
  const clearCart = () => setCart([]);

  // -------------------------------
  // TOTAL AMOUNT
  // -------------------------------
  const totalAmount = useMemo(() => {
    return cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }, [cart]);

  // -------------------------------
  // BUILD ORDER PAYLOAD (BACKEND)
  // -------------------------------
  const buildOrderPayload = () => ({
    items: cart.map((item) => ({
      product: item._id,
      quantity: item.quantity,
    })),
  });

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity, // ✅ now available
        removeFromCart,
        clearCart,
        totalAmount,
        buildOrderPayload,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
