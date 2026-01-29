import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Vui lòng nhập tên danh mục'],
            unique: true,
            trim: true
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        description: {
            type: String,
            default: ''
        }
    },
    {
        timestamps: true
    }
);

const Category = mongoose.model('Category', categorySchema);

export default Category;
