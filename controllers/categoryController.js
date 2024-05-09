const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();


//get all categories

const getAllCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.status(200).json(categories);
} catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Failed to fetch categories" });
}
}

//get category by id
const getCategoryById = async (req, res) => {
  const categoryId = parseInt(req.params.categoryId);
  try {
      const category = await prisma.category.findUnique({
          where: {
              id: categoryId,
          },
      });
      res.status(200).json(category);
  } catch (error) {
      console.error("Error fetching category:", error);
      res.status(500).json({ error: "Failed to fetch category" });
  }
}

//create category

const createCategory = async (req, res) => {
    try {
      const { name } = req.body;
      const category = await prisma.category.create({
        data: {
          name,
        },
      });
      res.status(201).json(category);
    } catch (error) {
      console.error("Error creating category:", error);
      res.status(500).json({ error: "Failed to create category" });
    }
  }
  
//update category
const updateCategory = async (req, res) => {
    const categoryId = parseInt(req.params.categoryId);
    try {
      const { name } = req.body;
      const updatedCategory = await prisma.category.update({
        where: {
          id: categoryId,
        },
        data: {
          name,
        },
      });
      res.status(200).json(updatedCategory);
    } catch (error) {
      console.error("Error updating category:", error);
      res.status(500).json({ error: "Failed to update category" });
    }
  }
  
  //delete category
  const deleteCategory = async (req, res) => {
    const categoryId = parseInt(req.params.categoryId);
    try {
      await prisma.category.delete({
        where: {
          id: categoryId,
        },
      });
      res.status(204).send(); 
    } catch (error) {
      console.error("Error deleting category:", error);
      res.status(500).json({ error: "Failed to delete category" });
    }
  }
  
  module.exports = { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory };


