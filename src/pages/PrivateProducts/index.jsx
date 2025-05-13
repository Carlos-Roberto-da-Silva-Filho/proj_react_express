// src/components/PrivateProducts.jsx
import React, { useEffect, useState } from "react"
import { FaShoppingCart } from "react-icons/fa"
import { useCurrency } from "../../utils/CurrencyContext"
import { useNavigate } from "react-router-dom"
import { useCart } from "../../contexts/CartContext"
import "./PrivateProducts.css"

const PrivateProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const { exchangeRate } = useCurrency()
  const { addToCart } = useCart()
  const navigate = useNavigate()

  // Busca os produtos da API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // const response = await fetch("https://dummyjson.com/products")
        const response = await fetch("http://localhost:3000/produtos")
        const data = await response.json()
        console.log("Produtos recebidos do backend:", data)
        setProducts(data)
        // setProducts(data.products.slice(5, 15)) // Pegando apenas 10 produtos
      } catch (error) {
        setError("Erro ao carregar os produtos")
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // Converte o valor de dólar para reais
  const convertToBRL = (usdPrice) => {
    return exchangeRate
      ? `R$ ${(usdPrice * exchangeRate).toFixed(2)}`
      : "Carregando..."
  }

  // Adiciona produto ao carrinho com quantidade
  const handleAddToCart = (product, quantity) => {
    const produtoFormatado = {
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
      quantity: Number(quantity),
    }

    addToCart(produtoFormatado);
    navigate("/carrinho");
  }

  if (loading) return <div className="container">Carregando...</div>
  if (error) return <div className="container">{error}</div>

  return (
    <div className="container">
      <h1>Produtos do Cliente</h1>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="product-image"
            />
            <h3 className="product-name">{product.title}</h3>
            <p className="product-price">{convertToBRL(product.price)}</p>

            <div className="quantity-container">
              <input
                type="number"
                className="quantity-input"
                defaultValue="1"
                min="1"
                id={`quantidade-${product.id}`}
              />
              <button
                className="add-to-cart-btn"
                onClick={() => {
                  const input = document.getElementById(
                    `quantidade-${product.id}`
                  );
                  const quantity = parseInt(input.value);
                  if (quantity >= 1) {
                    handleAddToCart(product, quantity);
                  }
                }}
              >
                <FaShoppingCart size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PrivateProducts
