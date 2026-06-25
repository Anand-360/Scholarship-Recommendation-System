import User from '../models/User.js';
import Scholarship from '../models/Scholarship.js';

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const profileCompletion = user.getProfileCompletion();

        res.status(200).json({
            success: true,
            data: {
                profile: user.profile,
                profileCompletion
            }
        });
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        // Update profile fields
        user.profile = {
            ...user.profile,
            ...req.body
        };

        await user.save();

        const profileCompletion = user.getProfileCompletion();

        res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            data: {
                profile: user.profile,
                profileCompletion
            }
        });
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Get saved scholarships
// @route   GET /api/users/saved-scholarships
// @access  Private
export const getSavedScholarships = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('savedScholarships');

        res.status(200).json({
            success: true,
            count: user.savedScholarships.length,
            data: user.savedScholarships
        });
    } catch (error) {
        console.error('Get saved scholarships error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Save a scholarship
// @route   POST /api/users/save-scholarship/:id
// @access  Private
export const saveScholarship = async (req, res) => {
    try {
        const scholarshipId = req.params.id;

        // Check if scholarship exists
        const scholarship = await Scholarship.findById(scholarshipId);
        if (!scholarship) {
            return res.status(404).json({
                success: false,
                message: 'Scholarship not found'
            });
        }

        const user = await User.findById(req.user._id);

        // Check if already saved
        if (user.savedScholarships.includes(scholarshipId)) {
            return res.status(400).json({
                success: false,
                message: 'Scholarship already saved'
            });
        }

        user.savedScholarships.push(scholarshipId);
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Scholarship saved successfully',
            data: {
                savedScholarships: user.savedScholarships
            }
        });
    } catch (error) {
        console.error('Save scholarship error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Unsave a scholarship
// @route   DELETE /api/users/unsave-scholarship/:id
// @access  Private
export const unsaveScholarship = async (req, res) => {
    try {
        const scholarshipId = req.params.id;
        const user = await User.findById(req.user._id);

        user.savedScholarships = user.savedScholarships.filter(
            id => id.toString() !== scholarshipId
        );

        await user.save();

        res.status(200).json({
            success: true,
            message: 'Scholarship removed from saved list',
            data: {
                savedScholarships: user.savedScholarships
            }
        });
    } catch (error) {
        console.error('Unsave scholarship error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};
