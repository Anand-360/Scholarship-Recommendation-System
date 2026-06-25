import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters'],
        select: false
    },
    profile: {
        fullName: { type: String, default: '' },
        dateOfBirth: { type: Date },
        gender: {
            type: String,
            enum: ['Male', 'Female', 'Other', ''],
            default: ''
        },
        category: {
            type: String,
            enum: ['General', 'OBC', 'SC', 'ST', 'EWS', ''],
            default: ''
        },
        phoneNumber: { type: String, default: '' },
        address: {
            state: { type: String, default: '' },
            district: { type: String, default: '' },
            pincode: { type: String, default: '' }
        },
        // Academic Details
        currentEducationLevel: {
            type: String,
            enum: ['10th', '12th', 'Undergraduate', 'Postgraduate', 'PhD', 'Diploma', ''],
            default: ''
        },
        stream: {
            type: String,
            enum: ['Science', 'Commerce', 'Arts', 'Engineering', 'Medical', 'Law', 'Management', 'Other', ''],
            default: ''
        },
        institution: { type: String, default: '' },
        cgpa: { type: Number, min: 0, max: 10 },
        percentage: { type: Number, min: 0, max: 100 },
        yearOfStudy: { type: Number, min: 1, max: 7 },
        previousEducation: [{
            level: String,
            board: String,
            percentage: Number,
            yearOfPassing: Number
        }],
        // Financial Details
        annualFamilyIncome: { type: Number, default: 0 },
        fatherOccupation: { type: String, default: '' },
        motherOccupation: { type: String, default: '' },
        // Additional Info
        disabilities: { type: Boolean, default: false },
        disabilityType: { type: String, default: '' },
        sportsAchievements: { type: Boolean, default: false },
        extracurriculars: [{ type: String }],
        interests: [{ type: String }],
        targetCountries: [{ type: String }],
        preferredFieldOfStudy: { type: String, default: '' }
    },
    savedScholarships: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Scholarship'
    }],
    appliedScholarships: [{
        scholarshipId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Scholarship'
        },
        appliedDate: {
            type: Date,
            default: Date.now
        },
        status: {
            type: String,
            enum: ['Applied', 'Under Review', 'Accepted', 'Rejected'],
            default: 'Applied'
        }
    }]
}, {
    timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method to compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Method to calculate profile completion percentage
userSchema.methods.getProfileCompletion = function () {
    const fields = [
        this.profile.fullName,
        this.profile.dateOfBirth,
        this.profile.gender,
        this.profile.category,
        this.profile.phoneNumber,
        this.profile.address.state,
        this.profile.currentEducationLevel,
        this.profile.stream,
        this.profile.institution,
        this.profile.percentage || this.profile.cgpa,
        this.profile.annualFamilyIncome
    ];

    const filledFields = fields.filter(field => {
        if (typeof field === 'string') return field.trim() !== '';
        if (typeof field === 'number') return field > 0;
        return field !== null && field !== undefined;
    }).length;

    return Math.round((filledFields / fields.length) * 100);
};

const User = mongoose.model('User', userSchema);

export default User;
