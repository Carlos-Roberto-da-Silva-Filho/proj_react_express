// src/contexts/CartContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react'

const CartContext = createContext()

// Hook nomeado fora do componente para compatibilidade com Vite
export function useCart() {
  return useContext(CartContext)
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])

  // Carrega o carrinho do localStorage ao iniciar
  useEffect(() => {
    const storedCart = localStorage.getItem('cart')
    if (storedCart) {
      setCartItems(JSON.parse(storedCart))
    }
  }, [])

  // Atualiza o localStorage sempre que o carrinho mudar
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems))
  }, [cartItems])

  // Adiciona produto ao carrinho
  const addToCart = (item) => {
    const exists = cartItems.find(prod => prod.id === item.id)

    if (exists) {
      setCartItems(prev =>
        prev.map(prod =>
          prod.id === item.id
            ? {
                ...prod,
                quantity: Number(prod.quantity) + Number(item.quantity),
              }
            : prod
        )
      )
    } else {
      setCartItems(prev => [...prev, { ...item, quantity: Number(item.quantity) }])
    }
  }

  // Remove produto do carrinho
  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  // Limpa todo o carrinho
  const clearCart = () => {
    setCartItems([])
  }

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  )
}
