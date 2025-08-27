import express from 'express';
import {
    createRepo,
    getAllRepos,
    getRepoById,
} from '../controllers/githubrepo.controller.js';

const router = express.Router();
router.route("/").post(createRepo);
router.get('/', getAllRepos);
router.get('/:id', getRepoById);

export default router;
