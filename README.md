# Website Trưng Bày Trang Sức Swarovski

Dự án website trưng bày sản phẩm trang sức Swarovski với trang quản trị riêng.

## Công Nghệ Sử Dụng

### Backend
- Node.js & Express
- MongoDB & Mongoose
- JWT Authentication
- bcryptjs

### Frontend
- React 18 với Vite
- React Router DOM
- Axios
- CSS thuần (Premium Design)

### Database
- MongoDB
- Sample data: 20 sản phẩm, 5 danh mục

## Cài Đặt và Chạy Dự Án

### 1. Backend

```bash
cd BE
npm install
npm run dev
```

Server sẽ chạy tại: `http://localhost:5000`

### 2. Database

Đảm bảo MongoDB đang chạy, sau đó import dữ liệu:

```bash
cd db
node import-data.js
```

### 3. Frontend

```bash
cd FE
npm install
npm run dev
```

Frontend sẽ chạy tại: `http://localhost:3000`

## Tài Khoản Admin

- **Username**: admin
- **Password**: admin123

## Tính Năng

### Trang Công Khai
- ✅ Trang chủ với hero section và sản phẩm nổi bật
- ✅ Danh sách sản phẩm với tìm kiếm và lọc theo danh mục
- ✅ Chi tiết sản phẩm với gallery hình ảnh
- ✅ Responsive design (mobile, tablet, desktop)

### Trang Quản Trị
- ✅ Đăng nhập admin với JWT
- ✅ CRUD sản phẩm (Thêm, Sửa, Xóa)
- ✅ Quản lý danh mục
- ✅ Upload hình ảnh qua URL

## API Endpoints

### Public
- `GET /api/products` - Lấy danh sách sản phẩm
- `GET /api/products/:id` - Lấy chi tiết sản phẩm
- `GET /api/categories` - Lấy danh sách danh mục

### Admin (Protected)
- `POST /api/admin/login` - Đăng nhập admin
- `POST /api/products` - Tạo sản phẩm mới
- `PUT /api/products/:id` - Cập nhật sản phẩm
- `DELETE /api/products/:id` - Xóa sản phẩm

## Cấu Trúc Thư Mục

```
ChouAnhSwa/
├── BE/                 # Backend
│   ├── config/        # Database config
│   ├── models/        # Mongoose models
│   ├── controllers/   # Business logic
│   ├── routes/        # API routes
│   ├── middleware/    # Auth & error handling
│   └── server.js      # Entry point
├── FE/                 # Frontend
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── context/     # React Context
│   │   ├── services/    # API services
│   │   └── index.css    # Global styles
│   └── index.html
└── db/                 # Database
    ├── products.json
    ├── categories.json
    ├── admins.json
    └── import-data.js
```

## License

MIT
