// src/pages/PrivateProducts/index.jsx

import React, { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa"; // Ícone de carrinho do react-icons
import { useCurrency } from "../../utils/CurrencyContext"; // Contexto de câmbio
import "./PrivateProducts.css"; // Estilos para a página privada

const PrivateProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { exchangeRate } = useCurrency(); // Obtém a taxa de câmbio do contexto

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();
        setProducts(data.products.slice(5, 15)); // Pega apenas os produtos desejados
      } catch (error) {
        setError("Erro ao carregar os produtos");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const convertToBRL = (usdPrice) => {
    return exchangeRate ? `R$ ${(usdPrice * exchangeRate).toFixed(2)}` : "Carregando...";
  };

  if (loading) return <div className="container">Carregando...</div>;
  if (error) return <div className="container">{error}</div>;

  return (
    <div className="container">
      <h1>Produtos do Cliente</h1>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.thumbnail} alt={product.title} className="product-image" />
            <h3 className="product-name">{product.title}</h3>
            <p className="product-price">{convertToBRL(product.price)}</p>
            <div className="quantity-container">
              <input type="number" className="quantity-input" defaultValue="1" min="1" />
              <button className="add-to-cart-btn">
                <FaShoppingCart size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrivateProducts;
