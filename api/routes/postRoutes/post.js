import express from "express";
import auth from "../../middleware/auth.js";
const router = express.Router();
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
} from "../../controllers/postController/post.js";

// Get all Posts
router.get("/", getPosts);
// CreatePost
router.post("/", auth, createPost);
// Update Post put or patch
router.patch("/:id", auth, updatePost);
// Delete Post
router.delete("/:id", auth, deletePost);

// Like Post

router.patch("/:id/likePost", auth, likePost);
export default router;
