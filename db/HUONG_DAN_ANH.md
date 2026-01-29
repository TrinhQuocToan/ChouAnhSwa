# Hướng Dẫn Sử Dụng Ảnh Sản Phẩm

## ✅ Đã Hoàn Thành

Tôi đã tạo file JSON cho các sản phẩm dựa trên ảnh bạn đã upload:

### Danh Mục (4 categories)
- Nhẫn
- Dây Chuyền  
- Lắc Tay
- Khuyên Tai

### Sản Phẩm (4 products)

1. **Dây Chuyền Swarovski Constella Rose Gold** - 2,290,000 VNĐ
   - 1 ảnh

2. **Dây Chuyền Swarovski Dancing Swan - Xanh Trắng** - 2,690,000 VNĐ
   - 5 ảnh

3. **Dây Chuyền Swarovski Dancing Swan - Đỏ** - 3,050,000 VNĐ
   - 2 ảnh

4. **Dây Chuyền Swarovski Dazzling Swan** - 1,999,000 VNĐ
   - 1 ảnh

## 🚀 Cách Chạy

### Bước 1: Import dữ liệu vào MongoDB

```bash
cd db
node import-data.js
```

### Bước 2: Restart Backend (để serve static files)

Backend đã được cập nhật để serve ảnh từ folder `db/`

Nếu backend đang chạy, bạn cần restart:
- Nhấn `Ctrl+C` trong terminal backend
- Chạy lại: `npm run dev`

### Bước 3: Kiểm tra

Ảnh sẽ được serve tại:
```
http://localhost:5000/db/Dây Chuyền/Constella Rose Gold - 2290k/Dc Constella.jpg
```

## 📝 Thêm Sản Phẩm Mới

Để thêm sản phẩm mới vào `products.json`:

```json
{
  "name": "Tên sản phẩm",
  "description": "Mô tả chi tiết",
  "price": 2500000,
  "categorySlug": "day-chuyen",
  "images": [
    "/db/Dây Chuyền/Tên Folder/anh1.jpg",
    "/db/Dây Chuyền/Tên Folder/anh2.jpg"
  ],
  "stock": 10,
  "material": "Rhodium & Pha lê Swarovski",
  "color": "Màu sắc",
  "featured": true
}
```

**Lưu ý:**
- `categorySlug` phải khớp với slug trong `categories.json`
- Đường dẫn ảnh bắt đầu bằng `/db/`
- Giá không có dấu phẩy, chỉ số
- `featured: true` để hiển thị ở trang chủ

## 📂 Cấu Trúc Folder Hiện Tại

```
db/
├── Dây Chuyền/
│   ├── Constella Rose Gold - 2290k/
│   │   └── Dc Constella.jpg
│   ├── Dancing Swan/
│   │   ├── Xanh trắng - 2690/
│   │   │   ├── IMG_0022.JPG
│   │   │   ├── IMG_0495.JPG
│   │   │   ├── IMG_0497.JPG
│   │   │   ├── IMG_0503.JPG
│   │   │   └── IMG_0504.JPG
│   │   └── Đỏ - 3050k/
│   │       ├── IMG_0505.WEBP
│   │       └── IMG_0694.JPG
│   └── Dazzling Swan 1999/
│       └── IMG_0077.JPG
├── Lắc Tay/ (chưa có ảnh)
├── Khuyên Tai/ (chưa có ảnh)
├── categories.json
├── products.json
├── admins.json
└── import-data.js
```

## ⚠️ Lưu Ý Quan Trọng

1. **Tên file ảnh**: Nên đổi tên file ảnh thành tên dễ hiểu (không nên để IMG_0022.JPG)
2. **Kích thước ảnh**: Nên tối ưu ảnh trước khi upload (< 500KB/ảnh)
3. **Format**: Hỗ trợ JPG, JPEG, PNG, WEBP
4. **Đường dẫn**: Luôn bắt đầu bằng `/db/` trong JSON

## 🔄 Cập Nhật Sau Khi Thêm Ảnh Mới

1. Cập nhật `products.json` với đường dẫn ảnh mới
2. Chạy lại `node import-data.js`
3. Refresh trang web
