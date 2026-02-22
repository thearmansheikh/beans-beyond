import { Router } from "express";
import {
  createOrder, getOrders, getOrderById,
  updateOrderStatus, cancelOrder,
} from "../controllers/orderController.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = Router();

// Guest checkout: no auth required on create
router.post("/",            createOrder);
router.get("/",    protect, getOrders);
router.get("/:id", protect, getOrderById);
router.put("/:id/status", protect, adminOnly, updateOrderStatus);
router.delete("/:id",     protect, cancelOrder);

export default router;
