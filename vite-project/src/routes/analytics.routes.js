const express = require("express");
const router = express.Router();
const { readDB } = require("../utils/fileHandler");

// 1️⃣ All Orders with Count
router.get("/allorders", (req, res) => {
  const { orders } = readDB();
  res.json({ count: orders.length, orders });
});

// 2️⃣ Cancelled Orders
router.get("/cancelled-orders", (req, res) => {
  const { orders } = readDB();
  const cancelled = orders.filter(o => o.status === "cancelled");
  res.json({ count: cancelled.length, cancelled });
});

// 3️⃣ Shipped Orders
router.get("/shipped", (req, res) => {
  const { orders } = readDB();
  const shipped = orders.filter(o => o.status === "shipped");
  res.json({ count: shipped.length, shipped });
});

// 4️⃣ Total Revenue by Product
router.get("/total-revenue/:productId", (req, res) => {
  const { orders, products } = readDB();
  const product = products.find(p => p.id == req.params.productId);

  if (!product) return res.status(404).json({ message: "Product not found" });

  const revenue = orders
    .filter(o => o.productId == product.id && o.status !== "cancelled")
    .reduce((sum, o) => sum + o.quantity * product.price, 0);

  res.json({ productId: product.id, totalRevenue: revenue });
});

// 5️⃣ Overall Revenue
router.get("/alltotalrevenue", (req, res) => {
  const { orders, products } = readDB();

  const totalRevenue = orders
    .filter(o => o.status !== "cancelled")
    .reduce((sum, o) => {
      const product = products.find(p => p.id === o.productId);
      return sum + o.quantity * product.price;
    }, 0);

  res.json({ totalRevenue });
});

module.exports = router;
