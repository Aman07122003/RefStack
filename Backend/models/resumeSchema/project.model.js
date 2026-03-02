import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true,
            trim: true
        },
        techStack: [
            {
                type: String,
                trim: true
            }
        ],
        role: {
            type: String,
            trim: true,
            enum: [
                "Frontend Developer", "Backend Developer", "Full Stack Developer",
                "UI/UX Designer", "DevOps Engineer", "Team Lead", "Project Manager",
                "Mobile Developer", "Data Engineer", "ML Engineer", "Solo Developer"
            ]
        },
        projectType: {
            type: String,
            enum: ["Personal", "Academic", "Open Source", "Freelance", "Professional", "Internship"]
        },
        startDate: {
            type: Date
        },
        endDate: {
            type: Date
        },
        isOngoing: {
            type: Boolean,
            default: false
        },
        projectUrl: {
            type: String,
            trim: true
        },
        githubUrl: {
            type: String,
            trim: true
        },
        thumbnailUrl: {
            type: String,
            trim: true
        },
        highlights: [
            {
                type: String,
                trim: true
            }
        ]
    },
    { _id: false }
);

export default projectSchema;