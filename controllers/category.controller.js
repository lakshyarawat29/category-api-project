const Category = require("../models/category.model");
const programmingLanguages = require('../directory/langs'); 

const getAllCategories = async(req,res)=>{
  try{
    const categories = await Category.find({});
    res.status(200).json({categories});
  }catch(e){
    res.status(500).json({message:error.message});
  }
}

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
    if (!programmingLanguages.includes(name)) {
      return res.status(400).json({ message: 'No Results Found' });
    }

    // Escape special characters in the name for use in RegExp
    const escapedName = name.replace(/[.*+?^=!:${}()|\[\]\/\\#]/g, '\\$&');
    console.log(`Escaped name for regex: ${escapedName}`);

    // Check if the category exists using the escaped name (exact match)
    let category = await Category.findOne({ name: new RegExp(`^${escapedName}$`, 'i') });

    console.log(`Found category: ${category ? category.name : 'No category found'}`);

    if (!category) {
      // If the category doesn't exist, create the category dynamically
      category = new Category({
        name,
        devType: 'Unknown',  // Default or allow user to send it
        icon: 'https://png.pngtree.com/png-vector/20210129/ourmid/pngtree-upload-avatar-by-default-png-image_2854358.jpg'  // Fallback icon
      });

      await category.save(); // Save the new category in the database
      console.log(`Category "${name}" created successfully with image.`);
    }

    res.status(200).json({ category });
  } catch (error) {
    console.error('Error:', error); // Log the error for better debugging
    res.status(500).json({ message: error.message });
  }
};


module.exports = {getAllCategories,createCategory,getOneCategory,createManyCategory}