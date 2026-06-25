import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Scholarship from '../models/Scholarship.js';
import connectDB from '../config/db.js';

dotenv.config();

const scholarships = [
    // National Government Scholarships - India
    {
        name: "National Scholarship Portal - Post Matric Scholarship for SC Students",
        provider: "Government",
        type: "Need-based",
        scope: "National",
        country: "India",
        description: "Financial assistance to SC students studying at post-matriculation or post-secondary stage to enable them to complete their education.",
        benefits: {
            amount: 10000,
            currency: "INR",
            type: "Annual",
            additionalBenefits: ["Tuition fees", "Maintenance allowance"]
        },
        eligibilityCriteria: {
            minAge: 16,
            maxAge: 35,
            gender: ["All"],
            category: ["SC"],
            educationLevel: ["12th", "Undergraduate", "Postgraduate"],
            stream: ["All"],
            minPercentage: 50,
            minCGPA: 5.0,
            maxFamilyIncome: 250000,
            states: [],
            disabilities: false,
            sportsRequired: false,
            nationality: "Indian"
        },
        applicationDetails: {
            startDate: new Date("2026-08-01"),
            endDate: new Date("2026-10-31"),
            applicationLink: "https://scholarships.gov.in/",
            requiredDocuments: ["Income Certificate", "Caste Certificate", "Marksheet", "Bank Details"]
        },
        tags: ["government", "sc", "post-matric", "national"],
        isActive: true
    },
    {
        name: "National Scholarship Portal - Post Matric Scholarship for OBC Students",
        provider: "Government",
        type: "Need-based",
        scope: "National",
        country: "India",
        description: "Scholarship for OBC students to pursue post-matriculation studies and reduce dropout rates.",
        benefits: {
            amount: 12000,
            currency: "INR",
            type: "Annual",
            additionalBenefits: ["Tuition fees", "Maintenance allowance"]
        },
        eligibilityCriteria: {
            minAge: 16,
            maxAge: 35,
            gender: ["All"],
            category: ["OBC"],
            educationLevel: ["12th", "Undergraduate", "Postgraduate"],
            stream: ["All"],
            minPercentage: 50,
            minCGPA: 5.0,
            maxFamilyIncome: 100000,
            states: [],
            disabilities: false,
            sportsRequired: false,
            nationality: "Indian"
        },
        applicationDetails: {
            startDate: new Date("2026-08-01"),
            endDate: new Date("2026-10-31"),
            applicationLink: "https://scholarships.gov.in/",
            requiredDocuments: ["Income Certificate", "Caste Certificate", "Marksheet", "Bank Details"]
        },
        tags: ["government", "obc", "post-matric", "national"],
        isActive: true
    },
    {
        name: "National Means-cum-Merit Scholarship (NMMS)",
        provider: "Government",
        type: "Merit-based",
        scope: "National",
        country: "India",
        description: "Scholarship to meritorious students from economically weaker sections to prevent dropouts at class 8 and encourage them to continue studies.",
        benefits: {
            amount: 12000,
            currency: "INR",
            type: "Annual",
            additionalBenefits: []
        },
        eligibilityCriteria: {
            minAge: 13,
            maxAge: 18,
            gender: ["All"],
            category: ["All"],
            educationLevel: ["10th", "12th"],
            stream: ["All"],
            minPercentage: 55,
            minCGPA: 5.5,
            maxFamilyIncome: 150000,
            states: [],
            disabilities: false,
            sportsRequired: false,
            nationality: "Indian"
        },
        applicationDetails: {
            startDate: new Date("2026-07-01"),
            endDate: new Date("2026-09-30"),
            applicationLink: "https://scholarships.gov.in/",
            requiredDocuments: ["Income Certificate", "Marksheet", "School Certificate"]
        },
        tags: ["government", "merit", "nmms", "national"],
        isActive: true
    },
    {
        name: "Prime Minister's Scholarship Scheme for Central Armed Police Forces and Assam Rifles",
        provider: "Government",
        type: "Merit-based",
        scope: "National",
        country: "India",
        description: "Scholarship for wards/widows of ex-CAPF and AR personnel for professional and technical courses.",
        benefits: {
            amount: 30000,
            currency: "INR",
            type: "Annual",
            additionalBenefits: []
        },
        eligibilityCriteria: {
            minAge: 17,
            maxAge: 25,
            gender: ["All"],
            category: ["All"],
            educationLevel: ["12th", "Undergraduate"],
            stream: ["Engineering", "Medical", "Management"],
            minPercentage: 60,
            minCGPA: 6.0,
            maxFamilyIncome: Infinity,
            states: [],
            disabilities: false,
            sportsRequired: false,
            nationality: "Indian"
        },
        applicationDetails: {
            startDate: new Date("2026-08-01"),
            endDate: new Date("2026-10-15"),
            applicationLink: "https://scholarships.gov.in/",
            requiredDocuments: ["Service Certificate", "Marksheet", "Admission Proof"]
        },
        tags: ["government", "defense", "merit", "national"],
        isActive: true
    },
    {
        name: "AICTE Pragati Scholarship for Girls",
        provider: "Government",
        type: "Merit-based",
        scope: "National",
        country: "India",
        description: "Scholarship for girl students pursuing technical education (Degree/Diploma) to encourage more girls in technical education.",
        benefits: {
            amount: 50000,
            currency: "INR",
            type: "Annual",
            additionalBenefits: []
        },
        eligibilityCriteria: {
            minAge: 17,
            maxAge: 25,
            gender: ["Female"],
            category: ["All"],
            educationLevel: ["Undergraduate", "Diploma"],
            stream: ["Engineering"],
            minPercentage: 60,
            minCGPA: 6.0,
            maxFamilyIncome: 800000,
            states: [],
            disabilities: false,
            sportsRequired: false,
            nationality: "Indian"
        },
        applicationDetails: {
            startDate: new Date("2026-09-01"),
            endDate: new Date("2026-10-31"),
            applicationLink: "https://www.aicte-india.org/",
            requiredDocuments: ["Income Certificate", "Marksheet", "Admission Letter", "Bank Details"]
        },
        tags: ["aicte", "girls", "engineering", "pragati"],
        isActive: true
    },
    {
        name: "INSPIRE Scholarship for Higher Education (SHE)",
        provider: "Government",
        type: "Merit-based",
        scope: "National",
        country: "India",
        description: "Scholarship for students pursuing Natural and Basic Sciences at Bachelor and Master level.",
        benefits: {
            amount: 80000,
            currency: "INR",
            type: "Annual",
            additionalBenefits: ["Mentorship", "Research opportunities"]
        },
        eligibilityCriteria: {
            minAge: 17,
            maxAge: 27,
            gender: ["All"],
            category: ["All"],
            educationLevel: ["Undergraduate", "Postgraduate"],
            stream: ["Science"],
            minPercentage: 60,
            minCGPA: 6.0,
            maxFamilyIncome: Infinity,
            states: [],
            disabilities: false,
            sportsRequired: false,
            nationality: "Indian"
        },
        applicationDetails: {
            startDate: new Date("2026-07-01"),
            endDate: new Date("2026-09-30"),
            applicationLink: "https://online-inspire.gov.in/",
            requiredDocuments: ["Marksheet", "Admission Proof", "Bank Details"]
        },
        tags: ["inspire", "science", "research", "merit"],
        isActive: true
    },
    {
        name: "National Scholarship for Persons with Disabilities",
        provider: "Government",
        type: "Need-based",
        scope: "National",
        country: "India",
        description: "Financial assistance to students with disabilities for pursuing post-secondary education.",
        benefits: {
            amount: 15000,
            currency: "INR",
            type: "Annual",
            additionalBenefits: ["Books allowance", "Equipment allowance"]
        },
        eligibilityCriteria: {
            minAge: 16,
            maxAge: 35,
            gender: ["All"],
            category: ["All"],
            educationLevel: ["12th", "Undergraduate", "Postgraduate"],
            stream: ["All"],
            minPercentage: 40,
            minCGPA: 4.0,
            maxFamilyIncome: 250000,
            states: [],
            disabilities: true,
            sportsRequired: false,
            nationality: "Indian"
        },
        applicationDetails: {
            startDate: new Date("2026-08-01"),
            endDate: new Date("2026-10-31"),
            applicationLink: "https://scholarships.gov.in/",
            requiredDocuments: ["Disability Certificate", "Income Certificate", "Marksheet"]
        },
        tags: ["disability", "pwd", "government", "inclusive"],
        isActive: true
    },

    // State Government Scholarships
    {
        name: "Maharashtra State Government Post-Matric Scholarship",
        provider: "Government",
        type: "Need-based",
        scope: "State",
        country: "India",
        description: "Scholarship for students from Maharashtra pursuing post-matric education.",
        benefits: {
            amount: 15000,
            currency: "INR",
            type: "Annual",
            additionalBenefits: ["Tuition fees"]
        },
        eligibilityCriteria: {
            minAge: 16,
            maxAge: 30,
            gender: ["All"],
            category: ["SC", "ST", "OBC"],
            educationLevel: ["12th", "Undergraduate", "Postgraduate"],
            stream: ["All"],
            minPercentage: 50,
            minCGPA: 5.0,
            maxFamilyIncome: 250000,
            states: ["Maharashtra"],
            disabilities: false,
            sportsRequired: false,
            nationality: "Indian"
        },
        applicationDetails: {
            startDate: new Date("2026-08-01"),
            endDate: new Date("2026-10-31"),
            applicationLink: "https://mahadbt.maharashtra.gov.in/",
            requiredDocuments: ["Domicile Certificate", "Income Certificate", "Caste Certificate", "Marksheet"]
        },
        tags: ["maharashtra", "state", "post-matric"],
        isActive: true
    },
    {
        name: "Karnataka Rajyotsava Award Scholarship",
        provider: "Government",
        type: "Merit-based",
        scope: "State",
        country: "India",
        description: "Merit scholarship for students in Karnataka who have excelled in academics.",
        benefits: {
            amount: 20000,
            currency: "INR",
            type: "One-time",
            additionalBenefits: []
        },
        eligibilityCriteria: {
            minAge: 15,
            maxAge: 25,
            gender: ["All"],
            category: ["All"],
            educationLevel: ["10th", "12th", "Undergraduate"],
            stream: ["All"],
            minPercentage: 85,
            minCGPA: 8.5,
            maxFamilyIncome: Infinity,
            states: ["Karnataka"],
            disabilities: false,
            sportsRequired: false,
            nationality: "Indian"
        },
        applicationDetails: {
            startDate: new Date("2026-11-01"),
            endDate: new Date("2026-12-15"),
            applicationLink: "https://scholarships.gov.in/",
            requiredDocuments: ["Domicile Certificate", "Marksheet"]
        },
        tags: ["karnataka", "state", "merit", "rajyotsava"],
        isActive: true
    },

    // Private Scholarships
    {
        name: "Tata Scholarship for Cornell University",
        provider: "Private",
        type: "Merit-based",
        scope: "International",
        country: "USA",
        description: "Full scholarship for Indian students to pursue undergraduate studies at Cornell University.",
        benefits: {
            amount: 5000000,
            currency: "INR",
            type: "Annual",
            additionalBenefits: ["Tuition", "Living expenses", "Travel"]
        },
        eligibilityCriteria: {
            minAge: 17,
            maxAge: 20,
            gender: ["All"],
            category: ["All"],
            educationLevel: ["12th"],
            stream: ["All"],
            minPercentage: 90,
            minCGPA: 9.0,
            maxFamilyIncome: 600000,
            states: [],
            disabilities: false,
            sportsRequired: false,
            nationality: "Indian"
        },
        applicationDetails: {
            startDate: new Date("2026-09-01"),
            endDate: new Date("2027-01-15"),
            applicationLink: "https://admissions.cornell.edu/",
            requiredDocuments: ["SAT/ACT Scores", "Essays", "Recommendation Letters", "Transcripts"]
        },
        tags: ["tata", "cornell", "international", "usa", "full-scholarship"],
        isActive: true
    },
    {
        name: "Reliance Foundation Undergraduate Scholarship",
        provider: "Private",
        type: "Merit-based",
        scope: "National",
        country: "India",
        description: "Scholarship for meritorious students from economically disadvantaged backgrounds pursuing undergraduate studies.",
        benefits: {
            amount: 200000,
            currency: "INR",
            type: "Annual",
            additionalBenefits: ["Mentorship", "Internship opportunities"]
        },
        eligibilityCriteria: {
            minAge: 17,
            maxAge: 22,
            gender: ["All"],
            category: ["All"],
            educationLevel: ["Undergraduate"],
            stream: ["All"],
            minPercentage: 75,
            minCGPA: 7.5,
            maxFamilyIncome: 400000,
            states: [],
            disabilities: false,
            sportsRequired: false,
            nationality: "Indian"
        },
        applicationDetails: {
            startDate: new Date("2026-07-01"),
            endDate: new Date("2026-09-30"),
            applicationLink: "https://www.reliancefoundation.org/",
            requiredDocuments: ["Income Certificate", "Marksheet", "Admission Letter", "Essays"]
        },
        tags: ["reliance", "private", "undergraduate", "merit"],
        isActive: true
    },
    {
        name: "Sitaram Jindal Foundation Scholarship",
        provider: "Private",
        type: "Merit-based",
        scope: "National",
        country: "India",
        description: "Scholarship for meritorious students pursuing professional courses.",
        benefits: {
            amount: 50000,
            currency: "INR",
            type: "Annual",
            additionalBenefits: []
        },
        eligibilityCriteria: {
            minAge: 17,
            maxAge: 25,
            gender: ["All"],
            category: ["All"],
            educationLevel: ["Undergraduate", "Postgraduate"],
            stream: ["Engineering", "Medical", "Management"],
            minPercentage: 70,
            minCGPA: 7.0,
            maxFamilyIncome: 500000,
            states: [],
            disabilities: false,
            sportsRequired: false,
            nationality: "Indian"
        },
        applicationDetails: {
            startDate: new Date("2026-08-01"),
            endDate: new Date("2026-10-31"),
            applicationLink: "https://www.sitaramjindalfoundation.org/",
            requiredDocuments: ["Income Certificate", "Marksheet", "Admission Proof"]
        },
        tags: ["jindal", "private", "professional"],
        isActive: true
    },
    {
        name: "K.C. Mahindra Scholarship for Post-Graduate Studies Abroad",
        provider: "Private",
        type: "Merit-based",
        scope: "International",
        country: "Various",
        description: "Interest-free loan scholarship for Indian students pursuing postgraduate studies abroad.",
        benefits: {
            amount: 500000,
            currency: "INR",
            type: "One-time",
            additionalBenefits: ["Interest-free loan"]
        },
        eligibilityCriteria: {
            minAge: 21,
            maxAge: 30,
            gender: ["All"],
            category: ["All"],
            educationLevel: ["Postgraduate"],
            stream: ["All"],
            minPercentage: 70,
            minCGPA: 7.0,
            maxFamilyIncome: 700000,
            states: [],
            disabilities: false,
            sportsRequired: false,
            nationality: "Indian"
        },
        applicationDetails: {
            startDate: new Date("2026-01-01"),
            endDate: new Date("2026-03-31"),
            applicationLink: "https://www.kcmet.org/",
            requiredDocuments: ["Admission Letter", "GRE/GMAT Scores", "Essays", "Recommendation Letters"]
        },
        tags: ["mahindra", "international", "postgraduate", "loan"],
        isActive: true
    },

    // International Scholarships
    {
        name: "Fulbright-Nehru Master's Fellowships",
        provider: "International Organization",
        type: "Merit-based",
        scope: "International",
        country: "USA",
        description: "Fellowship for outstanding Indian students to pursue Master's degree in the United States.",
        benefits: {
            amount: 4000000,
            currency: "INR",
            type: "Annual",
            additionalBenefits: ["Tuition", "Living expenses", "Health insurance", "Travel"]
        },
        eligibilityCriteria: {
            minAge: 21,
            maxAge: 35,
            gender: ["All"],
            category: ["All"],
            educationLevel: ["Postgraduate"],
            stream: ["All"],
            minPercentage: 75,
            minCGPA: 7.5,
            maxFamilyIncome: Infinity,
            states: [],
            disabilities: false,
            sportsRequired: false,
            nationality: "Indian"
        },
        applicationDetails: {
            startDate: new Date("2026-05-01"),
            endDate: new Date("2026-07-15"),
            applicationLink: "https://www.usief.org.in/",
            requiredDocuments: ["GRE/GMAT Scores", "TOEFL/IELTS", "Essays", "Recommendation Letters", "Research Proposal"]
        },
        tags: ["fulbright", "usa", "masters", "international"],
        isActive: true
    },
    {
        name: "Chevening Scholarships",
        provider: "International Organization",
        type: "Merit-based",
        scope: "International",
        country: "UK",
        description: "UK government's global scholarship programme for future leaders to pursue one-year Master's degree in the UK.",
        benefits: {
            amount: 3500000,
            currency: "INR",
            type: "One-time",
            additionalBenefits: ["Tuition", "Living expenses", "Travel", "Visa costs"]
        },
        eligibilityCriteria: {
            minAge: 23,
            maxAge: 40,
            gender: ["All"],
            category: ["All"],
            educationLevel: ["Postgraduate"],
            stream: ["All"],
            minPercentage: 70,
            minCGPA: 7.0,
            maxFamilyIncome: Infinity,
            states: [],
            disabilities: false,
            sportsRequired: false,
            nationality: "Indian"
        },
        applicationDetails: {
            startDate: new Date("2026-08-01"),
            endDate: new Date("2026-11-01"),
            applicationLink: "https://www.chevening.org/",
            requiredDocuments: ["IELTS", "Work Experience", "Essays", "Recommendation Letters"]
        },
        tags: ["chevening", "uk", "masters", "leadership"],
        isActive: true
    },
    {
        name: "DAAD Scholarships for Development-Related Postgraduate Courses",
        provider: "International Organization",
        type: "Merit-based",
        scope: "International",
        country: "Germany",
        description: "Scholarship for professionals from developing countries to pursue postgraduate studies in Germany.",
        benefits: {
            amount: 2500000,
            currency: "INR",
            type: "Annual",
            additionalBenefits: ["Tuition", "Living expenses", "Health insurance", "Travel"]
        },
        eligibilityCriteria: {
            minAge: 23,
            maxAge: 36,
            gender: ["All"],
            category: ["All"],
            educationLevel: ["Postgraduate"],
            stream: ["All"],
            minPercentage: 70,
            minCGPA: 7.0,
            maxFamilyIncome: Infinity,
            states: [],
            disabilities: false,
            sportsRequired: false,
            nationality: "Indian"
        },
        applicationDetails: {
            startDate: new Date("2026-08-01"),
            endDate: new Date("2026-10-31"),
            applicationLink: "https://www.daad.de/",
            requiredDocuments: ["IELTS/TOEFL", "Work Experience", "Motivation Letter", "Recommendation Letters"]
        },
        tags: ["daad", "germany", "postgraduate", "development"],
        isActive: true
    },
    {
        name: "Australia Awards Scholarships",
        provider: "International Organization",
        type: "Merit-based",
        scope: "International",
        country: "Australia",
        description: "Long-term development awards for study at participating Australian universities.",
        benefits: {
            amount: 3000000,
            currency: "INR",
            type: "Annual",
            additionalBenefits: ["Tuition", "Living expenses", "Health insurance", "Travel"]
        },
        eligibilityCriteria: {
            minAge: 21,
            maxAge: 40,
            gender: ["All"],
            category: ["All"],
            educationLevel: ["Postgraduate"],
            stream: ["All"],
            minPercentage: 70,
            minCGPA: 7.0,
            maxFamilyIncome: Infinity,
            states: [],
            disabilities: false,
            sportsRequired: false,
            nationality: "Indian"
        },
        applicationDetails: {
            startDate: new Date("2026-02-01"),
            endDate: new Date("2026-04-30"),
            applicationLink: "https://www.dfat.gov.au/people-to-people/australia-awards/",
            requiredDocuments: ["IELTS", "Work Experience", "Essays", "Recommendation Letters"]
        },
        tags: ["australia", "awards", "postgraduate", "international"],
        isActive: true
    },
    {
        name: "Commonwealth Scholarship and Fellowship Plan",
        provider: "International Organization",
        type: "Merit-based",
        scope: "International",
        country: "UK",
        description: "Scholarships for students from Commonwealth countries to study in the UK.",
        benefits: {
            amount: 3200000,
            currency: "INR",
            type: "Annual",
            additionalBenefits: ["Tuition", "Living expenses", "Travel"]
        },
        eligibilityCriteria: {
            minAge: 21,
            maxAge: 35,
            gender: ["All"],
            category: ["All"],
            educationLevel: ["Postgraduate", "PhD"],
            stream: ["All"],
            minPercentage: 75,
            minCGPA: 7.5,
            maxFamilyIncome: Infinity,
            states: [],
            disabilities: false,
            sportsRequired: false,
            nationality: "Indian"
        },
        applicationDetails: {
            startDate: new Date("2026-08-01"),
            endDate: new Date("2026-10-15"),
            applicationLink: "https://cscuk.fcdo.gov.uk/",
            requiredDocuments: ["IELTS", "Research Proposal", "Recommendation Letters"]
        },
        tags: ["commonwealth", "uk", "research", "phd"],
        isActive: true
    },

    // University Scholarships
    {
        name: "IIT Delhi Merit-cum-Means Scholarship",
        provider: "University",
        type: "Mixed",
        scope: "Institutional",
        country: "India",
        description: "Scholarship for meritorious students from economically weaker sections at IIT Delhi.",
        benefits: {
            amount: 100000,
            currency: "INR",
            type: "Annual",
            additionalBenefits: ["Tuition waiver"]
        },
        eligibilityCriteria: {
            minAge: 17,
            maxAge: 25,
            gender: ["All"],
            category: ["All"],
            educationLevel: ["Undergraduate"],
            stream: ["Engineering"],
            minPercentage: 75,
            minCGPA: 7.5,
            maxFamilyIncome: 450000,
            states: [],
            disabilities: false,
            sportsRequired: false,
            nationality: "Indian"
        },
        applicationDetails: {
            startDate: new Date("2026-07-01"),
            endDate: new Date("2026-08-31"),
            applicationLink: "https://home.iitd.ac.in/",
            requiredDocuments: ["JEE Advanced Rank", "Income Certificate", "Admission Letter"]
        },
        tags: ["iit", "delhi", "engineering", "merit"],
        isActive: true
    },
    {
        name: "Delhi University SC/ST Scholarship",
        provider: "University",
        type: "Need-based",
        scope: "Institutional",
        country: "India",
        description: "Financial assistance for SC/ST students studying at Delhi University.",
        benefits: {
            amount: 20000,
            currency: "INR",
            type: "Annual",
            additionalBenefits: []
        },
        eligibilityCriteria: {
            minAge: 17,
            maxAge: 30,
            gender: ["All"],
            category: ["SC", "ST"],
            educationLevel: ["Undergraduate", "Postgraduate"],
            stream: ["All"],
            minPercentage: 50,
            minCGPA: 5.0,
            maxFamilyIncome: 250000,
            states: [],
            disabilities: false,
            sportsRequired: false,
            nationality: "Indian"
        },
        applicationDetails: {
            startDate: new Date("2026-08-01"),
            endDate: new Date("2026-10-31"),
            applicationLink: "http://www.du.ac.in/",
            requiredDocuments: ["Caste Certificate", "Income Certificate", "Marksheet", "Admission Proof"]
        },
        tags: ["du", "delhi", "sc", "st"],
        isActive: true
    },

    // Sports Scholarships
    {
        name: "Sports Authority of India Scholarship",
        provider: "Government",
        type: "Sports",
        scope: "National",
        country: "India",
        description: "Scholarship for talented sports persons to pursue education while training.",
        benefits: {
            amount: 50000,
            currency: "INR",
            type: "Annual",
            additionalBenefits: ["Training facilities", "Coaching", "Equipment"]
        },
        eligibilityCriteria: {
            minAge: 14,
            maxAge: 25,
            gender: ["All"],
            category: ["All"],
            educationLevel: ["10th", "12th", "Undergraduate"],
            stream: ["All"],
            minPercentage: 40,
            minCGPA: 4.0,
            maxFamilyIncome: Infinity,
            states: [],
            disabilities: false,
            sportsRequired: true,
            nationality: "Indian"
        },
        applicationDetails: {
            startDate: new Date("2026-06-01"),
            endDate: new Date("2026-08-31"),
            applicationLink: "https://sportsauthorityofindia.nic.in/",
            requiredDocuments: ["Sports Achievement Certificate", "Marksheet", "Coach Recommendation"]
        },
        tags: ["sports", "sai", "athletics", "government"],
        isActive: true
    },

    // Minority Scholarships
    {
        name: "Maulana Azad National Fellowship for Minority Students",
        provider: "Government",
        type: "Research",
        scope: "National",
        country: "India",
        description: "Fellowship for students from minority communities to pursue M.Phil and Ph.D.",
        benefits: {
            amount: 300000,
            currency: "INR",
            type: "Annual",
            additionalBenefits: ["Contingency grant", "HRA"]
        },
        eligibilityCriteria: {
            minAge: 23,
            maxAge: 35,
            gender: ["All"],
            category: ["All"],
            educationLevel: ["Postgraduate", "PhD"],
            stream: ["All"],
            minPercentage: 55,
            minCGPA: 5.5,
            maxFamilyIncome: Infinity,
            states: [],
            disabilities: false,
            sportsRequired: false,
            nationality: "Indian"
        },
        applicationDetails: {
            startDate: new Date("2026-09-01"),
            endDate: new Date("2026-11-30"),
            applicationLink: "https://www.ugc.ac.in/",
            requiredDocuments: ["Minority Certificate", "Marksheet", "Research Proposal", "Admission Letter"]
        },
        tags: ["minority", "research", "fellowship", "ugc"],
        isActive: true
    },

    // Women-focused Scholarships
    {
        name: "Indira Gandhi Scholarship for Single Girl Child",
        provider: "Government",
        type: "Merit-based",
        scope: "National",
        country: "India",
        description: "Scholarship for single girl child for pursuing postgraduate studies.",
        benefits: {
            amount: 36000,
            currency: "INR",
            type: "Annual",
            additionalBenefits: []
        },
        eligibilityCriteria: {
            minAge: 21,
            maxAge: 30,
            gender: ["Female"],
            category: ["All"],
            educationLevel: ["Postgraduate"],
            stream: ["All"],
            minPercentage: 50,
            minCGPA: 5.0,
            maxFamilyIncome: Infinity,
            states: [],
            disabilities: false,
            sportsRequired: false,
            nationality: "Indian"
        },
        applicationDetails: {
            startDate: new Date("2026-09-01"),
            endDate: new Date("2026-11-30"),
            applicationLink: "https://www.ugc.ac.in/",
            requiredDocuments: ["Single Girl Child Certificate", "Marksheet", "Admission Proof"]
        },
        tags: ["women", "single-girl-child", "postgraduate", "ugc"],
        isActive: true
    },
    {
        name: "WeTech Qualcomm Global Scholarship for Women in STEM",
        provider: "Private",
        type: "Merit-based",
        scope: "International",
        country: "Various",
        description: "Scholarship for women pursuing undergraduate degrees in STEM fields.",
        benefits: {
            amount: 700000,
            currency: "INR",
            type: "One-time",
            additionalBenefits: ["Mentorship", "Networking opportunities"]
        },
        eligibilityCriteria: {
            minAge: 17,
            maxAge: 25,
            gender: ["Female"],
            category: ["All"],
            educationLevel: ["Undergraduate"],
            stream: ["Science", "Engineering"],
            minPercentage: 70,
            minCGPA: 7.0,
            maxFamilyIncome: 800000,
            states: [],
            disabilities: false,
            sportsRequired: false,
            nationality: "Indian"
        },
        applicationDetails: {
            startDate: new Date("2026-01-01"),
            endDate: new Date("2026-03-31"),
            applicationLink: "https://www.iie.org/Programs/WeTech",
            requiredDocuments: ["Marksheet", "Essays", "Recommendation Letters"]
        },
        tags: ["women", "stem", "qualcomm", "international"],
        isActive: true
    },

    // Tech Company Scholarships
    {
        name: "Google India Scholarship Program",
        provider: "Private",
        type: "Merit-based",
        scope: "National",
        country: "India",
        description: "Scholarship for students pursuing computer science and related technical fields.",
        benefits: {
            amount: 100000,
            currency: "INR",
            type: "Annual",
            additionalBenefits: ["Mentorship", "Networking events", "Google swag"]
        },
        eligibilityCriteria: {
            minAge: 18,
            maxAge: 25,
            gender: ["All"],
            category: ["All"],
            educationLevel: ["Undergraduate", "Postgraduate"],
            stream: ["Engineering", "Science"],
            minPercentage: 70,
            minCGPA: 7.0,
            maxFamilyIncome: Infinity,
            states: [],
            disabilities: false,
            sportsRequired: false,
            nationality: "Indian"
        },
        applicationDetails: {
            startDate: new Date("2026-08-01"),
            endDate: new Date("2026-10-31"),
            applicationLink: "https://buildyourfuture.withgoogle.com/scholarships",
            requiredDocuments: ["Marksheet", "Essays", "Resume", "Recommendation Letters"]
        },
        tags: ["google", "tech", "computer-science", "merit"],
        isActive: true
    },
    {
        name: "Microsoft Scholarship Programme",
        provider: "Private",
        type: "Merit-based",
        scope: "International",
        country: "Various",
        description: "Scholarship for students pursuing degrees in computer science, computer engineering, or related STEM disciplines.",
        benefits: {
            amount: 500000,
            currency: "INR",
            type: "Annual",
            additionalBenefits: ["Internship opportunity", "Mentorship"]
        },
        eligibilityCriteria: {
            minAge: 18,
            maxAge: 26,
            gender: ["All"],
            category: ["All"],
            educationLevel: ["Undergraduate", "Postgraduate"],
            stream: ["Engineering", "Science"],
            minPercentage: 75,
            minCGPA: 7.5,
            maxFamilyIncome: Infinity,
            states: [],
            disabilities: false,
            sportsRequired: false,
            nationality: "Indian"
        },
        applicationDetails: {
            startDate: new Date("2026-09-01"),
            endDate: new Date("2026-11-30"),
            applicationLink: "https://www.microsoft.com/en-us/diversity/programs/scholarships.aspx",
            requiredDocuments: ["Marksheet", "Essays", "Resume", "Project Portfolio"]
        },
        tags: ["microsoft", "tech", "stem", "international"],
        isActive: true
    },

    // Banking Sector Scholarships
    {
        name: "SBI Scholar Programme",
        provider: "Private",
        type: "Merit-based",
        scope: "National",
        country: "India",
        description: "Scholarship for meritorious students from economically disadvantaged backgrounds.",
        benefits: {
            amount: 150000,
            currency: "INR",
            type: "Annual",
            additionalBenefits: ["Mentorship", "Skill development workshops"]
        },
        eligibilityCriteria: {
            minAge: 17,
            maxAge: 25,
            gender: ["All"],
            category: ["All"],
            educationLevel: ["Undergraduate", "Postgraduate"],
            stream: ["All"],
            minPercentage: 75,
            minCGPA: 7.5,
            maxFamilyIncome: 300000,
            states: [],
            disabilities: false,
            sportsRequired: false,
            nationality: "Indian"
        },
        applicationDetails: {
            startDate: new Date("2026-08-01"),
            endDate: new Date("2026-10-31"),
            applicationLink: "https://www.buddy4study.com/page/sbi-scholarship",
            requiredDocuments: ["Income Certificate", "Marksheet", "Admission Letter", "Bank Details"]
        },
        tags: ["sbi", "banking", "merit", "national"],
        isActive: true
    },
    {
        name: "HDFC Educational Crisis Scholarship",
        provider: "Private",
        type: "Need-based",
        scope: "National",
        country: "India",
        description: "Support for students facing financial crisis due to death or disability of the earning parent.",
        benefits: {
            amount: 75000,
            currency: "INR",
            type: "Annual",
            additionalBenefits: ["Counseling support"]
        },
        eligibilityCriteria: {
            minAge: 16,
            maxAge: 25,
            gender: ["All"],
            category: ["All"],
            educationLevel: ["12th", "Undergraduate", "Postgraduate"],
            stream: ["All"],
            minPercentage: 55,
            minCGPA: 5.5,
            maxFamilyIncome: 250000,
            states: [],
            disabilities: false,
            sportsRequired: false,
            nationality: "Indian"
        },
        applicationDetails: {
            startDate: new Date("2026-07-01"),
            endDate: new Date("2026-09-30"),
            applicationLink: "https://www.hdfcbank.com/personal/resources/learning-centre/pay/hdfc-bank-parivartan-ecss-scholarship-programme",
            requiredDocuments: ["Death/Disability Certificate", "Income Certificate", "Marksheet"]
        },
        tags: ["hdfc", "crisis", "need-based", "support"],
        isActive: true
    },

    // NGO Scholarships
    {
        name: "Narotam Sekhsaria Foundation Scholarship",
        provider: "NGO",
        type: "Merit-based",
        scope: "National",
        country: "India",
        description: "Scholarship for academically bright students from economically and socially challenged backgrounds.",
        benefits: {
            amount: 120000,
            currency: "INR",
            type: "Annual",
            additionalBenefits: ["Mentorship", "Leadership training"]
        },
        eligibilityCriteria: {
            minAge: 17,
            maxAge: 25,
            gender: ["All"],
            category: ["All"],
            educationLevel: ["Undergraduate", "Postgraduate"],
            stream: ["All"],
            minPercentage: 80,
            minCGPA: 8.0,
            maxFamilyIncome: 400000,
            states: [],
            disabilities: false,
            sportsRequired: false,
            nationality: "Indian"
        },
        applicationDetails: {
            startDate: new Date("2026-07-01"),
            endDate: new Date("2026-09-30"),
            applicationLink: "https://www.nsfoundation.co.in/",
            requiredDocuments: ["Income Certificate", "Marksheet", "Essays", "Recommendation Letters"]
        },
        tags: ["nsf", "ngo", "merit", "leadership"],
        isActive: true
    },
    {
        name: "Tata Trusts Scholarship for Undergraduate Studies",
        provider: "NGO",
        type: "Merit-based",
        scope: "National",
        country: "India",
        description: "Scholarship for students from low-income families pursuing undergraduate education.",
        benefits: {
            amount: 100000,
            currency: "INR",
            type: "Annual",
            additionalBenefits: ["Career counseling", "Soft skills training"]
        },
        eligibilityCriteria: {
            minAge: 17,
            maxAge: 22,
            gender: ["All"],
            category: ["All"],
            educationLevel: ["Undergraduate"],
            stream: ["All"],
            minPercentage: 60,
            minCGPA: 6.0,
            maxFamilyIncome: 400000,
            states: [],
            disabilities: false,
            sportsRequired: false,
            nationality: "Indian"
        },
        applicationDetails: {
            startDate: new Date("2026-08-01"),
            endDate: new Date("2026-10-31"),
            applicationLink: "https://www.tatatrusts.org/our-work/individual-grants-programme/education",
            requiredDocuments: ["Income Certificate", "Marksheet", "Admission Letter"]
        },
        tags: ["tata", "trusts", "undergraduate", "merit"],
        isActive: true
    },

    // More Government Schemes
    {
        name: "Central Sector Scheme of Scholarship for College and University Students",
        provider: "Government",
        type: "Merit-based",
        scope: "National",
        country: "India",
        description: "Merit-based scholarship for students whose family income is less than 8 lakh per annum.",
        benefits: {
            amount: 20000,
            currency: "INR",
            type: "Annual",
            additionalBenefits: []
        },
        eligibilityCriteria: {
            minAge: 17,
            maxAge: 25,
            gender: ["All"],
            category: ["All"],
            educationLevel: ["Undergraduate", "Postgraduate"],
            stream: ["All"],
            minPercentage: 80,
            minCGPA: 8.0,
            maxFamilyIncome: 800000,
            states: [],
            disabilities: false,
            sportsRequired: false,
            nationality: "Indian"
        },
        applicationDetails: {
            startDate: new Date("2026-09-01"),
            endDate: new Date("2026-10-31"),
            applicationLink: "https://scholarships.gov.in/",
            requiredDocuments: ["Income Certificate", "Marksheet", "Admission Proof", "Bank Details"]
        },
        tags: ["government", "central-sector", "merit", "college"],
        isActive: true
    },
    {
        name: "Begum Hazrat Mahal National Scholarship",
        provider: "Government",
        type: "Merit-based",
        scope: "National",
        country: "India",
        description: "Scholarship for girl students from minority communities studying in classes 9-12.",
        benefits: {
            amount: 12000,
            currency: "INR",
            type: "Annual",
            additionalBenefits: []
        },
        eligibilityCriteria: {
            minAge: 14,
            maxAge: 20,
            gender: ["Female"],
            category: ["All"],
            educationLevel: ["10th", "12th"],
            stream: ["All"],
            minPercentage: 50,
            minCGPA: 5.0,
            maxFamilyIncome: 200000,
            states: [],
            disabilities: false,
            sportsRequired: false,
            nationality: "Indian"
        },
        applicationDetails: {
            startDate: new Date("2026-08-01"),
            endDate: new Date("2026-10-31"),
            applicationLink: "https://scholarships.gov.in/",
            requiredDocuments: ["Minority Certificate", "Income Certificate", "Marksheet"]
        },
        tags: ["government", "minority", "girls", "school"],
        isActive: true
    },
    {
        name: "Swami Vivekananda Merit-cum-Means Scholarship",
        provider: "Government",
        type: "Mixed",
        scope: "State",
        country: "India",
        description: "Scholarship for meritorious students from economically weaker sections in West Bengal.",
        benefits: {
            amount: 60000,
            currency: "INR",
            type: "Annual",
            additionalBenefits: []
        },
        eligibilityCriteria: {
            minAge: 17,
            maxAge: 25,
            gender: ["All"],
            category: ["All"],
            educationLevel: ["Undergraduate", "Postgraduate"],
            stream: ["All"],
            minPercentage: 75,
            minCGPA: 7.5,
            maxFamilyIncome: 250000,
            states: ["West Bengal"],
            disabilities: false,
            sportsRequired: false,
            nationality: "Indian"
        },
        applicationDetails: {
            startDate: new Date("2026-08-01"),
            endDate: new Date("2026-10-31"),
            applicationLink: "https://svmcm.wbhed.gov.in/",
            requiredDocuments: ["Domicile Certificate", "Income Certificate", "Marksheet", "Admission Proof"]
        },
        tags: ["west-bengal", "state", "merit-cum-means", "vivekananda"],
        isActive: true
    },

    // Professional Course Scholarships
    {
        name: "AICTE Saksham Scholarship for Specially Abled Students",
        provider: "Government",
        type: "Disability",
        scope: "National",
        country: "India",
        description: "Scholarship for specially-abled students pursuing technical education.",
        benefits: {
            amount: 50000,
            currency: "INR",
            type: "Annual",
            additionalBenefits: ["Assistive devices", "Reader allowance"]
        },
        eligibilityCriteria: {
            minAge: 17,
            maxAge: 30,
            gender: ["All"],
            category: ["All"],
            educationLevel: ["Undergraduate", "Postgraduate", "Diploma"],
            stream: ["Engineering"],
            minPercentage: 50,
            minCGPA: 5.0,
            maxFamilyIncome: Infinity,
            states: [],
            disabilities: true,
            sportsRequired: false,
            nationality: "Indian"
        },
        applicationDetails: {
            startDate: new Date("2026-09-01"),
            endDate: new Date("2026-10-31"),
            applicationLink: "https://www.aicte-india.org/",
            requiredDocuments: ["Disability Certificate", "Marksheet", "Admission Letter"]
        },
        tags: ["aicte", "disability", "saksham", "engineering"],
        isActive: true
    },
    {
        name: "Dr. Ambedkar Central Sector Scheme of Interest Subsidy",
        provider: "Government",
        type: "Need-based",
        scope: "National",
        country: "India",
        description: "Interest subsidy on educational loans for students from economically weaker sections.",
        benefits: {
            amount: 100000,
            currency: "INR",
            type: "One-time",
            additionalBenefits: ["Interest subsidy on loan"]
        },
        eligibilityCriteria: {
            minAge: 17,
            maxAge: 35,
            gender: ["All"],
            category: ["All"],
            educationLevel: ["Undergraduate", "Postgraduate"],
            stream: ["All"],
            minPercentage: 50,
            minCGPA: 5.0,
            maxFamilyIncome: 450000,
            states: [],
            disabilities: false,
            sportsRequired: false,
            nationality: "Indian"
        },
        applicationDetails: {
            startDate: new Date("2026-07-01"),
            endDate: new Date("2026-12-31"),
            applicationLink: "https://www.vidyalakshmi.co.in/",
            requiredDocuments: ["Income Certificate", "Loan Sanction Letter", "Admission Proof"]
        },
        tags: ["ambedkar", "loan", "interest-subsidy", "government"],
        isActive: true
    },

    // More International Scholarships
    {
        name: "Erasmus Mundus Joint Master Degrees",
        provider: "International Organization",
        type: "Merit-based",
        scope: "International",
        country: "Europe",
        description: "Prestigious international study programmes jointly delivered by consortia of European higher education institutions.",
        benefits: {
            amount: 3000000,
            currency: "INR",
            type: "Annual",
            additionalBenefits: ["Tuition", "Living expenses", "Travel", "Insurance"]
        },
        eligibilityCriteria: {
            minAge: 21,
            maxAge: 35,
            gender: ["All"],
            category: ["All"],
            educationLevel: ["Postgraduate"],
            stream: ["All"],
            minPercentage: 70,
            minCGPA: 7.0,
            maxFamilyIncome: Infinity,
            states: [],
            disabilities: false,
            sportsRequired: false,
            nationality: "Indian"
        },
        applicationDetails: {
            startDate: new Date("2026-10-01"),
            endDate: new Date("2027-01-15"),
            applicationLink: "https://www.eacea.ec.europa.eu/scholarships/erasmus-mundus-catalogue_en",
            requiredDocuments: ["IELTS/TOEFL", "Marksheet", "Recommendation Letters", "Motivation Letter"]
        },
        tags: ["erasmus", "europe", "masters", "international"],
        isActive: true
    },
    {
        name: "Rhodes Scholarship",
        provider: "International Organization",
        type: "Merit-based",
        scope: "International",
        country: "UK",
        description: "World's most prestigious international scholarship programme for study at the University of Oxford.",
        benefits: {
            amount: 6000000,
            currency: "INR",
            type: "Annual",
            additionalBenefits: ["Tuition", "Living expenses", "Travel", "Health insurance"]
        },
        eligibilityCriteria: {
            minAge: 19,
            maxAge: 28,
            gender: ["All"],
            category: ["All"],
            educationLevel: ["Postgraduate"],
            stream: ["All"],
            minPercentage: 85,
            minCGPA: 8.5,
            maxFamilyIncome: Infinity,
            states: [],
            disabilities: false,
            sportsRequired: false,
            nationality: "Indian"
        },
        applicationDetails: {
            startDate: new Date("2026-06-01"),
            endDate: new Date("2026-09-30"),
            applicationLink: "https://www.rhodeshouse.ox.ac.uk/scholarships/the-rhodes-scholarship/",
            requiredDocuments: ["IELTS", "Essays", "Recommendation Letters", "Leadership Evidence"]
        },
        tags: ["rhodes", "oxford", "prestigious", "leadership"],
        isActive: true
    },
    {
        name: "Inlaks Shivdasani Foundation Scholarships",
        provider: "NGO",
        type: "Merit-based",
        scope: "International",
        country: "USA/UK",
        description: "Scholarship for Indian students to pursue postgraduate studies at top universities in USA and UK.",
        benefits: {
            amount: 5000000,
            currency: "INR",
            type: "Annual",
            additionalBenefits: ["Tuition", "Living expenses", "Travel"]
        },
        eligibilityCriteria: {
            minAge: 21,
            maxAge: 30,
            gender: ["All"],
            category: ["All"],
            educationLevel: ["Postgraduate"],
            stream: ["All"],
            minPercentage: 75,
            minCGPA: 7.5,
            maxFamilyIncome: Infinity,
            states: [],
            disabilities: false,
            sportsRequired: false,
            nationality: "Indian"
        },
        applicationDetails: {
            startDate: new Date("2026-01-01"),
            endDate: new Date("2026-03-31"),
            applicationLink: "https://www.inlaksfoundation.org/",
            requiredDocuments: ["GRE/GMAT", "IELTS/TOEFL", "Admission Letters", "Essays"]
        },
        tags: ["inlaks", "usa", "uk", "postgraduate"],
        isActive: true
    }
];

