import express from "express";
import cors from "cors";
import appRouter from "./main/router/router.js";

const app = express();
const port = 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => { res.send("app running...") });

app.use("/api/v1", appRouter)

app.listen(port, () => { 
    console.log(`server running on port ${port}`);
 })