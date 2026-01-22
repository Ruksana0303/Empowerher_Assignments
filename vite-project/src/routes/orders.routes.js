const express = require("express");
const router = express.Router();
const { readDB, writeDB } = require("../utils/fileHandler");

const today = () => new Date().toISOString().split("T")[0];

// 1️⃣ Create Order
router.post("/", (req, res) => {
  const { productId, quantity } = req.body;
  const db = readDB();

  const product = db.products.find(p => p.id === productId);
  if (!product) return res.status(404).json({ message: "Product not found" });

  if (product.stock === 0 || quantity > product.stock)
    return res.status(400).json({ message: "Insufficient stock" });

  const order = {
    id: db.orders.length + 1,
    productId,
    quantity,
    totalAmount: product.price * quantity,
    status: "placed",
    createdAt: today()
  };

  product.stock -= quantity;
  db.orders.push(order);
  writeDB(db);

  res.status(201).json(order);
});

// 2️⃣ Get All Orders
router.get("/", (req, res) => {
  const db = readDB();
  res.json(db.orders);
});

// 3️⃣ Cancel Order (Soft Delete)
router.delete("/:orderId", (req, res) => {
  const db = readDB();
  const order = db.orders.find(o => o.id == req.params.orderId);

  if (!order) return res.status(404).json({ message: "Order not found" });
  if (order.status === "cancelled")
    return res.status(400).json({ message: "Order already cancelled" });

  if (order.createdAt !== today())
    return res.status(400).json({ message: "Cancellation window expired" });

  order.status = "cancelled";
  const product = db.products.find(p => p.id === order.productId);
  product.stock += order.quantity;

  writeDB(db);
  res.json({ message: "Order cancelled successfully" });
});

// 4️⃣ Change Order Status
router.patch("/change-status/:orderId", (req, res) => {
  const db = readDB();
  const order = db.orders.find(o => o.id == req.params.orderId);

  if (!order) return res.status(404).json({ message: "Order not found" });
  if (["cancelled", "delivered"].includes(order.status))
    return res.status(400).json({ message: "Status change not allowed" });

  const flow = ["placed", "shipped", "delivered"];
  const nextStatus = flow[flow.indexOf(order.status) + 1];

  order.status = nextStatus;
  writeDB(db);
  res.json(order);
});

module.exports = router;
