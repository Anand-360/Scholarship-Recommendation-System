from flask import Flask, request, jsonify
from flask_cors import CORS
from recommendation_engine import ScholarshipRecommender
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# Initialize recommender
recommender = ScholarshipRecommender()

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'service': 'ML Recommendation Service',
        'version': '1.0.0'
    }), 200

@app.route('/recommend', methods=['POST'])
def get_recommendations():
    """
    Get scholarship recommendations for a user
    
    Request body:
    {
        "userProfile": { ... },
        "scholarships": [ ... ]
    }
    """
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({
                'success': False,
                'message': 'No data provided'
            }), 400
        
        user_profile = data.get('userProfile')
        scholarships = data.get('scholarships', [])
        top_n = data.get('topN', 25)
        
        if not user_profile:
            return jsonify({
                'success': False,
                'message': 'User profile is required'
            }), 400
        
        if not scholarships:
            return jsonify({
                'success': False,
                'message': 'Scholarships list is required'
            }), 400
        
        # Generate recommendations
        recommendations = recommender.recommend(user_profile, scholarships, top_n)
        
        return jsonify({
            'success': True,
            'count': len(recommendations),
            'recommendations': recommendations
        }), 200
        
    except Exception as e:
        print(f'Error in recommendation: {str(e)}')
        return jsonify({
            'success': False,
            'message': 'Internal server error',
            'error': str(e)
        }), 500

@app.route('/test', methods=['POST'])
def test_recommendation():
    """
    Test endpoint with sample data
    """
    try:
        # Sample user profile
        sample_user = {
            'currentEducationLevel': 'Undergraduate',
            'stream': 'Engineering',
            'category': 'General',
            'gender': 'Female',
            'percentage': 85,
            'annualFamilyIncome': 400000,
            'interests': ['technology', 'innovation'],
            'targetCountries': ['USA', 'UK']
        }
        
        # Sample scholarship
        sample_scholarships = [{
            'name': 'Test Scholarship',
            'description': 'Engineering scholarship for women',
            'type': 'Merit-based',
            'scope': 'International',
            'provider': 'Private',
            'country': 'USA',
            'benefits': {'amount': 500000},
            'eligibilityCriteria': {
                'educationLevel': ['Undergraduate'],
                'stream': ['Engineering'],
                'gender': ['Female'],
                'minPercentage': 75,
                'maxFamilyIncome': 500000
            },
            'tags': ['engineering', 'women', 'technology'],
            'matchScore': 85
        }]
        
        recommendations = recommender.recommend(sample_user, sample_scholarships, 10)
        
        return jsonify({
            'success': True,
            'message': 'Test successful',
            'recommendations': recommendations
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': 'Test failed',
            'error': str(e)
        }), 500

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5001))
    debug = os.getenv('DEBUG', 'True') == 'True'
    
    print(f'ML Recommendation Service starting on port {port}')
    app.run(host='0.0.0.0', port=port, debug=debug)
