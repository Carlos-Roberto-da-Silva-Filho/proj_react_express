// src/pages/PublicProducts/index.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCurrency } from "../../utils/CurrencyContext";
import "./PublicProducts.css";

const PublicProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { exchangeRate } = useCurrency(); // Pega a taxa de câmbio do contexto

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/products");
        setProducts(response.data.products.slice(5, 15)); // Pega apenas os produtos desejados
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
      <h1>Produtos Gerais</h1>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.thumbnail} alt={product.title} className="product-image" />
            <h3 className="product-name">{product.title}</h3>
            <p className="product-price">USD ${product.price}</p>
            <p className="product-price">{convertToBRL(product.price)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PublicProducts;
