const express = require("express");
const app = express();

app.use(express.json());

app.use("/products", require("./routes/products.routes"));
app.use("/orders", require("./routes/orders.routes"));
app.use("/analytics", require("./routes/analytics.routes"));

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
