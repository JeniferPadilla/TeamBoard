import express from "express";
import taskController from "../controllers/taskControllers.js";
import userMidd from "../middleware/taskValidate.js";

const router = express.Router();

router.post("/registerTask",
userMidd.existingIdUser,
taskController.registerTask);
router.get("/listTask/:name?", taskController.listTask);
router.delete("/delete/:_id", taskController.deleteTask);
router.put("/updateStatusTask", taskController.updateStatusTask);



export default router;