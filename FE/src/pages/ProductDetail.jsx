import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productAPI } from '../services/api';
import './ProductDetail.css';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        try {
            const response = await productAPI.getById(id);
            setProduct(response.data.product);
        } catch (error) {
            console.error('Error fetching product:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
                <h2>Không tìm thấy sản phẩm</h2>
                <Link to="/products" className="btn btn-primary" style={{ marginTop: '2rem' }}>
                    Quay lại danh sách
                </Link>
            </div>
        );
    }

    return (
        <div className="product-detail">
            <div className="container">
                <Link to="/" className="back-link">
                    ← Quay lại danh sách
                </Link>

                <div className="product-detail-content">
                    {/* Image Gallery */}
                    <div className="product-gallery">
                        <div className="main-image">
                            <img
                                src={product.images[selectedImage]}
                                alt={product.name}
                            />
                        </div>
                        {product.images.length > 1 && (
                            <div className="thumbnail-list">
                                {product.images.map((image, index) => (
                                    <button
                                        key={index}
                                        className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                                        onClick={() => setSelectedImage(index)}
                                    >
                                        <img src={image} alt={`${product.name} ${index + 1}`} />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="product-detail-info">
                        {product.featured && (
                            <span className="detail-badge">Sản Phẩm Nổi Bật</span>
                        )}

                        <h1 className="detail-title">{product.name}</h1>

                        <div className="detail-price">{formatPrice(product.price)}</div>

                        <div className="detail-meta">
                            <div className="meta-item">
                                <span className="meta-label">Danh mục:</span>
                                <span className="meta-value">{product.category?.name}</span>
                            </div>
                            <div className="meta-item">
                                <span className="meta-label">Chất liệu:</span>
                                <span className="meta-value">{product.material}</span>
                            </div>
                            <div className="meta-item">
                                <span className="meta-label">Màu sắc:</span>
                                <span className="meta-value">{product.color}</span>
                            </div>
                            <div className="meta-item">
                                <span className="meta-label">Tình trạng:</span>
                                <span className={`meta-value ${product.status === 'Còn hàng' ? 'in-stock' : 'out-stock'}`}>
                                    {product.status}
                                </span>
                            </div>
                        </div>

                        <div className="detail-description">
                            <h3>Mô tả sản phẩm</h3>
                            <p>{product.description}</p>
                        </div>

                        <div className="detail-contact">
                            <p>Liên hệ để đặt hàng:</p>
                            <a href="tel:+84123456789" className="btn btn-primary">
                                📞 Gọi ngay: +84 123 456 789
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
