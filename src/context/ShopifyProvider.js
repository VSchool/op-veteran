import React, {createContext, useContext, useEffect, useState} from "react"

export const ShopifyContext = createContext();

export default function ({children}) {
  const [cart, setCart] = useState([])
  const addItemToCart = (item) =>{
    setCart(prev=>[...prev, item])
  }
  const removeItemFromCart = (itemId) =>{
  const filtered = cart.filter(i=>i.id !==itemId)
  setCart(filtered)
  }

  return (
    <ShopifyContext.Provider
      value={{
      addItemToCart: addItemToCart,
      removeItemFromCart:removeItemFromCart
    }}>
      {children}
    </ShopifyContext.Provider>
  )
}