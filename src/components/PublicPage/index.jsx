import { Link } from "react-router-dom"
import "./PublicPage.css"

const PublicPage = () => {
    return (
      <div className="container">
        <h1>Página Pública</h1>
        <Link to="/privada" className="link">Acessar Página Privada</Link>
        <br />
        <Link to="/" className="link">Voltar para a Home</Link>
      </div>
    )
  }
  
  export default PublicPage