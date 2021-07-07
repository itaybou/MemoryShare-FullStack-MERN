import {
  commentPost,
  createPost,
  deletePost,
  getPost,
  getPosts,
  getPostsBySearch,
  likePost,
  updatePost,
} from '../controllers/posts.js';

import auth from '../middleware/auth.js';
import express from 'express';

const router = express.Router();

router.get('/', getPosts);
router.get('/search', getPostsBySearch);
router.get('/:id', getPost);
router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/like', auth, likePost);
router.post('/:id/comment', auth, commentPost);

export default router;
