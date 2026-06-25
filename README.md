# Scholarship Recommendation Application

An AI-powered scholarship recommendation system for Indian students seeking both local and international educational opportunities.

## 🌟 Features

- **AI-Powered Recommendations**: Machine learning algorithm that matches students with scholarships based on their profile
- **Comprehensive Database**: 25+ scholarships including government schemes, private scholarships, and international programs
- **Eligibility Checking**: Automatic filtering based on academic performance, income, category, and other criteria
- **Match Scoring**: Each recommendation comes with a match percentage showing how well you qualify
- **User Profiles**: Detailed profile system capturing academic, financial, and personal information
- **Modern UI**: Beautiful, responsive interface built with React and Tailwind CSS

## 🏗️ Tech Stack

### Frontend
- React 18 with Vite
- Tailwind CSS for styling
- React Router for navigation
- Axios for API calls
- Context API for state management

### Backend
- Node.js + Express
- MongoDB with Mongoose
- JWT authentication
- bcrypt for password hashing

### ML Service
- Python Flask
- scikit-learn for recommendations
- TF-IDF and cosine similarity
- Hybrid scoring algorithm

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (v5 or higher)
- Python (v3.8 or higher)
- npm or yarn

## 🚀 Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd "sc project"
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory (use `.env.example` as template):
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/scholarship_db
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
ML_SERVICE_URL=http://localhost:5001
NODE_ENV=development
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```

### 4. ML Service Setup
```bash
cd ml-service
pip install -r requirements.txt
```

## 🎯 Running the Application

You need to run three services:

### 1. Start MongoDB
```bash
mongod
```

### 2. Start Backend Server
```bash
cd backend
npm run dev
```
Backend will run on http://localhost:5000

### 3. Start ML Service
```bash
cd ml-service
python app.py
```
ML service will run on http://localhost:5001

### 4. Start Frontend
```bash
cd frontend
npm run dev
```
Frontend will run on http://localhost:5173

### 5. Seed Database (First Time Only)
```bash
cd backend
npm run seed
```

## 📱 Usage

1. **Register**: Create a new account at http://localhost:5173/register
2. **Complete Profile**: Fill out your profile with academic and personal details
3. **Get Recommendations**: Navigate to the Recommendations page to see personalized matches
4. **Browse Scholarships**: Explore all available scholarships with filters
5. **Save Scholarships**: Bookmark scholarships for later reference
6. **Apply**: Click "Apply Now" to visit the scholarship application page

## 🗂️ Project Structure

```
sc project/
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Auth middleware
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── scripts/         # Database seeding
│   ├── services/        # Business logic
│   └── server.js        # Entry point
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── context/     # React context
│   │   ├── pages/       # Page components
│   │   ├── utils/       # Utilities
│   │   ├── App.jsx      # Main app component
│   │   └── main.jsx     # Entry point
│   └── index.html
└── ml-service/
    ├── recommendation_engine.py  # ML algorithm
    ├── app.py                    # Flask server
    └── requirements.txt
```

## 🎓 Available Scholarships

The system includes scholarships from:
- National Scholarship Portal (NSP) schemes
- State government scholarships
- AICTE, UGC, and other government bodies
- Private organizations (Tata, Reliance, etc.)
- International programs (Fulbright, Chevening, DAAD, etc.)
- University-specific scholarships
- Sports and minority scholarships

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### User
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile
- `GET /api/users/saved-scholarships` - Get saved scholarships
- `POST /api/users/save-scholarship/:id` - Save scholarship
- `DELETE /api/users/unsave-scholarship/:id` - Remove saved scholarship

### Scholarships
- `GET /api/scholarships` - Get all scholarships (with filters)
- `GET /api/scholarships/:id` - Get single scholarship
- `GET /api/scholarships/search` - Search scholarships
- `GET /api/scholarships/recommendations` - Get personalized recommendations
- `GET /api/scholarships/stats` - Get scholarship statistics

## 🤖 ML Recommendation Algorithm

The system uses a hybrid approach:
1. **Rule-based Filtering**: Filters scholarships based on hard eligibility criteria
2. **Content-based Filtering**: Uses TF-IDF and cosine similarity to match user profiles with scholarship descriptions
3. **Feature Similarity**: Calculates similarity based on numerical features (income, percentage, etc.)
4. **Hybrid Scoring**: Combines eligibility scores with ML scores for final recommendations

## 🎨 Design Features

- Glassmorphism effects
- Gradient backgrounds
- Smooth animations
- Responsive design
- Modern color palette
- Custom scrollbar
- Loading states
- Error handling

## 📊 Future Enhancements

- Document upload functionality
- Application tracking
- Email notifications for deadlines
- Collaborative filtering based on user behavior
- More scholarship sources
- Mobile app
- Multi-language support

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👥 Support

For support, please email support@scholarshipfinder.com or create an issue in the repository.

---

Made with ❤️ for Indian students seeking educational opportunities
