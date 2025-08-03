const fs = require('fs');
const path = require('path');

// Read the products file
const productsPath = path.join(__dirname, 'src', 'data', 'products.ts');
let content = fs.readFileSync(productsPath, 'utf8');

// Available images for variations
const availableImages = [
  '/images/FeaturedProducts/1.jpg',
  '/images/FeaturedProducts/2.jpg',
  '/images/FeaturedProducts/3.jpg',
  '/images/FeaturedProducts/4.jpg',
  '/images/FeaturedProducts/5.jpg',
  '/images/FeaturedProducts/6.jpg'
];

// Function to generate a unique set of images for each product
function generateImageArray(primaryImage) {
  const otherImages = availableImages.filter(img => img !== primaryImage);
  // Shuffle and take 3 additional images
  const shuffled = otherImages.sort(() => 0.5 - Math.random());
  return [primaryImage, ...shuffled.slice(0, 3)];
}

// Replace pattern: after 'image: '/images/...',' add 'images: [...],'
content = content.replace(
  /image: '(\/images\/FeaturedProducts\/\d+\.jpg)',(\s+)/g,
  (match, imagePath, whitespace) => {
    const imageArray = generateImageArray(imagePath);
    const imagesString = imageArray.map(img => `'${img}'`).join(',\n      ');
    return `image: '${imagePath}',${whitespace}images: [\n      ${imagesString}\n    ],${whitespace}`;
  }
);

// Write the updated content back
fs.writeFileSync(productsPath, content, 'utf8');
console.log('Successfully updated products.ts with image arrays!');
