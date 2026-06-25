import express from 'express';
import {
    getScholarships,
    getScholarshipById,
    searchScholarships,
    getRecommendations,
    getScholarshipStats
} from '../controllers/scholarshipController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getScholarships);
router.get('/stats', getScholarshipStats);
router.get('/search', searchScholarships);
router.get('/recommendations', protect, getRecommendations);
router.get('/:id', getScholarshipById);

export default router;
