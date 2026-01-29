// Quick script to update products with category references
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import Product from '../BE/models/Product.js';
import Category from '../BE/models/Category.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../BE/.env') });

async function updateProducts() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB Connected');

        // Get all categories
        const categories = await Category.find({});
        const categoryMap = {};
        categories.forEach(cat => {
            categoryMap[cat.slug] = cat._id;
        });

        console.log('📋 Category map:', categoryMap);

        // Read products from JSON
        const productsData = JSON.parse(
            fs.readFileSync(path.join(__dirname, 'products.json'), 'utf-8')
        );

        // Update each product
        for (const productData of productsData) {
            const categoryId = categoryMap[productData.categorySlug];

            if (!categoryId) {
                console.log(`⚠️  No category found for slug: ${productData.categorySlug}`);
                continue;
            }

            // Find product by name and update
            const result = await Product.updateOne(
                { name: productData.name },
                { $set: { category: categoryId } }
            );

            if (result.modifiedCount > 0) {
                console.log(`✅ Updated: ${productData.name}`);
            } else {
                console.log(`⚠️  Not found: ${productData.name}`);
            }
        }

        console.log('\n✨ Done!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

updateProducts();
