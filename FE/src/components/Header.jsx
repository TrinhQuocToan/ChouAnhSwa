import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <header className="header">
            <div className="container">
                <nav className="navbar">
                    <Link to="/" className="logo">
                        <span className="logo-icon">✦</span>
                        <span className="logo-text">CHOUANHSWA</span>
                    </Link>

                    <a href="tel:+84961435900" className="phone-contact">
                        <span className="phone-icon">📞</span>
                        <span className="phone-number">0961 435 900</span>
                    </a>
                </nav>
            </div>
        </header>
    );
};

export default Header;
