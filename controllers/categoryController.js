// const { PrismaClient } = require('@prisma/client');

// const prisma = new PrismaClient();


// //get all categories

// const getAllCategories = async (req, res) => {
//   try {
//     const categories = await prisma.category.findMany({
//       // relationLoadStrategy: "join",
//       include: { article: true, author: true},
//     });
//     res.status(200).json(categories);
// } catch (error) {
//     console.error("Error fetching categories:", error);
//     res.status(500).json({message: error.message });
// }
// }

// //get category by id
// const getCategoryById = async (req, res) => {
//   const categoryId = parseInt(req.params.categoryId);
//   try {
//       const category = await prisma.category.findUnique({
//         // include: { articles: true, users: true},
//           where: {
//               id: categoryId,
//           },
//       });
//       res.status(200).json(category);
//   } catch (error) {
//       console.error("Error fetching category:", error);
//       res.status(500).json({ message: error.message });
//   }
// }

// //create category

// const createCategory = async (req, res) => {
//     try {
//       const { name } = req.body;
//       const category = await prisma.category.create({
//         data: {
//           name,
//         },
//       });
//       res.status(201).json(category);
//     } catch (error) {
//       console.error("Error creating category:", error);
//       res.status(500).json({ error: "Failed to create category", message: error.message });
//     }
//   }
  
// //update category
// const updateCategory = async (req, res) => {
//     const categoryId = parseInt(req.params.categoryId);
//     try {
//       const { name } = req.body;
//       const updatedCategory = await prisma.category.update({
//         where: {
//           id: categoryId,
//         },
//         data: {
//           name,
//         },
//       });
//       res.status(200).json(updatedCategory);
//     } catch (error) {
//       console.error("Error updating category:", error);
//       res.status(500).json({ error: "Failed to update category", message: error.message });
//     }
//   }
  
//   //delete category
//   const deleteCategory = async (req, res) => {
//     const categoryId = parseInt(req.params.categoryId);
//     try {
//       await prisma.category.delete({
//         where: {
//           id: categoryId,
//         },
//       });
//       res.status(204).send(); 
//     } catch (error) {
//       console.error("Error deleting category:", error);
//       res.status(500).json({ error: "Failed to delete category", message: error.message });
//     }
//   }
  
//   module.exports = { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory };

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all categories
const getAllCategories = async (req, res) => {
    try {
        const categories = await prisma.categorie.findMany({
            include: { articles: true },
        });
        res.status(200).json(categories);
    } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ message: error.message });
    }
}

// Get category by ID
const getCategoryById = async (req, res) => {
    const categoryId = parseInt(req.params.categoryId);
    try {
        const category = await prisma.categorie.findUnique({
            where: { id: categoryId },
        });
        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }
        res.status(200).json(category);
    } catch (error) {
        console.error("Error fetching category:", error);
        res.status(500).json({ message: error.message });
    }
}

// Create category
const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const category = await prisma.categorie.create({
            data: { name },
        });
        res.status(201).json(category);
    } catch (error) {
        console.error("Error creating category:", error);
        res.status500.json({ error: "Failed to create category", message: error.message });
    }
}

// Update category
const updateCategory = async (req, res) => {
    const categoryId = parseInt(req.params.categoryId);
    try {
        const { name } = req.body;
        const updatedCategory = await prisma.categorie.update({
            where: { id: categoryId },
            data: { name },
        });
        res.status(200).json(updatedCategory);
    } catch (error) {
        console.error("Error updating category:", error);
        res.status(500).json({ error: "Failed to update category", message: error.message });
    }
}

// Delete category
const deleteCategory = async (req, res) => {
    const categoryId = parseInt(req.params.categoryId);
    try {
        await prisma.categorie.delete({
            where: { id: categoryId },
        });
        res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        console.error("Error deleting category:", error);
        res.status(500).json({ error: "Failed to delete category", message: error.message });
    }
}

module.exports = { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory };

