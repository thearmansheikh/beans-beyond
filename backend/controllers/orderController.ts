import type { Request, Response } from "express";
import Order from "../models/Order.js";
import type { AuthRequest } from "../middleware/auth.js";

function generateOrderNumber(): string {
  const prefix = "BB";
  const ts = Date.now().toString(36).toUpperCase();
  const rnd = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `${prefix}-${ts}-${rnd}`;
}

export async function createOrder(req: AuthRequest, res: Response): Promise<void> {
  try {
    const orderNumber = generateOrderNumber();
    const order = await Order.create({
      ...req.body,
      orderNumber,
      userId: req.user?._id ?? null,
    });
    res.status(201).json({ success: true, data: order });
  } catch (err: unknown) {
    res.status(400).json({ message: (err as Error).message });
  }
}

export async function getOrders(req: AuthRequest, res: Response): Promise<void> {
  try {
    const query =
      req.user?.role === "admin" ? {} : { userId: req.user?._id };
    const orders = await Order.find(query).sort({ createdAt: -1 }).limit(100);
    res.json({ success: true, count: orders.length, data: orders });
  } catch (err: unknown) {
    res.status(500).json({ message: (err as Error).message });
  }
}

export async function getOrderById(req: AuthRequest, res: Response): Promise<void> {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) { res.status(404).json({ message: "Order not found" }); return; }
    // Non-admins can only see their own orders
    if (
      req.user?.role !== "admin" &&
      order.userId?.toString() !== req.user?._id
    ) {
      res.status(403).json({ message: "Forbidden" });
      return;
    }
    res.json({ success: true, data: order });
  } catch (err: unknown) {
    res.status(500).json({ message: (err as Error).message });
  }
}

export async function updateOrderStatus(req: AuthRequest, res: Response): Promise<void> {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus: status },
      { new: true, runValidators: true }
    );
    if (!order) { res.status(404).json({ message: "Order not found" }); return; }
    res.json({ success: true, data: order });
  } catch (err: unknown) {
    res.status(400).json({ message: (err as Error).message });
  }
}

export async function cancelOrder(req: AuthRequest, res: Response): Promise<void> {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) { res.status(404).json({ message: "Order not found" }); return; }
    if (order.orderStatus !== "received") {
      res.status(400).json({ message: "Order cannot be cancelled at this stage" });
      return;
    }
    order.orderStatus = "cancelled";
    await order.save();
    res.json({ success: true, data: order });
  } catch (err: unknown) {
    res.status(500).json({ message: (err as Error).message });
  }
}
