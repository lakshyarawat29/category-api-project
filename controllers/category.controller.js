const Category = require("../models/category.model");
const programmingLanguages = require('../directory/langs'); 


const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({});

    // Filter sensitive fields for each category
    const filteredCategories = categories.map(category => {
      const filtered = category.toJSON();
      delete filtered._id;
      delete filtered.updatedAt;
      delete filtered.__v;
      return filtered;
    });

    res.status(200).json({ categories: filteredCategories });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: error.message });
  }
};

const createCategory = async(req,res)=>{
  try{
    const product = await Category.create(req.body)
    res.status(200).json(product);
    console.log(product);
  }catch(error){
    res.status(500).json({message: error.message});
  }
}


const createManyCategory = async (req, res) => {
  try {
    if (!Array.isArray(req.body)) {
      return res.status(400).json({ message: "Input should be an array of categories." });
    }
    const categories = await Category.insertMany(req.body);
    res.status(201).json(categories);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



const getOneCategory = async (req, res) => {
  try {
    const { name } = req.params;  // Get the 'name' from the URL parameter
    console.log(`Searching for category: ${name}`);

    // Check if the name is a valid programming language
    if (!programmingLanguages.includes(name.toLowerCase())) { // Convert input to lowercase for consistency
      return res.status(400).json({ message: 'No Results Found' });
    }

    // Escape special characters in the name for use in RegExp
    const escapedName = name.replace(/[.*+?^=!:${}()|\[\]\/\\#]/g, '\\$&');
    console.log(`Escaped name for regex: ${escapedName}`);

    // Check if the category exists using case-insensitive regex
    let category = await Category.findOne({ name: new RegExp(`^${escapedName}$`, 'i') });

    console.log(`Found category: ${category ? category.name : 'No category found'}`);

    if (!category) {
      // If the category doesn't exist, create the category dynamically
      category = new Category({
        name: name.charAt(0).toUpperCase() + name.slice(1), // Capitalize first letter
        devType: 'Unknown',  // Default or allow user to send it
        icon: 'https://png.pngtree.com/png-vector/20210129/ourmid/pngtree-upload-avatar-by-default-png-image_2854358.jpg'  // Fallback icon
      });

      await category.save(); // Save the new category in the database
      console.log(`Category "${name}" created successfully with image.`);
    }

    // Use toJSON to filter out sensitive fields
    const filteredCategory = category.toJSON();
    delete filteredCategory._id;
    delete filteredCategory.updatedAt;
    delete filteredCategory.__v;

    res.status(200).json({ category: filteredCategory });
  } catch (error) {
    console.error('Error:', error); // Log the error for better debugging
    res.status(500).json({ message: error.message });
  }
};



module.exports = {getAllCategories,createCategory,getOneCategory,createManyCategory}