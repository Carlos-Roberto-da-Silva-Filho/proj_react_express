// src/pages/PublicProducts/index.jsx

import React, { useEffect, useState } from "react"
import axios from "axios" // usando o axios para requisições
import { useCurrency } from "../../utils/CurrencyContext"
import "./PublicProducts.css"

const PublicProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const { exchangeRate } = useCurrency() // Pega a taxa de câmbio do contexto
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 10

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/produtos")
        console.log("Produtos recebidos do backend:", response.data)
        setProducts(response.data) // Pega os produtos desejados
      } catch (error) {
        setError("Erro ao carregar os produtos")
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const convertToBRL = (usdPrice) => {
    return exchangeRate ? `R$ ${(usdPrice * exchangeRate).toFixed(2)}` : "Carregando..."
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
      <h1>Produtos Gerais</h1>
      <div className="products-grid">
        {currentProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img src={`http://localhost:3000${product.thumbnail}`} alt={product.title} className="product-image" />
            <h3 className="product-name">{product.title}</h3>
            <p className="product-price">USD ${product.price}</p>
            <p className="product-price">{convertToBRL(product.price)}</p>
          </div>
        ))}
      </div>

      {/* Botões de paginação */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(number => (
          <button key={number} onClick={() => paginate(number)} className={currentPage === number ? 'active' : ''}>
            {number}
          </button>
        ))}
      </div>
    </div>
  )
}

export default PublicProducts