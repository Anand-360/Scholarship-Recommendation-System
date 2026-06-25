import express from 'express';
import {
    getProfile,
    updateProfile,
    getSavedScholarships,
    saveScholarship,
    unsaveScholarship
} from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All routes are protected
router.use(protect);

router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.get('/saved-scholarships', getSavedScholarships);
router.post('/save-scholarship/:id', saveScholarship);
router.delete('/unsave-scholarship/:id', unsaveScholarship);

export default router;
