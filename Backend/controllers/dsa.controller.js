import { asyncHandler } from "../utils/asyncHandler.js";
import { APIError } from "../utils/APIError.js";
import { APIResponse } from "../utils/APIResponse.js";
import dsaData from "../Data/Graph/dsa.data.js";

const getDSAContent = async (req, res) => {
    try {
        const data = dsaData; // The dataset provided
        const { Section, Subsection, Topic } = req.body;

        // Validate input
        if (!Section && !Subsection && !Topic) {
            return res.status(400).json(new APIError(400, "At least one of Section, Subsection, or Topic is required"));
        }

        // Check if Section matches
        if (Section && data.Section.toLowerCase() !== Section.toLowerCase()) {
            return res.status(404).json(new APIError(404, "Section not found"));
        }

        // Find the subsection
        let subsectionData = null;
        if (Subsection) {
            subsectionData = data.content.find(sub => sub.Subsection.toLowerCase() === Subsection.toLowerCase());
        } else {
            subsectionData = data.content[0]; // Default to first subsection if none provided
        }

        if (!subsectionData) {
            return res.status(404).json(new APIError(404, "Subsection not found"));
        }

        // Find the topic
        let topicData = null;
        if (Topic) {
            topicData = subsectionData.content.find(topic => topic.Topic.toLowerCase() === Topic.toLowerCase());
        } else {
            topicData = subsectionData.content[0]; // Default to first topic if none provided
        }

        if (!topicData) {
            return res.status(404).json(new APIError(404, "Topic not found in the specified subsection"));
        }

        // Return the found topic content
        return res.status(200).json(
            new APIResponse(200, topicData, "Topic content fetched successfully")
        );

    } catch (error) {
        return res.status(500).json(
            new APIError(500, "Failed to fetch topic content", error.message)
        );
    }
};



export { getDSAContent };
