import { useState, useEffect } from 'react';
import { categoryAPI } from '../services/api';
import './ProductSidebar.css';

const ProductSidebar = ({ filters, onFilterChange }) => {
    const [categories, setCategories] = useState([]);
    const [isOpen, setIsOpen] = useState({
        category: true,
        material: true,
        color: true,
        price: true
    });

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await categoryAPI.getAll();
            setCategories(response.data.categories);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const toggleSection = (section) => {
        setIsOpen({ ...isOpen, [section]: !isOpen[section] });
    };

    const handleCategoryChange = (categoryId) => {
        onFilterChange({ ...filters, category: categoryId });
    };

    const handleMaterialChange = (material) => {
        const materials = filters.materials || [];
        const newMaterials = materials.includes(material)
            ? materials.filter(m => m !== material)
            : [...materials, material];
        onFilterChange({ ...filters, materials: newMaterials });
    };

    const handleColorChange = (color) => {
        const colors = filters.colors || [];
        const newColors = colors.includes(color)
            ? colors.filter(c => c !== color)
            : [...colors, color];
        onFilterChange({ ...filters, colors: newColors });
    };

    const handlePriceChange = (priceRange) => {
        onFilterChange({ ...filters, priceRange });
    };

    const clearFilters = () => {
        onFilterChange({ category: '', materials: [], colors: [], priceRange: '' });
    };

    const materials = [
        { value: 'Pha lê Swarovski', label: 'Pha lê Swarovski', icon: '💎' },
        { value: 'Vàng hồng', label: 'Vàng hồng', icon: '🌟' },
        { value: 'Rhodium', label: 'Rhodium', icon: '⚪' }
    ];

    const colors = [
        { value: 'Bạc', label: 'Bạc', hex: '#C0C0C0' },
        { value: 'Vàng hồng', label: 'Vàng hồng', hex: '#D4AF37' },
        { value: 'Xanh trắng', label: 'Xanh trắng', hex: '#4A90E2' },
        { value: 'Đỏ', label: 'Đỏ', hex: '#E74C3C' }
    ];

    const priceRanges = [
        { value: '0-2000000', label: 'Dưới 2 triệu' },
        { value: '2000000-3000000', label: '2 - 3 triệu' },
        { value: '3000000-5000000', label: '3 - 5 triệu' },
        { value: '5000000-999999999', label: 'Trên 5 triệu' }
    ];

    return (
        <div className="product-sidebar">
            <div className="sidebar-header">
                <h3>Bộ Lọc</h3>
                <button onClick={clearFilters} className="clear-filters">
                    Xóa tất cả
                </button>
            </div>

            {/* Category Filter */}
            <div className="filter-section">
                <button
                    className="filter-section-header"
                    onClick={() => toggleSection('category')}
                >
                    <span>Loại sản phẩm</span>
                    <span className={`toggle-icon ${isOpen.category ? 'open' : ''}`}>−</span>
                </button>
                {isOpen.category && (
                    <div className="filter-options">
                        <label className="filter-option">
                            <input
                                type="radio"
                                name="category"
                                checked={!filters.category}
                                onChange={() => handleCategoryChange('')}
                            />
                            <span>Tất cả</span>
                        </label>
                        {categories.map(category => (
                            <label key={category._id} className="filter-option">
                                <input
                                    type="radio"
                                    name="category"
                                    checked={filters.category === category._id}
                                    onChange={() => handleCategoryChange(category._id)}
                                />
                                <span>{category.name}</span>
                            </label>
                        ))}
                    </div>
                )}
            </div>

            {/* Material Filter */}
            <div className="filter-section">
                <button
                    className="filter-section-header"
                    onClick={() => toggleSection('material')}
                >
                    <span>Chất liệu</span>
                    <span className={`toggle-icon ${isOpen.material ? 'open' : ''}`}>−</span>
                </button>
                {isOpen.material && (
                    <div className="filter-options">
                        {materials.map(material => (
                            <label key={material.value} className="filter-option">
                                <input
                                    type="checkbox"
                                    checked={(filters.materials || []).includes(material.value)}
                                    onChange={() => handleMaterialChange(material.value)}
                                />
                                <span className="material-option">
                                    <span className="material-icon">{material.icon}</span>
                                    {material.label}
                                </span>
                            </label>
                        ))}
                    </div>
                )}
            </div>

            {/* Color Filter */}
            <div className="filter-section">
                <button
                    className="filter-section-header"
                    onClick={() => toggleSection('color')}
                >
                    <span>Màu sắc</span>
                    <span className={`toggle-icon ${isOpen.color ? 'open' : ''}`}>−</span>
                </button>
                {isOpen.color && (
                    <div className="filter-options">
                        {colors.map(color => (
                            <label key={color.value} className="filter-option color-option">
                                <input
                                    type="checkbox"
                                    checked={(filters.colors || []).includes(color.value)}
                                    onChange={() => handleColorChange(color.value)}
                                />
                                <span className="color-swatch" style={{ backgroundColor: color.hex }}></span>
                                <span>{color.label}</span>
                            </label>
                        ))}
                    </div>
                )}
            </div>

            {/* Price Filter */}
            <div className="filter-section">
                <button
                    className="filter-section-header"
                    onClick={() => toggleSection('price')}
                >
                    <span>Khoảng giá</span>
                    <span className={`toggle-icon ${isOpen.price ? 'open' : ''}`}>−</span>
                </button>
                {isOpen.price && (
                    <div className="filter-options">
                        <label className="filter-option">
                            <input
                                type="radio"
                                name="price"
                                checked={!filters.priceRange}
                                onChange={() => handlePriceChange('')}
                            />
                            <span>Tất cả</span>
                        </label>
                        {priceRanges.map(range => (
                            <label key={range.value} className="filter-option">
                                <input
                                    type="radio"
                                    name="price"
                                    checked={filters.priceRange === range.value}
                                    onChange={() => handlePriceChange(range.value)}
                                />
                                <span>{range.label}</span>
                            </label>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductSidebar;
