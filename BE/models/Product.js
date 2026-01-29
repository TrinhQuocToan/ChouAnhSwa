import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Vui lòng nhập tên sản phẩm'],
            trim: true,
            maxlength: [200, 'Tên sản phẩm không được quá 200 ký tự']
        },
        description: {
            type: String,
            required: [true, 'Vui lòng nhập mô tả sản phẩm'],
            maxlength: [2000, 'Mô tả không được quá 2000 ký tự']
        },
        price: {
            type: Number,
            required: [true, 'Vui lòng nhập giá sản phẩm'],
            min: [0, 'Giá không được âm']
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: [true, 'Vui lòng chọn danh mục']
        },
        images: [{
            type: String,
            required: true
        }],
        material: {
            type: String,
            default: 'Pha lê Swarovski'
        },
        color: {
            type: String,
            default: 'Trong suốt'
        },
        featured: {
            type: Boolean,
            default: false
        },
        status: {
            type: String,
            enum: ['Còn hàng', 'Hết hàng'],
            default: 'Còn hàng'
        }
    },
    {
        timestamps: true
    }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
