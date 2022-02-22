import express from "express";
import taskController from "../controllers/taskControllers.js";
import taskMidd from "../middleware/taskValidate.js";

const router = express.Router();

router.post("/registerTask",
taskMidd.existingTask,
taskController.registerTask);
router.get("/listTask/:name?", taskController.listTask);
router.delete("/delete/:_id", taskController.deleteTask);
router.put("/updateStatusTask", taskController.updateStatusTask);



export default router;