import type { Request, Response } from "express";
import MenuItem from "../models/MenuItem.js";

export async function getAllItems(req: Request, res: Response): Promise<void> {
  try {
    const { category, search, vegetarian, vegan, glutenFree } = req.query;
    const query: Record<string, unknown> = { available: true };

    if (category && category !== "all") query.category = category;
    if (vegetarian === "true") query["dietaryInfo.vegetarian"] = true;
    if (vegan      === "true") query["dietaryInfo.vegan"]      = true;
    if (glutenFree === "true") query["dietaryInfo.glutenFree"] = true;
    if (search) query.$text = { $search: search as string };

    const items = await MenuItem.find(query).sort({ popular: -1, name: 1 });
    res.json({ success: true, count: items.length, data: items });
  } catch (err: unknown) {
    res.status(500).json({ message: (err as Error).message });
  }
}

export async function getItemById(req: Request, res: Response): Promise<void> {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (!item) { res.status(404).json({ message: "Item not found" }); return; }
    res.json({ success: true, data: item });
  } catch (err: unknown) {
    res.status(500).json({ message: (err as Error).message });
  }
}

export async function createItem(req: Request, res: Response): Promise<void> {
  try {
    const item = await MenuItem.create(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (err: unknown) {
    res.status(400).json({ message: (err as Error).message });
  }
}

export async function updateItem(req: Request, res: Response): Promise<void> {
  try {
    const item = await MenuItem.findByIdAndUpdate(
      req.params.id, req.body, { new: true, runValidators: true }
    );
    if (!item) { res.status(404).json({ message: "Item not found" }); return; }
    res.json({ success: true, data: item });
  } catch (err: unknown) {
    res.status(400).json({ message: (err as Error).message });
  }
}

export async function deleteItem(req: Request, res: Response): Promise<void> {
  try {
    const item = await MenuItem.findByIdAndDelete(req.params.id);
    if (!item) { res.status(404).json({ message: "Item not found" }); return; }
    res.json({ success: true, message: "Item deleted" });
  } catch (err: unknown) {
    res.status(500).json({ message: (err as Error).message });
  }
}
