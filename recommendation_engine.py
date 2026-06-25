import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd

class ScholarshipRecommender:
    def __init__(self):
        self.vectorizer = TfidfVectorizer(stop_words='english')
    
    def create_user_profile_text(self, user_profile):
        """
        Convert user profile to text representation for similarity matching
        """
        profile_parts = []
        
        # Education level and stream
        if user_profile.get('currentEducationLevel'):
            profile_parts.append(user_profile['currentEducationLevel'])
        if user_profile.get('stream'):
            profile_parts.append(user_profile['stream'])
        
        # Category
        if user_profile.get('category'):
            profile_parts.append(user_profile['category'])
        
        # Gender
        if user_profile.get('gender'):
            profile_parts.append(user_profile['gender'])
        
        # Interests and extracurriculars
        if user_profile.get('interests'):
            profile_parts.extend(user_profile['interests'])
        if user_profile.get('extracurriculars'):
            profile_parts.extend(user_profile['extracurriculars'])
        
        # Preferred field of study
        if user_profile.get('preferredFieldOfStudy'):
            profile_parts.append(user_profile['preferredFieldOfStudy'])
        
        # Target countries for international scholarships
        if user_profile.get('targetCountries'):
            profile_parts.extend(user_profile['targetCountries'])
        
        # Special attributes
        if user_profile.get('disabilities'):
            profile_parts.append('disability')
        if user_profile.get('sportsAchievements'):
            profile_parts.append('sports')
        
        return ' '.join(profile_parts)
    
    def create_scholarship_text(self, scholarship):
        """
        Convert scholarship to text representation for similarity matching
        """
        parts = []
        
        # Basic info
        parts.append(scholarship.get('name', ''))
        parts.append(scholarship.get('description', ''))
        parts.append(scholarship.get('type', ''))
        parts.append(scholarship.get('scope', ''))
        parts.append(scholarship.get('provider', ''))
        parts.append(scholarship.get('country', ''))
        
        # Eligibility criteria
        criteria = scholarship.get('eligibilityCriteria', {})
        if criteria.get('educationLevel'):
            parts.extend(criteria['educationLevel'])
        if criteria.get('stream'):
            parts.extend(criteria['stream'])
        if criteria.get('category'):
            parts.extend(criteria['category'])
        if criteria.get('gender'):
            parts.extend(criteria['gender'])
        
        # Tags
        if scholarship.get('tags'):
            parts.extend(scholarship['tags'])
        
        # Special requirements
        if criteria.get('disabilities'):
            parts.append('disability')
        if criteria.get('sportsRequired'):
            parts.append('sports')
        
        return ' '.join(parts)
    
    def calculate_feature_similarity(self, user_profile, scholarship):
        """
        Calculate similarity based on numerical features
        """
        similarity_score = 0
        total_features = 0
        
        # Academic performance match
        user_percentage = user_profile.get('percentage', 0) or (user_profile.get('cgpa', 0) * 10)
        min_percentage = scholarship.get('eligibilityCriteria', {}).get('minPercentage', 0)
        
        if min_percentage > 0 and user_percentage > 0:
            total_features += 1
            # Higher score if user exceeds minimum by a good margin
            if user_percentage >= min_percentage:
                excess = (user_percentage - min_percentage) / 10
                similarity_score += min(1.0, 0.5 + excess * 0.1)
        
        # Income match (inverse relationship - lower income gets higher score for need-based)
        user_income = user_profile.get('annualFamilyIncome', 0)
        max_income = scholarship.get('eligibilityCriteria', {}).get('maxFamilyIncome', float('inf'))
        
        if max_income != float('inf') and user_income > 0:
            total_features += 1
            if user_income <= max_income:
                # Give higher score to those with lower income for need-based scholarships
                income_ratio = user_income / max_income
                similarity_score += (1 - income_ratio * 0.5)
        
        # Scholarship amount preference (higher amounts get slight boost)
        scholarship_amount = scholarship.get('benefits', {}).get('amount', 0)
        if scholarship_amount > 0:
            total_features += 1
            # Normalize amount (assuming max 5000000 INR)
            normalized_amount = min(scholarship_amount / 5000000, 1.0)
            similarity_score += normalized_amount * 0.3
        
        return similarity_score / total_features if total_features > 0 else 0
    
    def recommend(self, user_profile, scholarships, top_n=25):
        """
        Generate scholarship recommendations using hybrid approach
        """
        if not scholarships:
            return []
        
        # Create text representations
        user_text = self.create_user_profile_text(user_profile)
        scholarship_texts = [self.create_scholarship_text(s) for s in scholarships]
        
        # Calculate text-based similarity using TF-IDF and cosine similarity
        all_texts = [user_text] + scholarship_texts
        tfidf_matrix = self.vectorizer.fit_transform(all_texts)
        
        # Calculate cosine similarity between user and each scholarship
        text_similarities = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:]).flatten()
        
        # Calculate feature-based similarity
        feature_similarities = np.array([
            self.calculate_feature_similarity(user_profile, s) for s in scholarships
        ])
        
        # Combine similarities (weighted average)
        # Text similarity: 60%, Feature similarity: 40%
        combined_scores = (text_similarities * 0.6) + (feature_similarities * 0.4)
        
        # Get existing match scores from eligibility service
        existing_scores = np.array([s.get('matchScore', 0) / 100 for s in scholarships])
        
        # Final score: 50% ML score + 50% eligibility score
        final_scores = (combined_scores * 0.5) + (existing_scores * 0.5)
        
        # Create recommendations with scores
        recommendations = []
        for idx, scholarship in enumerate(scholarships):
            rec = scholarship.copy()
            rec['mlScore'] = float(combined_scores[idx] * 100)
            rec['finalScore'] = float(final_scores[idx] * 100)
            recommendations.append(rec)
        
        # Sort by final score
        recommendations.sort(key=lambda x: x['finalScore'], reverse=True)
        
        return recommendations[:top_n]
