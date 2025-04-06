// src/components/CartIcons/index.jsx
import React from "react"
import { FaShoppingCart } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { useCart } from "../../contexts/CartContext"
import "./CartIcon.css"

const CartIcon = () => {
  const { cartItems } = useCart()
  const navigate = useNavigate()

  // Soma total de quantidades no carrinho
  const totalQuantity = cartItems.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  )

  const handleClick = () => {
    navigate("/carrinho")
  }

  return (
    <div className="cart-icon-container" onClick={handleClick}>
      <FaShoppingCart className="cart-icon" />
      {totalQuantity > 0 && (
        <span className="cart-badge">{totalQuantity}</span>
      )}
    </div>
  )
}

export default CartIcon

