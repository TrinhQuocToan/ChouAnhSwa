import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AdminAuthProvider } from './context/AdminAuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import './index.css';

// Layout wrapper component
function Layout() {
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith('/admin');

    return (
        <div className="app">
            {!isAdminRoute && <Header />}
            <main>
                <Routes>
                    <Route path="/" element={<Products />} />
                    <Route path="/products/:id" element={<ProductDetail />} />
                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                </Routes>
            </main>
            {!isAdminRoute && <Footer />}
        </div>
    );
}

function App() {
    return (
        <AdminAuthProvider>
            <Router>
                <Layout />
            </Router>
        </AdminAuthProvider>
    );
}

export default App;