const seedScholarships = async () => {
    try {
        await connectDB();

        // Clear existing scholarships
        await Scholarship.deleteMany({});
        console.log('🗑️  Cleared existing scholarships');

        // Insert new scholarships
        const inserted = await Scholarship.insertMany(scholarships);
        console.log(`✅ Successfully seeded ${inserted.length} scholarships`);

        console.log('\n📊 Scholarship breakdown:');
        const stats = {
            government: scholarships.filter(s => s.provider === 'Government').length,
            private: scholarships.filter(s => s.provider === 'Private').length,
            university: scholarships.filter(s => s.provider === 'University').length,
            international: scholarships.filter(s => s.provider === 'International Organization').length,
            national: scholarships.filter(s => s.scope === 'National').length,
            state: scholarships.filter(s => s.scope === 'State').length,
            internationalScope: scholarships.filter(s => s.scope === 'International').length,
        };

        console.log(`   Government: ${stats.government}`);
        console.log(`   Private: ${stats.private}`);
        console.log(`   University: ${stats.university}`);
        console.log(`   International Org: ${stats.international}`);
        console.log(`\n   National Scope: ${stats.national}`);
        console.log(`   State Scope: ${stats.state}`);
        console.log(`   International Scope: ${stats.internationalScope}`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding scholarships:', error);
        process.exit(1);
    }
};

seedScholarships();
