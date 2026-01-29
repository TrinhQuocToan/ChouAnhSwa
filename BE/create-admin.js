import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from './models/Admin.js';

dotenv.config();

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB Connected');

        // Xóa admin cũ
        await Admin.deleteMany();
        console.log('🗑️  Đã xóa admin cũ');

        // Tạo admin mới (password sẽ tự động hash)
        const admin = await Admin.create({
            username: 'admin',
            email: 'admin@swarovski.com',
            password: 'admin123'
        });

        console.log('✅ Đã tạo admin thành công!');
        console.log('\n📝 Thông tin đăng nhập:');
        console.log('   Username: admin');
        console.log('   Password: admin123');

        process.exit(0);
    } catch (error) {
        console.error('❌ Lỗi:', error.message);
        process.exit(1);
    }
};

createAdmin();
