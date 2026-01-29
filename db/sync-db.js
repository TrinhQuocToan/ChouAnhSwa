// Simple script to update MongoDB with Cloudinary URLs
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../BE/.env') });

// Import models
const Product = require('../BE/models/Product.js');
const Category = require('../BE/models/Category.js');

// Read JSON files
const productsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'products.json'), 'utf8'));
const categoriesData = JSON.parse(fs.readFileSync(path.join(__dirname, 'categories.json'), 'utf8'));

async function updateDatabase() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB Connected');

        // Clear existing data
        await Product.deleteMany({});
        await Category.deleteMany({});
        console.log('🗑️  Cleared old data');

        // Insert categories
        const categories = await Category.insertMany(categoriesData);
        console.log(`✅ Imported ${categories.length} categories`);

        // Map category slugs to IDs
        const categoryMap = {};
        categories.forEach(cat => {
            categoryMap[cat.slug] = cat._id;
        });

        // Update products with category IDs
        const productsWithCategories = productsData.map(product => ({
            ...product,
            category: categoryMap[product.categorySlug]
        }));

        // Insert products
        const products = await Product.insertMany(productsWithCategories);
        console.log(`✅ Imported ${products.length} products`);

        console.log('\n✨ Database updated successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

updateDatabase();
