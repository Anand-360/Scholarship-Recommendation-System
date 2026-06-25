import Scholarship from '../models/Scholarship.js';
import User from '../models/User.js';
import { calculateEligibilityScore, rankScholarships } from '../services/eligibilityService.js';
import axios from 'axios';

// @desc    Get all scholarships with optional filters
// @route   GET /api/scholarships
// @access  Public
export const getScholarships = async (req, res) => {
    try {
        const {
            type,
            scope,
            provider,
            educationLevel,
            minAmount,
            maxAmount,
            search,
            page = 1,
            limit = 100
        } = req.query;

        // Build query
        let query = { isActive: true };

        if (type) query.type = type;
        if (scope) query.scope = scope;
        if (provider) query.provider = provider;
        if (educationLevel) query['eligibilityCriteria.educationLevel'] = educationLevel;

        if (minAmount || maxAmount) {
            query['benefits.amount'] = {};
            if (minAmount) query['benefits.amount'].$gte = Number(minAmount);
            if (maxAmount) query['benefits.amount'].$lte = Number(maxAmount);
        }

        // Text search
        if (search) {
            query.$text = { $search: search };
        }

        // Pagination
        const skip = (page - 1) * limit;

        const scholarships = await Scholarship.find(query)
            .limit(Number(limit))
            .skip(skip)
            .sort({ createdAt: -1 });

        const total = await Scholarship.countDocuments(query);

        res.status(200).json({
            success: true,
            count: scholarships.length,
            total,
            page: Number(page),
            pages: Math.ceil(total / limit),
            data: scholarships
        });
    } catch (error) {
        console.error('Get scholarships error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Get single scholarship by ID
// @route   GET /api/scholarships/:id
// @access  Public
export const getScholarshipById = async (req, res) => {
    try {
        const scholarship = await Scholarship.findById(req.params.id);

        if (!scholarship) {
            return res.status(404).json({
                success: false,
                message: 'Scholarship not found'
            });
        }

        res.status(200).json({
            success: true,
            data: scholarship
        });
    } catch (error) {
        console.error('Get scholarship by ID error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Search scholarships
// @route   GET /api/scholarships/search
// @access  Public
export const searchScholarships = async (req, res) => {
    try {
        const { q } = req.query;

        if (!q) {
            return res.status(400).json({
                success: false,
                message: 'Search query is required'
            });
        }

        const scholarships = await Scholarship.find({
            $text: { $search: q },
            isActive: true
        }).limit(20);

        res.status(200).json({
            success: true,
            count: scholarships.length,
            data: scholarships
        });
    } catch (error) {
        console.error('Search scholarships error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Get personalized scholarship recommendations
// @route   GET /api/scholarships/recommendations
// @access  Private
export const getRecommendations = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        // Check if profile is sufficiently complete
        const profileCompletion = user.getProfileCompletion();
        if (profileCompletion < 50) {
            return res.status(400).json({
                success: false,
                message: 'Please complete at least 50% of your profile to get recommendations',
                profileCompletion
            });
        }

        // Get all active scholarships
        const scholarships = await Scholarship.find({ isActive: true });

        // Rank scholarships based on eligibility
        const rankedScholarships = rankScholarships(user.profile, scholarships);

        // Filter to show only eligible scholarships (match score >= 60%)
        const eligibleScholarships = rankedScholarships.filter(s => s.matchScore >= 60);

        // Try to get ML-enhanced recommendations (optional)
        try {
            const mlResponse = await axios.post(`${process.env.ML_SERVICE_URL}/recommend`, {
                userProfile: user.profile,
                scholarships: eligibleScholarships.slice(0, 50) // Send top 50 to ML service
            }, {
                timeout: 5000 // 5 second timeout
            });

            if (mlResponse.data && mlResponse.data.recommendations) {
                return res.status(200).json({
                    success: true,
                    count: mlResponse.data.recommendations.length,
                    profileCompletion,
                    data: mlResponse.data.recommendations,
                    mlEnhanced: true
                });
            }
        } catch (mlError) {
            console.log('ML service not available, using rule-based recommendations:', mlError.message);
        }

        // Fallback to rule-based recommendations
        res.status(200).json({
            success: true,
            count: eligibleScholarships.length,
            profileCompletion,
            data: eligibleScholarships.slice(0, 25), // Return top 25
            mlEnhanced: false
        });
    } catch (error) {
        console.error('Get recommendations error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Get scholarship statistics
// @route   GET /api/scholarships/stats
// @access  Public
export const getScholarshipStats = async (req, res) => {
    try {
        const totalScholarships = await Scholarship.countDocuments({ isActive: true });

        const typeStats = await Scholarship.aggregate([
            { $match: { isActive: true } },
            { $group: { _id: '$type', count: { $sum: 1 } } }
        ]);

        const scopeStats = await Scholarship.aggregate([
            { $match: { isActive: true } },
            { $group: { _id: '$scope', count: { $sum: 1 } } }
        ]);

        res.status(200).json({
            success: true,
            data: {
                total: totalScholarships,
                byType: typeStats,
                byScope: scopeStats
            }
        });
    } catch (error) {
        console.error('Get stats error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};
