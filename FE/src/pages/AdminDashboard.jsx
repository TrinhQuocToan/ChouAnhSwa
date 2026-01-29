import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';
import { productAPI, categoryAPI } from '../services/api';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const { admin, logout, isAuthenticated } = useAdminAuth();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [notification, setNotification] = useState(null); // { type: 'success' | 'error', message: '' }
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        images: [''],
        material: 'Pha lê Swarovski',
        color: '',
        featured: false,
        status: 'Còn hàng'
    });

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/admin/login');
            return;
        }
        fetchProducts();
        fetchCategories();
    }, [isAuthenticated]);

    const fetchProducts = async () => {
        try {
            const response = await productAPI.getAll();
            setProducts(response.data.products);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await categoryAPI.getAll();
            setCategories(response.data.categories);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = {
                ...formData,
                price: Number(formData.price)
            };

            if (editingProduct) {
                await productAPI.update(editingProduct._id, data);
            } else {
                await productAPI.create(data);
            }

            fetchProducts();
            resetForm();
            setNotification({
                type: 'success',
                message: editingProduct ? 'Cập nhật sản phẩm thành công!' : 'Thêm sản phẩm mới thành công!'
            });

            // Auto hide notification
            setTimeout(() => {
                setNotification(null);
            }, 3000);

        } catch (error) {
            setNotification({
                type: 'error',
                message: error.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại'
            });
            setTimeout(() => {
                setNotification(null);
            }, 3000);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
            try {
                await productAPI.delete(id);
                fetchProducts();
            } catch (error) {
                alert('Lỗi: Không thể xóa sản phẩm');
            }
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            description: product.description,
            price: product.price,
            category: product.category._id || product.category,
            images: product.images,
            material: product.material,
            color: product.color,
            featured: product.featured,
            status: product.status || 'Còn Hàng'
        });
        setShowForm(true);
    };

    const resetForm = () => {
        setFormData({
            name: '',
            description: '',
            price: '',
            category: '',
            images: [''],
            material: 'Pha lê Swarovski',
            color: '',
            featured: false,
            status: 'Còn Hàng'
        });
        setEditingProduct(null);
        setShowForm(false);
    };

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    const openUploadWidget = () => {
        if (window.cloudinary) {
            window.cloudinary.openUploadWidget(
                {
                    cloudName: 'dk4kuf5py',
                    uploadPreset: 'swarovski_products',
                    folder: 'swarovski-jewelry/products',
                    multiple: true,
                    maxFiles: 5,
                    sources: ['local', 'url'],
                    showAdvancedOptions: false,
                    cropping: false,
                    styles: {
                        palette: {
                            window: '#FFFFFF',
                            windowBorder: '#FFB6D9',
                            tabIcon: '#FF69B4',
                            menuIcons: '#FF69B4',
                            textDark: '#000000',
                            textLight: '#FFFFFF',
                            link: '#FF69B4',
                            action: '#FF69B4',
                            inactiveTabIcon: '#FFB6D9',
                            error: '#F44235',
                            inProgress: '#FF69B4',
                            complete: '#20B832',
                            sourceBg: '#FFF0F7'
                        }
                    }
                },
                (error, result) => {
                    if (!error && result.event === 'success') {
                        const newUrl = result.info.secure_url;
                        setFormData(prev => ({
                            ...prev,
                            images: [...prev.images.filter(img => img), newUrl]
                        }));
                    }
                }
            );
        } else {
            alert('Cloudinary widget chưa được tải. Vui lòng refresh trang.');
        }
    };

    const removeImage = (index) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    };

    return (
        <div className="admin-dashboard">
            <div className="admin-header">
                <div className="container">
                    <div className="admin-header-content">
                        <h1>✦ Admin Dashboard</h1>
                        <div className="admin-user">
                            <span>Xin chào, {admin?.username}</span>
                            <button onClick={handleLogout} className="btn btn-secondary">
                                Đăng Xuất
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="admin-actions">
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="btn btn-primary"
                    >
                        {showForm ? 'Hủy' : '+ Thêm Sản Phẩm Mới'}
                    </button>
                </div>

                {showForm && (
                    <div className="product-form-card">
                        <h2>{editingProduct ? 'Sửa Sản Phẩm' : 'Thêm Sản Phẩm Mới'}</h2>
                        <form onSubmit={handleSubmit} className="product-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label">Tên sản phẩm *</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Giá (VNĐ) *</label>
                                    <input
                                        type="number"
                                        className="form-input"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Mô tả *</label>
                                <textarea
                                    className="form-textarea"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label">Danh mục *</label>
                                    <select
                                        className="form-select"
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        required
                                    >
                                        <option value="">Chọn danh mục</option>
                                        {categories.map(cat => (
                                            <option key={cat._id} value={cat._id}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Tình trạng *</label>
                                    <select
                                        className="form-select"
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                        required
                                    >
                                        <option value="Hết hàng">Hết hàng</option>
                                        <option value="Còn hàng">Còn hàng</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label">Chất liệu</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        value={formData.material}
                                        onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Màu sắc</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        value={formData.color}
                                        onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Hình ảnh sản phẩm</label>
                                <div style={{ marginBottom: '1rem' }}>
                                    <button
                                        type="button"
                                        onClick={openUploadWidget}
                                        className="btn btn-secondary"
                                        style={{ marginRight: '0.5rem' }}
                                    >
                                        📤 Upload từ máy
                                    </button>

                                </div>

                                {formData.images.filter(img => img).length > 0 && (
                                    <div style={{ marginBottom: '1rem' }}>
                                        <strong>Ảnh đã thêm:</strong>
                                        <div style={{
                                            display: 'grid',
                                            gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
                                            gap: '0.5rem',
                                            marginTop: '0.5rem'
                                        }}>
                                            {formData.images.filter(img => img).map((img, index) => (
                                                <div key={index} style={{
                                                    position: 'relative',
                                                    paddingBottom: '100%',
                                                    background: '#FFF0F7',
                                                    borderRadius: '8px',
                                                    overflow: 'hidden'
                                                }}>
                                                    <img
                                                        src={img}
                                                        alt={`Preview ${index + 1}`}
                                                        style={{
                                                            position: 'absolute',
                                                            top: 0,
                                                            left: 0,
                                                            width: '100%',
                                                            height: '100%',
                                                            objectFit: 'cover'
                                                        }}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => removeImage(index)}
                                                        style={{
                                                            position: 'absolute',
                                                            top: '4px',
                                                            right: '4px',
                                                            background: '#FF4444',
                                                            color: 'white',
                                                            border: 'none',
                                                            borderRadius: '50%',
                                                            width: '24px',
                                                            height: '24px',
                                                            cursor: 'pointer',
                                                            fontSize: '14px',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                                                        }}
                                                    >
                                                        ✕
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <textarea
                                    className="form-textarea"
                                    value={formData.images.filter(img => img).join('\n')}
                                    onChange={(e) => setFormData({ ...formData, images: e.target.value.split('\n').filter(url => url.trim()) })}
                                    placeholder="https://example.com/image1.jpg"
                                    rows="3"
                                    style={{ display: 'none' }}
                                />
                            </div>

                            <div className="form-group">
                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        checked={formData.featured}
                                        onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                                    />
                                    <span>Sản phẩm nổi bật</span>
                                </label>
                            </div>

                            <div className="form-actions">
                                <button type="submit" className="btn btn-primary">
                                    {editingProduct ? 'Cập Nhật' : 'Thêm Sản Phẩm'}
                                </button>
                                <button type="button" onClick={resetForm} className="btn btn-secondary">
                                    Hủy
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                <div className="products-table-container">
                    <h2>Danh Sách Sản Phẩm ({products.length})</h2>
                    <div className="table-responsive">
                        <table className="products-table">
                            <thead>
                                <tr>
                                    <th>Hình ảnh</th>
                                    <th>Tên sản phẩm</th>
                                    <th>Danh mục</th>
                                    <th>Giá</th>
                                    <th>Tình trạng</th>
                                    <th>Nổi bật</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(product => (
                                    <tr key={product._id}>
                                        <td>
                                            <img src={product.images[0]} alt={product.name} className="table-image" />
                                        </td>
                                        <td>{product.name}</td>
                                        <td>{product.category?.name}</td>
                                        <td>{formatPrice(product.price)}</td>
                                        <td>
                                            <span className={`status-badge ${product.status === 'Còn hàng' ? 'status-available' : 'status-out'}`}>
                                                {product.status}
                                            </span>
                                        </td>
                                        <td>{product.featured ? '⭐' : '-'}</td>
                                        <td>
                                            <div className="table-actions">
                                                <button
                                                    onClick={() => handleEdit(product)}
                                                    className="btn-edit"
                                                >
                                                    Sửa
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(product._id)}
                                                    className="btn-delete"
                                                >
                                                    Xóa
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {notification && (
                <div className={`notification-toast ${notification.type}`}>
                    {notification.type === 'success' ? '✅' : '❌'} {notification.message}
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
