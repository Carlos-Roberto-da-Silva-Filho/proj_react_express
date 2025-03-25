import { Link } from "react-router-dom"
import "./PrivatePage.css"

const PrivatePage = () => {
    return (
      <div className="container">
        <h1>Página Privada</h1>
        <Link to="/Publica" className="link">Acessar Página Pública</Link>
        <br />
        <Link to="/" className="link">Voltar para a Home</Link>
      </div>
    )
  }
  
  export default PrivatePage