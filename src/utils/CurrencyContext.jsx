import React, { createContext, useContext, useState, useEffect } from "react"

const CurrencyContext = createContext()

export const CurrencyProvider = ({ children }) => {
  const [exchangeRate, setExchangeRate] = useState(null)

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await fetch(
          "https://economia.awesomeapi.com.br/json/last/USD-BRL"
        )
        const data = await response.json()
        setExchangeRate(parseFloat(data.USDBRL.bid))
      } catch (error) {
        console.error("Erro ao buscar taxa de câmbio:", error)
      }
    };

    fetchExchangeRate()
  }, [])

  return (
    <CurrencyContext.Provider value={{ exchangeRate }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export const useCurrency = () => {
  const context = useContext(CurrencyContext)
  if (!context) {
    throw new Error("useCurrency deve ser usado dentro de CurrencyProvider")
  }
  return context
}
