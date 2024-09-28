const express = require('express');
const connectMongo = require('./utils/connect'); // Ensure this connects to MongoDB
const cors = require('cors');
const Category = require('./utils/model'); // Adjust the path to where your model is defined

const app = express();

const PORT = 5000;
// Enable CORS for React frontend running on port 5173
const corsOptions = {
  origin: 'http://3.26.215.90:5173',
};

// Use CORS middleware before defining routes
app.use(cors(corsOptions));

// Middleware to parse incoming JSON requests
app.use(express.json());

// Endpoint to retrieve all categories
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Error fetching categories', error: error.message });
  }
});

// Endpoint to retrieve a category by slug (including nested structure)
app.get('/api/categories/:slug', async (req, res) => {
  const { slug } = req.params;
  try {
    const category = await Category.findOne({
      $or: [
        { slug: slug }, // Check for top-level category
        { 'childCategories.slug': slug }, // Check for child categories
        { 'childCategories.grandchildCategories.slug': slug }, // Check for grandchild categories
      ],
    });

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json(category);
  } catch (error) {
    console.error('Error fetching category:', error);
    res.status(500).json({ message: 'Error fetching category', error: error.message });
  }
});

// PUT Endpoint to edit category by slug
app.put('/api/categories/:slug', async (req, res) => {
  const { slug } = req.params; // Slug from the URL
  const updatedCategory = req.body; // Data to update

 
  try {
    // Find the category that may contain the slug
    const categoryToUpdate = await Category.findOne({
      $or: [
        { slug: slug }, // Match top-level category slug
        { 'childCategories.slug': slug }, // Match child category slug
        { 'childCategories.grandchildCategories.slug': slug }, // Match grandchild category slug
      ],
    });

    // Check if the category was found
    if (!categoryToUpdate) {
    
      return res.status(404).send('Category not found');
    }

    // Update the category if it matches the slug
    if (categoryToUpdate.slug === updatedCategory.slug) {
      categoryToUpdate.name = updatedCategory.name; // Update name
      
    } else {
      let found = false; // Flag for found category

      // Loop through child categories
      for (let child of categoryToUpdate.childCategories) {
        if (child.slug === updatedCategory.slug) {
          child.name = updatedCategory.name; // Update child name
          found = true; // Mark as found
          console.log('Child category updated:', child);
          break;
        }

        // Loop through grandchild categories
        for (let grandchild of child.grandchildCategories) {
          if (grandchild.slug === updatedCategory.slug) {
            grandchild.name = updatedCategory.name; // Update grandchild name
            found = true; // Mark as found
            console.log('Grandchild category updated:', grandchild);
            break;
          }
        }

        if (found) break; // Exit outer loop if found
      }

      if (!found) {
        console.error('No matching category found for update');
        return res.status(404).send('Category not found in the hierarchy');
      }
    }

    // Save the updated category document
    const result = await categoryToUpdate.save();
    res.send(result); // Send back the updated category
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).send('Internal Server Error');
  }
});


// Fetch products by grandchild category slug
app.get('/api/products/:slug', async (req, res) => {
  const { slug } = req.params;

  try {
      const category = await Category.findOne({
          'childCategories.grandchildCategories.slug': slug
      });

      if (!category) {
          return res.status(404).json({ message: 'Category not found' });
      }

      // Find the specific grandchild category
      const products = category.childCategories
          .flatMap(child => child.grandchildCategories)
          .find(grandchild => grandchild.slug === slug)?.products || [];

      res.json(products);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
  }
});




// Update a product by ID
app.put('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body; // Get new name and description from request body

  try {
      const category = await Category.findOne({
          'childCategories.grandchildCategories.products.id': id
      });

      if (!category) {
          return res.status(404).json({ message: 'Product not found' });
      }

      // Find the product and update it
      let updatedProduct;
      category.childCategories.forEach(child => {
          child.grandchildCategories.forEach(grandchild => {
              grandchild.products.forEach(product => {
                  if (product.id === id) {
                      product.name = name;
                      product.description = description;
                      updatedProduct = product;
                  }
              });
          });
      });

      await category.save(); // Save the updated category

      res.json(updatedProduct);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
  }
});




// Search endpoint
// Search endpoint
app.get('/search', async (req, res) => {
  const { query } = req.query; // Get search query from request

  if (!query) {
    return res.status(400).json({ message: 'Search query is required' });
  }

  try {
    // Search for products matching the query within the nested category structure
    const categories = await Category.find({
      $or: [
        { 'childCategories.grandchildCategories.products.name': { $regex: query, $options: 'i' } },
        { 'childCategories.grandchildCategories.products.description': { $regex: query, $options: 'i' } }
      ]
    });

    // Extract products that match the query from nested structure
    let results = [];

    categories.forEach(category => {
      category.childCategories.forEach(child => {
        child.grandchildCategories.forEach(grandchild => {
          const filteredProducts = grandchild.products.filter(product =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase())
          );

          results = results.concat(filteredProducts);
        });
      });
    });

    // Remove duplicates based on product id
    const uniqueResults = results.filter((product, index, self) =>
      index === self.findIndex(p => p.id === product.id)
    );

    res.json(uniqueResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});









// Start the server
app.listen(PORT, () => {
  connectMongo(); // Ensure you're connecting to MongoDB
  console.log(`Server is running on port ${PORT}...`);
});
