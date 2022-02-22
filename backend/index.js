import express from "express";
import cors from "cors";
import db from "./db/db.js";
import roleRoutes from "./routes/roleRouter.js"; // para obtener lo que tiene router en roleRoutes
import userRouter from "./routes/userRouter.js";
import taskRouter from "./routes/taskRouter.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/role",roleRoutes); //es como una ruta lo que esta en comillas,el api es para saber que se manejara una api
app.use("/api/user", userRouter);
app.use("/api/task",taskRouter);

app.listen(process.env.PORT,()=>console.log("Backend server running on port: ", process.env.PORT));

db.dbConnection();