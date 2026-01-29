import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    };

    return (
        <Link to={`/products/${product._id}`} className="product-card">
            <div className="product-image-wrapper">
                <img
                    src={product.images[0]}
                    alt={product.name}
                    className="product-image"
                />
                {product.featured && (
                    <span className="product-badge">Nổi Bật</span>
                )}
                {product.status === 'Hết hàng' && (
                    <span className="product-badge out-of-stock">Hết hàng</span>
                )}
            </div>

            <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-material">{product.material}</p>
                <div className="product-footer">
                    <span className="product-price">{formatPrice(product.price)}</span>
                    <span className="product-color">{product.color}</span>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
