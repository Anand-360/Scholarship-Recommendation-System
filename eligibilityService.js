/**
 * Calculate eligibility match score between user profile and scholarship
 * Returns a score from 0-100 indicating how well the user matches the scholarship
 */
export const calculateEligibilityScore = (userProfile, scholarship) => {
    let score = 0;
    let totalCriteria = 0;
    const matchDetails = [];

    const criteria = scholarship.eligibilityCriteria;

    // Age check
    if (userProfile.dateOfBirth) {
        const age = Math.floor((new Date() - new Date(userProfile.dateOfBirth)) / (365.25 * 24 * 60 * 60 * 1000));
        totalCriteria++;
        if (age >= criteria.minAge && age <= criteria.maxAge) {
            score++;
            matchDetails.push('Age requirement met');
        }
    }

    // Gender check
    if (criteria.gender && criteria.gender.length > 0) {
        totalCriteria++;
        if (criteria.gender.includes('All') || criteria.gender.includes(userProfile.gender)) {
            score++;
            matchDetails.push('Gender requirement met');
        }
    }

    // Category check
    if (criteria.category && criteria.category.length > 0) {
        totalCriteria++;
        if (criteria.category.includes('All') || criteria.category.includes(userProfile.category)) {
            score++;
            matchDetails.push('Category requirement met');
        }
    }

    // Education level check
    if (criteria.educationLevel && criteria.educationLevel.length > 0) {
        totalCriteria++;
        if (criteria.educationLevel.includes(userProfile.currentEducationLevel)) {
            score++;
            matchDetails.push('Education level matches');
        }
    }

    // Stream check
    if (criteria.stream && criteria.stream.length > 0) {
        totalCriteria++;
        if (criteria.stream.includes('All') || criteria.stream.includes(userProfile.stream)) {
            score++;
            matchDetails.push('Stream/field matches');
        }
    }

    // Academic performance check
    if (criteria.minPercentage > 0 || criteria.minCGPA > 0) {
        totalCriteria++;
        const userPercentage = userProfile.percentage || (userProfile.cgpa * 10); // Convert CGPA to percentage
        if (userPercentage >= criteria.minPercentage || (userProfile.cgpa && userProfile.cgpa >= criteria.minCGPA)) {
            score++;
            matchDetails.push('Academic performance meets criteria');
        }
    }

    // Family income check
    if (criteria.maxFamilyIncome && criteria.maxFamilyIncome < Infinity) {
        totalCriteria++;
        if (userProfile.annualFamilyIncome <= criteria.maxFamilyIncome) {
            score++;
            matchDetails.push('Income requirement met');
        }
    }

    // State check
    if (criteria.states && criteria.states.length > 0) {
        totalCriteria++;
        if (criteria.states.includes(userProfile.address?.state)) {
            score++;
            matchDetails.push('State requirement met');
        }
    }

    // Disability check
    if (criteria.disabilities) {
        totalCriteria++;
        if (userProfile.disabilities) {
            score++;
            matchDetails.push('Disability criteria met');
        }
    }

    // Sports check
    if (criteria.sportsRequired) {
        totalCriteria++;
        if (userProfile.sportsAchievements) {
            score++;
            matchDetails.push('Sports achievement criteria met');
        }
    }

    // Calculate percentage
    const matchPercentage = totalCriteria > 0 ? Math.round((score / totalCriteria) * 100) : 0;

    return {
        matchPercentage,
        matchedCriteria: score,
        totalCriteria,
        matchDetails,
        isEligible: matchPercentage >= 60 // At least 60% match to be considered eligible
    };
};

/**
 * Filter scholarships based on hard eligibility criteria
 * Returns only scholarships where user meets minimum requirements
 */
export const filterEligibleScholarships = (userProfile, scholarships) => {
    return scholarships.filter(scholarship => {
        const { isEligible } = calculateEligibilityScore(userProfile, scholarship);
        return isEligible;
    });
};

/**
 * Rank scholarships by match score
 */
export const rankScholarships = (userProfile, scholarships) => {
    const rankedScholarships = scholarships.map(scholarship => {
        const eligibility = calculateEligibilityScore(userProfile, scholarship);
        return {
            ...scholarship.toObject(),
            matchScore: eligibility.matchPercentage,
            matchDetails: eligibility.matchDetails,
            matchedCriteria: eligibility.matchedCriteria,
            totalCriteria: eligibility.totalCriteria
        };
    });

    // Sort by match score (highest first)
    return rankedScholarships.sort((a, b) => b.matchScore - a.matchScore);
};
