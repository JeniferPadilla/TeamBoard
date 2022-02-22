import express from "express"; //se llama por que de aqui se pueden manejar las api
import roleController from "../controllers/roleControllers.js";
const router = express.Router();// express maneja protocolo http con Router(maneja el get,post,put,delete)
//http://Localhost:3001/api/role/registerRole
router.post("/registerRole", roleController.registerRole) //post para registrar,tambien indica la ruta
router.get("/lisRol", roleController.listRole);

export default router;
