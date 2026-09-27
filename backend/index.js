import express from "express";
import routes from "./src/routes/index.js";
import dotenv from "dotenv";
import cors from "cors"
import { DBconnect } from "./src/shared/DBconnect.js";
dotenv.config()
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/api", routes)
app.listen(PORT, "localhost", () => {
  console.log("server is running port at port :", PORT);
  DBconnect()
})