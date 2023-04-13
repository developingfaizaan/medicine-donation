require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");

const { notFound, errorHandler } = require("./middlewares/errorHandler");
const jobRoutes = require("./routes/jobListing");
const authRoutes = require("./routes/auth");

const app = express();

// Middlewares
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({
    message: "Hello World 👋",
  });
});

// Routes
app.use("/job", jobRoutes);
app.use("/auth", authRoutes);

// Error Handling Middlewares
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 1337;
app.listen(port, () => console.log(`🖥️ Listening: http://localhost:${port}/`));

// Database Connectivity
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("✅ Connected to database");
});

mongoose.connection.on("error", (error) => {
  console.log("❌ Error while connecting to database ", error);
});
