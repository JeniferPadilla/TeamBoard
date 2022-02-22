import express from "express";
import taskController from "../controllers/taskControllers.js";

const router = express.Router();

router.post("/registerTask", taskController.registerTask);
router.get("/listTask/:name?", taskController.listTask);
router.put("/delete/:_id", taskController.deleteTask);
router.put("/updateStatusTask", taskController.updateStatusTask);



export default router;