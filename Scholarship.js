import mongoose from 'mongoose';

const scholarshipSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Scholarship name is required'],
        trim: true
    },
    provider: {
        type: String,
        required: [true, 'Provider is required'],
        enum: ['Government', 'Private', 'University', 'NGO', 'International Organization']
    },
    type: {
        type: String,
        required: [true, 'Type is required'],
        enum: ['Merit-based', 'Need-based', 'Sports', 'Minority', 'Disability', 'Research', 'Mixed']
    },
    scope: {
        type: String,
        required: [true, 'Scope is required'],
        enum: ['National', 'State', 'International', 'Institutional']
    },
    country: {
        type: String,
        default: 'India'
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    benefits: {
        amount: {
            type: Number,
            required: true
        },
        currency: {
            type: String,
            default: 'INR'
        },
        type: {
            type: String,
            enum: ['One-time', 'Annual', 'Monthly', 'Semester-wise'],
            default: 'Annual'
        },
        additionalBenefits: [{ type: String }]
    },
    eligibilityCriteria: {
        minAge: { type: Number, default: 0 },
        maxAge: { type: Number, default: 100 },
        gender: [{
            type: String,
            enum: ['All', 'Male', 'Female', 'Other']
        }],
        category: [{
            type: String,
            enum: ['All', 'General', 'OBC', 'SC', 'ST', 'EWS']
        }],
        educationLevel: [{
            type: String,
            enum: ['10th', '12th', 'Undergraduate', 'Postgraduate', 'PhD', 'Diploma']
        }],
        stream: [{
            type: String,
            enum: ['All', 'Science', 'Commerce', 'Arts', 'Engineering', 'Medical', 'Law', 'Management', 'Other']
        }],
        minPercentage: { type: Number, default: 0 },
        minCGPA: { type: Number, default: 0 },
        maxFamilyIncome: { type: Number, default: Infinity },
        states: [{ type: String }], // Empty array means all states
        disabilities: { type: Boolean, default: false },
        sportsRequired: { type: Boolean, default: false },
        nationality: {
            type: String,
            default: 'Indian'
        }
    },
    applicationDetails: {
        startDate: { type: Date },
        endDate: { type: Date },
        applicationLink: { type: String },
        requiredDocuments: [{ type: String }]
    },
    tags: [{ type: String }],
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Index for faster queries
scholarshipSchema.index({ name: 'text', description: 'text', tags: 'text' });
scholarshipSchema.index({ 'eligibilityCriteria.educationLevel': 1 });
scholarshipSchema.index({ scope: 1, isActive: 1 });

const Scholarship = mongoose.model('Scholarship', scholarshipSchema);

export default Scholarship;
