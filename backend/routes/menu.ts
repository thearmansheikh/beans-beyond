import { Router } from "express";
import {
  getAllItems, getItemById, createItem, updateItem, deleteItem,
} from "../controllers/menuController.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = Router();

router.get("/",    getAllItems);
router.get("/:id", getItemById);

// Admin-only mutations
router.post("/",    protect, adminOnly, createItem);
router.put("/:id",  protect, adminOnly, updateItem);
router.delete("/:id", protect, adminOnly, deleteItem);

export default router;
