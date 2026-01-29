const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../BE/.env') });

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

console.log('🌥️  Cloudinary Configuration:');
console.log(`   Cloud Name: ${process.env.CLOUDINARY_CLOUD_NAME}`);
console.log(`   API Key: ${process.env.CLOUDINARY_API_KEY?.substring(0, 5)}...`);
console.log('');

// Read products.json
const productsPath = path.join(__dirname, 'products.json');
const categoriesPath = path.join(__dirname, 'categories.json');

let products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
let categories = JSON.parse(fs.readFileSync(categoriesPath, 'utf8'));

// Create backup
fs.writeFileSync(
    path.join(__dirname, 'products.json.backup'),
    JSON.stringify(products, null, 2)
);
fs.writeFileSync(
    path.join(__dirname, 'categories.json.backup'),
    JSON.stringify(categories, null, 2)
);

console.log('✅ Backup created: products.json.backup, categories.json.backup\n');

// Upload image to Cloudinary
async function uploadImage(localPath, cloudinaryPath) {
    try {
        const result = await cloudinary.uploader.upload(localPath, {
            folder: 'swarovski-jewelry',
            public_id: cloudinaryPath,
            resource_type: 'image',
            overwrite: true
        });
        return result.secure_url;
    } catch (error) {
        console.error(`   ❌ Error uploading ${localPath}:`, error.message);
        return null;
    }
}

// Process all images
async function uploadAllImages() {
    console.log('📤 Starting image upload to Cloudinary...\n');

    let totalImages = 0;
    let uploadedImages = 0;
    let failedImages = 0;

    // Count total images
    for (const product of products) {
        totalImages += product.images.length;
    }
    for (const category of categories) {
        if (category.image) totalImages++;
    }

    console.log(`📊 Total images to upload: ${totalImages}\n`);

    // Upload product images
    for (let i = 0; i < products.length; i++) {
        const product = products[i];
        console.log(`\n🔄 Processing product ${i + 1}/${products.length}: ${product.name}`);

        const newImages = [];

        for (let j = 0; j < product.images.length; j++) {
            const imagePath = product.images[j];
            const localPath = path.join(__dirname, imagePath.replace('/db/', ''));

            // Check if file exists
            if (!fs.existsSync(localPath)) {
                console.log(`   ⚠️  File not found: ${localPath}`);
                failedImages++;
                continue;
            }

            // Create Cloudinary path (remove /db/ prefix and file extension)
            const cloudinaryPath = imagePath
                .replace('/db/', '')
                .replace(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/i, '')
                .replace(/\s+/g, '-')
                .toLowerCase();

            console.log(`   📤 Uploading image ${j + 1}/${product.images.length}...`);

            const cloudinaryUrl = await uploadImage(localPath, cloudinaryPath);

            if (cloudinaryUrl) {
                newImages.push(cloudinaryUrl);
                uploadedImages++;
                console.log(`   ✅ Uploaded: ${path.basename(localPath)}`);
            } else {
                failedImages++;
            }
        }

        products[i].images = newImages;
    }

    // Upload category images
    console.log('\n\n🔄 Processing category images...\n');

    for (let i = 0; i < categories.length; i++) {
        const category = categories[i];

        if (!category.image) continue;

        console.log(`   Processing: ${category.name}`);

        const imagePath = category.image;
        const localPath = path.join(__dirname, imagePath.replace('/db/', ''));

        if (!fs.existsSync(localPath)) {
            console.log(`   ⚠️  File not found: ${localPath}`);
            failedImages++;
            continue;
        }

        const cloudinaryPath = `categories/${category.slug}`;

        const cloudinaryUrl = await uploadImage(localPath, cloudinaryPath);

        if (cloudinaryUrl) {
            categories[i].image = cloudinaryUrl;
            uploadedImages++;
            console.log(`   ✅ Uploaded: ${category.name}`);
        } else {
            failedImages++;
        }
    }

    // Save updated JSON files
    fs.writeFileSync(productsPath, JSON.stringify(products, null, 2));
    fs.writeFileSync(categoriesPath, JSON.stringify(categories, null, 2));

    console.log('\n\n' + '='.repeat(60));
    console.log('📊 UPLOAD SUMMARY');
    console.log('='.repeat(60));
    console.log(`✅ Successfully uploaded: ${uploadedImages}/${totalImages}`);
    console.log(`❌ Failed: ${failedImages}/${totalImages}`);
    console.log(`💾 Updated files: products.json, categories.json`);
    console.log(`🔙 Backups saved: products.json.backup, categories.json.backup`);
    console.log('='.repeat(60));

    if (uploadedImages > 0) {
        console.log('\n✨ Success! Images are now hosted on Cloudinary CDN.');
        console.log('🌐 View your images at: https://cloudinary.com/console/media_library');
    }
}

// Run the upload
uploadAllImages().catch(error => {
    console.error('❌ Fatal error:', error);
    process.exit(1);
});
