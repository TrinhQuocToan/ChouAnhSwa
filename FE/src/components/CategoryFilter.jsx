import { useState, useEffect } from 'react';
import { categoryAPI } from '../services/api';
import './CategoryFilter.css';

const CategoryFilter = ({ selectedCategory, onCategoryChange }) => {
    const [categories, setCategories] = useState([]);

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

    return (
        <div className="category-filter-visual">
            <button
                className={`category-item ${!selectedCategory ? 'active' : ''}`}
                onClick={() => onCategoryChange('')}
            >
                <div className="category-image-wrapper">
                    <div className="category-placeholder">
                        <span className="category-icon">✦</span>
                    </div>
                </div>
                <span className="category-name">Tất cả</span>
            </button>

            {categories.map((category) => (
                <button
                    key={category._id}
                    className={`category-item ${selectedCategory === category._id ? 'active' : ''}`}
                    onClick={() => onCategoryChange(category._id)}
                >
                    <div className="category-image-wrapper">
                        <div className="category-placeholder">
                            <span className="category-icon">✦</span>
                        </div>
                    </div>
                    <span className="category-name">{category.name}</span>
                </button>
            ))}
        </div>
    );
};

export default CategoryFilter;
