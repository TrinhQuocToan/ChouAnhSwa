import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Import models
import Product from '../BE/models/Product.js';
import Category from '../BE/models/Category.js';
import Admin from '../BE/models/Admin.js';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env vars
dotenv.config({ path: path.join(__dirname, '../BE/.env') });

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB Connected');
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        process.exit(1);
    }
};

// Import data
const importData = async () => {
    try {
        await connectDB();

        // Clear existing data
        await Product.deleteMany();
        await Category.deleteMany();
        await Admin.deleteMany();
        console.log('🗑️  Đã xóa dữ liệu cũ');

        // Read JSON files
        const categories = JSON.parse(
            fs.readFileSync(path.join(__dirname, 'categories.json'), 'utf-8')
        );
        const admins = JSON.parse(
            fs.readFileSync(path.join(__dirname, 'admins.json'), 'utf-8')
        );
        const products = JSON.parse(
            fs.readFileSync(path.join(__dirname, 'products.json'), 'utf-8')
        );

        // Import categories first
        const createdCategories = await Category.insertMany(categories);
        console.log(`✅ Đã import ${createdCategories.length} danh mục`);

        // Create a map of category slugs to IDs
        const categoryMap = {};
        createdCategories.forEach(cat => {
            categoryMap[cat.slug] = cat._id;
        });

        // Map products to category IDs using categorySlug
        const productsWithCategories = products.map(product => {
            const categoryId = categoryMap[product.categorySlug];

            if (!categoryId) {
                console.warn(`⚠️  Không tìm thấy danh mục cho slug: ${product.categorySlug}`);
            }

            // Remove categorySlug and add category ID
            const { categorySlug, ...productData } = product;

            return {
                ...productData,
                category: categoryId || createdCategories[0]._id // Fallback to first category
            };
        });

        // Import products
        const createdProducts = await Product.insertMany(productsWithCategories);
        console.log(`✅ Đã import ${createdProducts.length} sản phẩm`);

        // Import admins
        const createdAdmins = await Admin.insertMany(admins);
        console.log(`✅ Đã import ${createdAdmins.length} admin`);

        console.log('\n🎉 Import dữ liệu thành công!');
        console.log('\n📝 Thông tin đăng nhập admin:');
        console.log('   Username: admin');
        console.log('   Password: admin123');
        console.log('\n📸 Đường dẫn ảnh sản phẩm:');
        console.log('   Các ảnh được lưu trong folder db/');
        console.log('   Bạn cần serve static files từ backend để hiển thị ảnh');

        process.exit(0);
    } catch (error) {
        console.error(`❌ Lỗi: ${error.message}`);
        process.exit(1);
    }
};

// Delete data
const deleteData = async () => {
    try {
        await connectDB();

        await Product.deleteMany();
        await Category.deleteMany();
        await Admin.deleteMany();

        console.log('🗑️  Đã xóa tất cả dữ liệu');
        process.exit(0);
    } catch (error) {
        console.error(`❌ Lỗi: ${error.message}`);
        process.exit(1);
    }
};

// Check command line arguments
if (process.argv[2] === '-d') {
    deleteData();
} else {
    importData();
}
