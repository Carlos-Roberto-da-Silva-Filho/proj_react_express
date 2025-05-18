import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { useAuth } from '../../contexts/AuthContext'
import './AdminDashboard.css'

const AdminDashboard = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({ title: '', price: '', stock: '', thumbnail: null })
    const [searchName, setSearchName] = useState('')
    const [editProductId, setEditProductId] = useState(null);
    const [editProduct, setEditProduct] = useState({ title: '', price: '', stock: '', thumbnail: '' })
    const [editThumbnail, setEditThumbnail] = useState(null)
    const [stockProductId, setStockProductId] = useState(null)
    const [newStock, setNewStock] = useState(0)
    const [deleteFileName, setDeleteFileName] = useState('')
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const [isMessageVisible, setIsMessageVisible] = useState(false)
    const [isErrorVisible, setIsErrorVisible] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [productsPerPage] = useState(10)
    const [activeSection, setActiveSection] = useState('listar-produtos')

    const API_URL = 'http://localhost:3000/admin'
    const { token } = useAuth()

    const fetchProducts = useCallback(async () => {
        try {
            const response = await axios.get(`${API_URL}/produtos`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            setProducts(response.data)
            setCurrentPage(1)
        } catch (error) {
            setError(error.response?.data?.error || error.message)
            setIsErrorVisible(true)
            setTimeout(() => setIsErrorVisible(false), 5000) // Exibe erro por 5 segundos
        }
    }, [token])

    useEffect(() => {
        fetchProducts()
    }, [fetchProducts])

    const showMessage = (newMessage) => {
        setMessage(newMessage)
        setIsMessageVisible(true)
        setTimeout(() => {
            setMessage('')
            setIsMessageVisible(false)
        }, 5000) // A mensagem desaparece após 5 segundos
    }

    const showError = (newError) => {
        setError(newError)
        setIsErrorVisible(true)
        setTimeout(() => {
            setError('')
            setIsErrorVisible(false)
        }, 5000) // O erro desaparece após 5 segundos
    };

    const searchProductsByName = async () => {
        try {
            const response = await axios.get(`${API_URL}/produtos/search?name=${searchName}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            setProducts(response.data)
            setCurrentPage(1)
            setActiveSection('listar-produtos')
        } catch (error) {
            showError(error.response?.data?.error || error.message)
        }
    }

    const fetchProductById = async (id) => {
        try {
            const response = await axios.get(`${API_URL}/produtos/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            setEditProduct(response.data)
            setEditProductId(response.data.id)
            setEditThumbnail(null)
            setActiveSection('editar-produto')
            setError('')
            setIsErrorVisible(false)
        } catch (error) {
            showError(`Erro ao buscar produto com ID "${id}": ${error.response?.data?.error || error.message}.`)
        }
    }

    const handleEdit = (product) => {
        fetchProductById(product.id)
    }

    const createProduct = async () => {
        try {
            const formData = new FormData();
            formData.append('title', newProduct.title)
            formData.append('price', newProduct.price)
            formData.append('stock', newProduct.stock)
            if (newProduct.thumbnail) {
                formData.append('thumbnail', newProduct.thumbnail)
            }

            const response = await axios.post(`${API_URL}/produtos`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            })
            setProducts([...products, response.data])
            setNewProduct({ title: '', price: '', stock: '', thumbnail: null })
            showMessage('Produto criado com sucesso!')
            fetchProducts()
        } catch (error) {
            showError(error.response?.data?.error || error.message)
        }
    }

    const updateProduct = async () => {
        try {
            const formData = new FormData()
            formData.append('title', editProduct.title)
            formData.append('price', editProduct.price)
            formData.append('stock', editProduct.stock)
            if (editThumbnail) {
                formData.append('thumbnail', editThumbnail)
            }

            const response = await axios.put(`${API_URL}/produtos/${editProductId}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            })
            setProducts(products.map(p => (p.id === editProductId ? response.data : p)))
            setEditProductId(null)
            showMessage('Produto atualizado com sucesso!')
            fetchProducts()
        } catch (error) {
            showError(error.response?.data?.error || error.message)
        }
    }

    const deleteProduct = async (id) => {
        if (window.confirm("Tem certeza que deseja excluir este produto?")) {
            try {
                await axios.delete(`${API_URL}/produtos/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setProducts(products.filter(p => p.id !== id))
                showMessage('Produto deletado com sucesso!')
                fetchProducts()
            } catch (error) {
                showError(error.response?.data?.error || error.message)
            }
        }
    }

    const updateProductStock = async () => {
        try {
            const response = await axios.patch(`${API_URL}/produtos/${stockProductId}/estoque`, { stock: newStock }, {
                headers: { Authorization: `Bearer ${token}` },
            })
            setProducts(products.map(p => (p.id === stockProductId ? { ...p, stock: response.data.stock } : p)))
            setStockProductId(null)
            setNewStock(0)
            showMessage('Estoque atualizado com sucesso!')
            fetchProducts()
        } catch (error) {
            showError(error.response?.data?.error || error.message)
        }
    }

    const deleteJsonFile = async () => {
        try {
            await axios.delete(`${API_URL}/arquivos/${deleteFileName}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            showMessage('Arquivo deletado com sucesso!')
        } catch (error) {
            showError(error.response?.data?.error || error.message)
        }
    }

    const indexOfLastProduct = currentPage * productsPerPage
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct)

    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    const renderPagination = () => {
        const pageNumbers = []
        for (let i = 1; i <= Math.ceil(products.length / productsPerPage); i++) {
            pageNumbers.push(i)
        }

        return (
            <nav className="admin-dashboard">
                <ul className="admin-dashboard pagination">
                    {pageNumbers.map(number => (
                        <li key={number} className={`admin-dashboard page-item ${currentPage === number ? 'active' : ''}`}>
                            <button onClick={() => paginate(number)} className="admin-dashboard page-link">
                                {number}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        )
    }

    const renderSectionTitle = () => {
        switch (activeSection) {
            case 'listar-produtos': return 'Listar Produtos'
            case 'buscar-produto-nome': return 'Buscar Produto por Nome'
            case 'criar-produto': return 'Criar Produto'
            case 'editar-produto': return 'Editar Produto'
            case 'atualizar-estoque': return 'Atualizar Estoque'
            case 'deletar-arquivo': return 'Deletar Arquivo'
            default: return ''
        }
    }

    return (
        <div className="admin-dashboard">
            <nav className="admin-nav">
                <ul>
                    <li><button onClick={() => { setActiveSection('listar-produtos'); fetchProducts(); }}>Listar Produtos</button></li>
                    <li><button onClick={() => setActiveSection('buscar-produto-nome')}>Buscar Produto por Nome</button></li>
                    <li><button onClick={() => setActiveSection('criar-produto')}>Criar Produto</button></li>
                    <li><button onClick={() => setActiveSection('deletar-arquivo')}>Deletar Arquivo</button></li>
                </ul>
            </nav>

            {isMessageVisible && <p className="success-message">{message}</p>}
            {isErrorVisible && <p className="error-message">{error}</p>}

            {activeSection === 'listar-produtos' && (
                <section id="listar-produtos" className="admin-section">
                    {renderSectionTitle() && <h2 className="section-title">Painel de Administração - {renderSectionTitle()}</h2>}
                    <div className="products-grid">
                        {currentProducts.map(product => (
                            <div key={product.id} className="product-item">
                                <p>{product.title}</p>
                                <p>R$ {product.price}</p>
                                <p>Estoque: {product.stock}</p>
                                <button onClick={() => handleEdit(product)}>Editar</button>
                                <button onClick={() => deleteProduct(product.id)}>Excluir</button>
                                <button onClick={() => { setActiveSection('atualizar-estoque'); setStockProductId(product.id); }}>Atualizar Estoque</button>
                            </div>
                        ))}
                    </div>
                    <div className="pagination-container">{renderPagination()}</div>
                </section>
            )}

            {activeSection === 'buscar-produto-nome' && (
                <section id="buscar-produto-nome" className="admin-section">
                    <h2>Buscar Produtos por Nome</h2>
                    <input
                        type="text"
                        placeholder="Nome do produto"
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                    />
                    <button onClick={searchProductsByName}>Buscar</button>
                </section>
            )}

            {activeSection === 'criar-produto' && (
                <section id="criar-produto" className="admin-section">
                    <h2>Cadastrar Novo Produto</h2>
                    <input
                        type="text"
                        placeholder="Título"
                        value={newProduct.title}
                        onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="Preço"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                    />
                    <input
                        type="number"
                        placeholder="Estoque"
                        value={newProduct.stock}
                        onChange={(e) => setNewProduct({ ...newProduct, stock: Number(e.target.value) })}
                    />
                    <div className="admin-dashboard file-upload-wrapper">
                        <button type="button" className="admin-dashboard upload-button">Carregar Imagem</button>
                        <input
                            type="file"
                            accept="image/*"
                            className="admin-dashboard file-upload-input"
                            onChange={(e) => setNewProduct({ ...newProduct, thumbnail: e.target.files[0] })}
                        />
                        {newProduct.thumbnail && <p className="admin-dashboard file-name">{newProduct.thumbnail.name}</p>}
                    </div>
                    <button onClick={createProduct}>Cadastrar Produto</button>
                </section>
            )}

            {activeSection === 'editar-produto' && editProductId !== null && (
                <section id="editar-produto" className="admin-section">
                    <h2>Editar Produto</h2>
                    <input
                        type="text"
                        placeholder="Título"
                        value={editProduct.title}
                        onChange={(e) => setEditProduct({ ...editProduct, title: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="Preço"
                        value={editProduct.price}
                        onChange={(e) => setEditProduct({ ...editProduct, price: Number(e.target.value) })}
                    />
                    <input
                        type="number"
                        placeholder="Estoque"
                        value={editProduct.stock}
                        onChange={(e) => setEditProduct({ ...editProduct, stock: Number(e.target.value) })}
                    />
                    <div className="admin-dashboard file-upload-wrapper">
                        <button type="button" className="admin-dashboard upload-button">Carregar Nova Imagem</button>
                        <input
                            type="file"
                            accept="image/*"
                            className="admin-dashboard file-upload-input"
                            onChange={(e) => setEditThumbnail(e.target.files[0])}
                        />
                        {editThumbnail && <p className="admin-dashboard file-name">{editThumbnail.name}</p>}
                        {editProduct.thumbnail && !editThumbnail && <p className="admin-dashboard file-name">Imagem atual: {editProduct.thumbnail.split('/').pop()}</p>}
                    </div>
                    <button onClick={updateProduct}>Atualizar Produto</button>
                    <button onClick={() => { setEditProductId(null); setActiveSection('listar-produtos'); }}>Cancelar</button>
                </section>
            )}

            {activeSection === 'atualizar-estoque' && stockProductId !== null && (
                <section id="atualizar-estoque" className="admin-section">
                    <h2>Atualizar Estoque do Produto</h2>
                    <input
                        type="number"
                        placeholder="Novo Estoque"
                        value={newStock}
                        onChange={(e) => setNewStock(Number(e.target.value))}
                    />
                    <button onClick={updateProductStock}>Atualizar Estoque</button>
                    <button onClick={() => { setStockProductId(null); setActiveSection('listar-produtos'); setNewStock(0); }}>Cancelar</button>
                </section>
            )}

            {activeSection === 'deletar-arquivo' && (
                <section id="deletar-arquivo" className="admin-section">
                    <h2>Deletar Arquivo JSON</h2>
                    <input
                        type="text"
                        placeholder="Nome do arquivo (ex: produtos.json)"
                        value={deleteFileName}
                        onChange={(e) => setDeleteFileName(e.target.value)}
                    />
                    <button onClick={deleteJsonFile}>Deletar Arquivo</button>
                </section>
            )}
        </div>
    )
}

export default AdminDashboard