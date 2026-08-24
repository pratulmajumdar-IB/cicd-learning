require("dotenv").config();
const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const app = express();
app.use(cors());
app.use(express.json());
const errorHandler = require("./middleware/errorHandler");
app.use(errorHandler);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const connectDatabase = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/orders", orderRoutes);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await connectDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();

//POSTGRESQL ROUTES

// const authRoutes = require("./routes/authRoutes");
// const postgresUserRoutes = require("./routes/postgresUserRoutes");
// const postgresOrderRoutes = require("./routes/postgresOrderRoutes");
// const profileRoutes = require("./routes/profileRoutes");
// const adminRoutes = require("./routes/adminRoutes");

// app.use("/auth", authRoutes);
// app.use("/postgres-users", postgresUserRoutes);
// app.use("/postgres-orders", postgresOrderRoutes);
// app.use("/profile", profileRoutes);
// app.use("/admin", adminRoutes);

// app.listen(3000, () => {
//   console.log("Server running on port 3000");
// });
