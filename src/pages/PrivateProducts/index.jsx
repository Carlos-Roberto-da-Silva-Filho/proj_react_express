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
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 10

  // Busca os produtos da API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/produtos")
        const data = await response.json();
        console.log("Produtos recebidos do backend:", data)
        setProducts(data)
      } catch (error) {
        setError("Erro ao carregar os produtos")
      } finally {
        setLoading(false)
      }
    };

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

    addToCart(produtoFormatado)
    navigate("/carrinho")
  }

  // Lógica de paginação
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct)

  const totalPages = Math.ceil(products.length / productsPerPage)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  if (loading) return <div className="container">Carregando...</div>
  if (error) return <div className="container">{error}</div>

  return (
    <div className="container">
      <h1>Produtos do Cliente</h1>
      <div className="products-grid">
        {currentProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img
              src={`http://localhost:3000${product.thumbnail}`}
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
                  )
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

      {/* Botões de paginação */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={currentPage === number ? "active" : ""}
            >
              {number}
            </button>
          )
        )}
      </div>
    </div>
  )
}

export default PrivateProducts
