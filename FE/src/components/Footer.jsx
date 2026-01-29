import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3 className="footer-title">
                            <span className="footer-icon">✦</span>
                            SWAROVSKI
                        </h3>
                        <p className="footer-text">
                            Trang sức pha lê Swarovski cao cấp - Nơi vẻ đẹp lấp lánh hội tụ
                        </p>
                    </div>

                    <div className="footer-section">
                        <h4 className="footer-heading">Liên Hệ</h4>
                        <ul className="footer-list">
                            <li>📍 Hà Nội</li>
                            <li>📞 +84 961 435 900</li>

                        </ul>
                    </div>

                    <div className="footer-section">

                        <ul className="footer-list">
                            <li className="social-links">
                                <a href="https://www.facebook.com/linh.trinhthuy.796" className="social-link" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                                    </svg>
                                </a>
                                <a href="https://www.instagram.com/chouanhswan_/" className="social-link" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                    </svg>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; 2024 Swarovski Jewelry. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
