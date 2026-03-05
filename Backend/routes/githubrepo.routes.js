import express from 'express';
import {
    createRepo,
    getAllRepos,
    getReposByTopic,
} from '../controllers/githubrepo.controller.js';

const router = express.Router();

router.post('/', createRepo);
router.get('/', getAllRepos);
router.get('/filter', getReposByTopic);


export default router;
