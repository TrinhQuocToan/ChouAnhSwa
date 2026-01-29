import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productAPI } from '../services/api';
import ProductCard from '../components/ProductCard';
import './Home.css';

const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFeaturedProducts();
    }, []);

    const fetchFeaturedProducts = async () => {
        try {
            const response = await productAPI.getAll({ featured: 'true' });
            setFeaturedProducts(response.data.products.slice(0, 6));
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="home">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content">
                    <h1 className="hero-title fade-in">
                        Vẻ Đẹp Lấp Lánh
                        <span className="hero-subtitle">Trang Sức Swarovski Cao Cấp</span>
                    </h1>
                    <p className="hero-description fade-in">
                        Khám phá bộ sưu tập trang sức pha lê Swarovski độc đáo,
                        nơi nghệ thuật và vẻ đẹp hội tụ
                    </p>
                    <Link to="/products" className="btn btn-primary fade-in">
                        Khám Phá Ngay
                    </Link>
                </div>
                <div className="hero-decoration">
                    <div className="crystal crystal-1"></div>
                    <div className="crystal crystal-2"></div>
                    <div className="crystal crystal-3"></div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="section">
                <div className="container">
                    <h2 className="section-title">Sản Phẩm Nổi Bật</h2>

                    {loading ? (
                        <div className="loading-container">
                            <div className="spinner"></div>
                        </div>
                    ) : (
                        <div className="grid grid-3">
                            {featuredProducts.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    )}

                    <div className="text-center mt-xl">
                        <Link to="/products" className="btn btn-outline">
                            Xem Tất Cả Sản Phẩm
                        </Link>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="about-section">
                <div className="container">
                    <div className="about-content">
                        <div className="about-text">
                            <h2>Về Swarovski</h2>
                            <p>
                                Swarovski là thương hiệu trang sức pha lê hàng đầu thế giới,
                                nổi tiếng với độ tinh xảo và vẻ đẹp lấp lánh độc đáo.
                                Mỗi sản phẩm đều được chế tác tỉ mỉ, mang đến sự hoàn hảo
                                cho những khoảnh khắc đặc biệt của bạn.
                            </p>
                            <p>
                                Từ những viên pha lê tinh khiết đến thiết kế hiện đại,
                                Swarovski luôn là biểu tượng của sự sang trọng và đẳng cấp.
                            </p>
                        </div>
                        <div className="about-features">
                            <div className="feature-item">
                                <span className="feature-icon">✦</span>
                                <h3>Chất Lượng Cao Cấp</h3>
                                <p>Pha lê Swarovski chính hãng</p>
                            </div>
                            <div className="feature-item">
                                <span className="feature-icon">✦</span>
                                <h3>Thiết Kế Độc Đáo</h3>
                                <p>Bộ sưu tập đa dạng và tinh tế</p>
                            </div>
                            <div className="feature-item">
                                <span className="feature-icon">✦</span>
                                <h3>Bảo Hành Uy Tín</h3>
                                <p>Cam kết chất lượng lâu dài</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
