import express , {Router } from "express"; 

const router: Router = express.Router();
router.post("/register");
router.post("/login");
router.get("/me");
router.put("/resetpassword")
router.post("/logout")


export default router;