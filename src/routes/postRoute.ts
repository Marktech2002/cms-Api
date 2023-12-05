import express , { Router }  from "express";

const router : Router = express.Router();
router.post("/create");
router.post("/update");
router.get("/get");
router.put("/delete");


export default router ;