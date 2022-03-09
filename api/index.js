import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
const app = express();
dotenv.config();
/** Routes */
import postRoutes from "./routes/postRoutes/post.js";
import userRoutes from "./routes/userRoutes/user.js";

// middleWare
app.use(cors());
app.use(express.json());
// app.use(helmet()); //Logger
app.use(morgan("common"));

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use("/posts", postRoutes);
app.use("/users", userRoutes);

// Greeting Route
app.get("/", (req, res) => {
  res.send("Hello To Memories Best API");
});

/** Connection to dataBase */

// const CONNECTION_URL =
//   "mongodb+srv://javascriptmastery:javascriptmastery123@cluster0.kpcny.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,

    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));

/** ******************* */
