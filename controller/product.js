import Product from "../model/Product.js";
import { verifyJWT } from "../utils/jwt.js";

// ==========================================
// GET ALL PRODUCTS
// ==========================================
async function getAllProducts(req, res) {
  try {
    const products = await Product.find({});

    return res.status(200).json(products);
  } catch (error) {
    console.error("Get Products Error:", error);

    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
}

// ==========================================
// ADD PRODUCT
// ==========================================
async function addProduct(req, res) {
  try {
    const {
      title,
      imageURL,
      description,
      ownerUsername,
      token,
    } = req.body;

    // Check token
    if (!token) {
      return res.status(401).json({
        error: "Token required",
      });
    }

    // Verify token
    const decoded = verifyJWT(token);

    if (!decoded) {
      return res.status(401).json({
        error: "Invalid token",
      });
    }

    // Check required fields
    if (!title || !imageURL || !description) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }

    // Create product
    const newProduct = new Product({
      title,
      imageURL,
      description,
      ownerUsername,
    });

    // Save product
    const savedProduct = await newProduct.save();

    return res.status(201).json({
      message: "Product added successfully",
      product: savedProduct,
    });
  } catch (error) {
    console.error("Add Product Error:", error);

    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
}

// ==========================================
// GET PRODUCTS
// ==========================================
const getProductsController = async (req, res) => {
  try {
    const products = await Product.find();

    return res.status(200).json(products);
  } catch (error) {
    console.error("Get Products Error:", error);

    return res.status(500).json({
      message: "Error fetching products",
    });
  }
};

// ==========================================
// SAVE PRODUCT
// ==========================================
const saveProductController = async (req, res) => {
  try {
    const {
      title,
      imageURL,
      description,
      ownerUsername,
    } = req.body;

    // Validate fields
    if (!title || !imageURL || !description) {
      return res.status(400).json({
        message: "Title, imageURL and description are required",
      });
    }

    // Create product
    const newProduct = new Product({
      title,
      imageURL,
      description,
      ownerUsername,
    });

    // Save product
    const savedProduct = await newProduct.save();

    return res.status(201).json({
      message: "Product saved successfully",
      product: savedProduct,
    });
  } catch (error) {
    console.error("Save Product Error:", error);

    return res.status(500).json({
      message: "Error saving product",
    });
  }
};

// ==========================================
// UPDATE PRODUCT
// ==========================================
const updateProductController = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedProductFields = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      updatedProductFields,
      {
        new: true,
        runValidators: true,
      }
    );

    // Product not found
    if (!updatedProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    return res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Update Product Error:", error);

    return res.status(500).json({
      message: "Error updating product",
    });
  }
};

// ==========================================
// DELETE PRODUCT
// ==========================================
const deleteProductController = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    // Product not found
    if (!deletedProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    return res.status(200).json({
      message: "Product deleted successfully",
      product: deletedProduct,
    });
  } catch (error) {
    console.error("Delete Product Error:", error);

    return res.status(500).json({
      message: "Error deleting product",
    });
  }
};

// ==========================================
// EXPORT CONTROLLERS
// ==========================================
export {
  getAllProducts,
  addProduct,
  getProductsController,
  saveProductController,
  updateProductController,
  deleteProductController,
};