import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        issuingOrganization: {
            type: String,
            required: true,
            trim: true,
            enum: [
                "Google", "Microsoft", "Amazon Web Services (AWS)", "Meta", "IBM",
                "Oracle", "Cisco", "CompTIA", "Coursera", "Udemy", "edX",
                "LinkedIn Learning", "HackerRank", "freeCodeCamp", "Pluralsight",
                "Scrum Alliance", "PMI", "Salesforce", "Adobe", "Nvidia",
                "MongoDB University", "HashiCorp", "Red Hat", "Kubernetes (CNCF)",
                "Databricks", "Tableau", "Hugging Face", "OpenAI", "Other"
            ]
        },
        credentialId: {
            type: String,
            trim: true
        },
        credentialUrl: {
            type: String,
            trim: true
        },
        issueDate: {
            type: Date,
            required: true
        },
        expiryDate: {
            type: Date
        },
        doesNotExpire: {
            type: Boolean,
            default: false
        },
        category: {
            type: String,
            enum: [
                "Cloud Computing", "Cybersecurity", "Data Science", "Machine Learning",
                "Web Development", "Mobile Development", "DevOps", "Database",
                "Project Management", "Networking", "UI/UX Design", "Blockchain",
                "Artificial Intelligence", "Software Testing", "Agile & Scrum", "Other"
            ]
        },
        level: {
            type: String,
            enum: ["Beginner", "Intermediate", "Advanced", "Professional", "Expert"]
        },
        thumbnailUrl: {
            type: String,
            trim: true
        }
    },
    { _id: false }
);

export default certificateSchema;