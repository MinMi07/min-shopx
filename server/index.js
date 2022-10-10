require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");
const categoryRouter = require("./routes/category");
const blogRouter = require("./routes/blog");
const productRouter = require("./routes/product");
const accountRouter = require("./routes/account");
const billRouter = require("./routes/bill");
const cors = require("cors");

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASWORD}@reacttranning.4a5lrwt.mongodb.net/reactTranning?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Connect mongodb success");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

connectDB();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRouter);
app.use("/api/post", postRouter);
app.use("/api/admin/category", categoryRouter);
app.use("/api/admin/blog", blogRouter);
app.use("/api/admin/product", productRouter);
app.use("/api/admin/user", accountRouter);
app.use("/api/admin/bill", billRouter);
app.use("/api/home", billRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started with port: ${PORT}`));
