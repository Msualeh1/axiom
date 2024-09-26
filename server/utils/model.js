const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
}, { _id: false }); // Disable auto-generated `_id` for products

const grandchildCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true },
  products: [productSchema],
}, { _id: false }); // Disable auto-generated `_id` for grandchild categories

const childCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true },
  grandchildCategories: [grandchildCategorySchema],
}, { _id: false }); // Disable auto-generated `_id` for child categories

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true },
  childCategories: [childCategorySchema],
});

// Define the Category model
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
