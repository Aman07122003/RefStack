import express from 'express';
import {
    createRepo,
    getAllRepos,
    getReposByTag,
} from '../controllers/githubrepo.controller.js';

const router = express.Router();
router.post('/', createRepo);
router.get('/', getAllRepos);
// routes/repoRoutes.js
router.post('/filter', getReposByTag);


export default router;
