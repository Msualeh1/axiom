import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProductPage.css'; // Ensure this is the correct path
import NavBar from './NavBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

const ProductPage = () => {
    const { slug } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingProduct, setEditingProduct] = useState(null);
    const [updatedName, setUpdatedName] = useState('');
    const [updatedDescription, setUpdatedDescription] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/products/${slug}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                setProducts(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchProducts();
    }, [slug]);

    const handleEditClick = (product) => {
        setEditingProduct(product);
        setUpdatedName(product.name);
        setUpdatedDescription(product.description);
    };

    const handleUpdate = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/products/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: updatedName, description: updatedDescription }),
            });
            if (!response.ok) {
                throw new Error('Failed to update product');
            }
            const updatedProduct = await response.json();
            setProducts(products.map(product => (product.id === updatedProduct.id ? updatedProduct : product)));
            setEditingProduct(null);
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) {
        return <div className="loading">Loading products...</div>;
    }

    if (error) {
        return <div className="error">Error fetching products: {error}</div>;
    }

    return (
        <>
            <NavBar />
            <div className="product-page">
                <h1 className="title">Products in {slug} Category</h1>
                <div className="product-grid">
                    {products.length === 0 ? (
                        <div className="no-products">No products found in this category.</div>
                    ) : (
                        products.map(product => (
                            <div className="product-card" key={product.id}>
                                <h3 className="product-name">
                                    {product.name}
                                    <button onClick={() => handleEditClick(product)} aria-label="Edit product" className="edit-icon">
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                </h3>
                                <p className="product-description">{product.description}</p>
                                {editingProduct && editingProduct.id === product.id && (
                                    <div className="edit-form">
                                        <input
                                            type="text"
                                            value={updatedName}
                                            onChange={(e) => setUpdatedName(e.target.value)}
                                            placeholder="New product name"
                                            required
                                        />
                                        <textarea
                                            value={updatedDescription}
                                            onChange={(e) => setUpdatedDescription(e.target.value)}
                                            placeholder="New product description"
                                            required
                                        />
                                        <button onClick={() => handleUpdate(product.id)}>Save</button>
                                        <button onClick={() => setEditingProduct(null)}>Cancel</button>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
};

export default ProductPage;
