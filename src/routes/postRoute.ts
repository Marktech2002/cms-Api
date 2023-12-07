import express , { Router }  from "express";
import { allPost , createPost , deleteAPost , editPost } from "../controllers/postController";

const router : Router = express.Router();
router.post("/create" , createPost);
router.put("/edit/:id" , editPost);
router.get("/all" , allPost );
router.put("/delete/:id" , deleteAPost);

export default router ;