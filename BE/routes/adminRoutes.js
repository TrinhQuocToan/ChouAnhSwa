import express from 'express';
import { loginAdmin, getAdminProfile } from '../controllers/adminController.js';
import { protect } from '../middleware/auth.js';
import Product from '../models/Product.js';
import Category from '../models/Category.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.post('/login', loginAdmin);
router.get('/profile', protect, getAdminProfile);

// Fix product categories
router.post('/fix-categories', async (req, res) => {
    try {
        const categories = await Category.find({});
        const categoryMap = {};
        categories.forEach(cat => {
            categoryMap[cat.slug] = cat._id;
        });

        const productsData = JSON.parse(
            fs.readFileSync(path.join(__dirname, '../../db/products.json'), 'utf-8')
        );

        let updated = 0;
        for (const productData of productsData) {
            const categoryId = categoryMap[productData.categorySlug];
            if (categoryId) {
                const result = await Product.updateOne(
                    { name: productData.name },
                    { $set: { category: categoryId } }
                );
                if (result.modifiedCount > 0) updated++;
            }
        }

        res.status(200).json({
            success: true,
            message: 'Categories updated',
            updated
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

export default router;
