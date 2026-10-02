import express from "express";
import{
    deleteProductController,
    getProductsController,
    saveProductController,
    updateProductController
} from "../controller/product.js";
import { loginUser } from "../controller/user.js";

const router = express.Router();




router.get("/", getProductsController);
router.post("/", saveProductController);
router.put("/:id", updateProductController);
router.delete("/:id", deleteProductController);

export default router;