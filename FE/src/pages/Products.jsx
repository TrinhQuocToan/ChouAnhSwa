import { useState, useEffect } from 'react';
import { productAPI } from '../services/api';
import ProductCard from '../components/ProductCard';
import CategoryFilter from '../components/CategoryFilter';
import ProductSidebar from '../components/ProductSidebar';
import './Products.css';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        category: '',
        materials: [],
        colors: [],
        priceRange: ''
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [filters, searchTerm, allProducts]);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await productAPI.getAll();
            setAllProducts(response.data.products);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const applyFilters = () => {
        let filtered = [...allProducts];

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Category filter
        if (filters.category) {
            filtered = filtered.filter(product =>
                product.category._id === filters.category || product.category === filters.category
            );
        }

        // Material filter
        if (filters.materials && filters.materials.length > 0) {
            filtered = filtered.filter(product =>
                filters.materials.some(material => product.material.includes(material))
            );
        }

        // Color filter
        if (filters.colors && filters.colors.length > 0) {
            filtered = filtered.filter(product =>
                filters.colors.includes(product.color)
            );
        }

        // Price range filter
        if (filters.priceRange) {
            const [min, max] = filters.priceRange.split('-').map(Number);
            filtered = filtered.filter(product =>
                product.price >= min && product.price <= max
            );
        }

        setProducts(filtered);
    };

    const handleCategoryChange = (categoryId) => {
        setSelectedCategory(categoryId);
        setFilters({ ...filters, category: categoryId });
    };

    return (
        <div className="products-page">
            <div className="products-header">
                <div className="container">
                    <h1 className="page-title">Bộ Sưu Tập Swarovski</h1>
                    <p className="page-description">
                        Khám phá những viên ngọc lấp lánh trong bộ sưu tập trang sức cao cấp của chúng tôi
                    </p>
                </div>
            </div>

            <div className="container">
                {/* Search */}
                <div className="search-box-wrapper">
                    <input
                        type="text"
                        className="form-input search-input"
                        placeholder="Tìm kiếm sản phẩm..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Visual Category Filter */}
                <CategoryFilter
                    selectedCategory={selectedCategory}
                    onCategoryChange={handleCategoryChange}
                />

                {/* Main Content with Sidebar */}
                <div className="products-content">
                    {/* Sidebar */}
                    <ProductSidebar
                        filters={filters}
                        onFilterChange={setFilters}
                    />

                    {/* Products Grid */}
                    <div className="products-main">
                        <div className="products-count">
                            <span>{products.length} sản phẩm</span>
                        </div>

                        {loading ? (
                            <div className="loading-container">
                                <div className="spinner"></div>
                            </div>
                        ) : products.length > 0 ? (
                            <div className="grid grid-3">
                                {products.map((product) => (
                                    <ProductCard key={product._id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="no-products">
                                <p>Không tìm thấy sản phẩm nào</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Products;
