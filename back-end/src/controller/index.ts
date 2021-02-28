import { Router } from 'express';
import utility from '../utility'
const router = Router();

import { postComment, getComments,deleteComment } from './comments.controller';
import { login } from './auth.controller';
// comments calls
router.get('/comments', getComments);
router.post('/comments',utility.verifyRequest, postComment);
router.delete('/comments/:commentId',utility.verifyRequest, deleteComment);
//auth calls
router.post('/login',login)
export default router