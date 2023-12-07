import express , {Router } from "express"; 
import { loginUser , registerUser , updateUserCredentials , getUser } from "../controllers/userController";
import { protectUser } from "../middleware/authMiddleware";

const router: Router = express.Router();
router.post("/register" , registerUser);
router.post("/login" , loginUser);
router.get("/me" , protectUser , getUser);
router.put("/updatepassword/:id" , updateUserCredentials)

export default router;