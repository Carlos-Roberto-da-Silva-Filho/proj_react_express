import React from "react"
import { useCart } from "../../contexts/CartContext"
import "./Carrinho.css"

const Carrinho = () => {
  const { cartItems, removeFromCart } = useCart()

  const removerProduto = (id) => {
    const confirmar = window.confirm("Deseja realmente remover este produto?")
    if (!confirmar) return
    removeFromCart(id)
  };

  const calcularTotal = () => {
    return cartItems
      .reduce((total, item) => {
        const preco = Number(item.price)
        const qtd = Number(item.quantity)
        return total + preco * qtd
      }, 0)
      .toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
  }

  return (
    <div className="container">
      <h1>Resumo do Carrinho</h1>

      {cartItems.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Produto</th>
                <th>Qtd</th>
                <th>Preço</th>
                <th>Subtotal</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => {
                const preco = Number(item.price)
                const qtd = Number(item.quantity)
                const subtotal = preco * qtd

                return (
                  <tr key={item.id}>
                    <td>
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        width="50"
                        style={{ marginRight: "10px" }}
                      />
                      {item.title}
                    </td>
                    <td>{qtd}</td>
                    <td>
                      {preco.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </td>
                    <td>
                      {subtotal.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </td>
                    <td>
                      <button
                        className="btn-excluir"
                        onClick={() => removerProduto(item.id)}
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>

          <h2>Total da Compra: {calcularTotal()}</h2>
        </>
      )}
    </div>
  )
}

export default Carrinho
