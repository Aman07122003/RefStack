import AISettings from "../models/aiModels/aiSettings.model.js"
import Profile from "../models/profile.model.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import { APIError } from "../utils/APIError.js";
import { APIResponse } from "../utils/APIResponse.js";
import Application from "../models/application.model.js";
import { buildResumeText } from "../utils/buildResumeText.js"
import OpenAI from "openai";
import Anthropic from "@anthropic-ai/sdk";

export const saveAICrendentials = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const { provider, apiKey, preferredModel } = req.body;

    if(!provider) {
        throw new APIError(400, "Provider is required");
    }

    if(!apiKey) {
        throw new APIError(400, "API key is required");
    }

    let settings = await AISettings.findOne({ user: userId });

    if(settings) {
        settings.provider = provider;
        settings.encryptedApiKey = apiKey;
        settings.preferredModel = preferredModel;
    } else {
        settings = await AISettings.create({ 
            user: userId,
            provider,
            encryptedApiKey: apiKey,
            preferredModel,
        })
    }

    return res.status(200).json(
        new APIResponse(
          200,
          {
            provider: settings.provider,
            preferredModel: settings.preferredModel,
            isActive: settings.isActive,
          },
          "AI credentials saved successfully"
        )
      );
    
});

export const deleteAICrendentials = asyncHandler( async (req, res) => {
    try {
        const userId = req.user._id;

        let settings = await AISettings.findOne({ user: userId });

        if(!settings) {
            throw new APIError(400, "AI crediantials not found");
        }   

        await AISettings.deleteOne({ user: userId });

        return res.status(201).json(
            new APIResponse(201, null, "crediantials deleted successfully")
        )
    } catch (error) {
        return res.status(500).json(
            new APIError(500, "Failed to delete AI crendentials")
        );
    }
});

export const testAICredentials = asyncHandler(async (req, res) => {
    const { provider, apiKey } = req.body;
  
    if (!provider) {
      throw new APIError(400, "Provider is required");
    }
  
    if (!apiKey) {
      throw new APIError(400, "API key is required");
    }
  
    try {
      if (provider === "openai") {
        const client = new OpenAI({ apiKey });
  
        await client.models.list();
  
      } else if (provider === "claude") {
        const anthropic = new Anthropic({ apiKey });
  
        await anthropic.messages.create({
          model: "claude-3-haiku-20240307",
          max_tokens: 5,
          messages: [
            { role: "user", content: "Hello" }
          ]
        });
  
      } else {
        throw new APIError(400, "Invalid provider");
      }
  
      return res.status(200).json(
        new APIResponse(
          200,
          null,
          "API key is valid"
        )
      );
  
    } catch (error) {
      throw new APIError(401, "Invalid or expired API key");
    }
});

export const generateCoverLetter = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { applicationId } = req.params;
  
    const application = await Application.findOne({
      _id: applicationId,
      user: userId,
    });
  
    if (!application) {
      throw new APIError(404, "Application not found");
    }
  
    const profile = await Profile.findOne({ user: userId });

    if (!profile) {
    throw new APIError(404, "Profile not found. Please complete your profile first.");
    }

    const resumeText = buildResumeText(profile);

  
    const settings = await AISettings.findOne({ user: userId }).select("+encryptedApiKey");
  
    if (!settings) {
      throw new APIError(404, "AI credentials not found");
    }
  
    if (!settings.isActive) {
      throw new APIError(403, "AI integration is disabled");
    }
  
    const apiKey = settings.getDecryptedApiKey();
  
    const prompt = `
        Write a professional and personalized cover letter using the following resume:

        Resume:
        ${resumeText}

        Job Details:
        Company: ${application.company}
        Role: ${application.roleTitle}
        Location: ${application.location || "Not specified"}
        Job Type: ${application.jobType || "Not specified"}
        Work Mode: ${application.workMode || "Not specified"}

        HR Details:
        Name: ${application.hr?.name || "Hiring Manager"}

        Additional Notes:
        ${application.notes || "N/A"}

        The cover letter should:
        - Be professional
        - Highlight relevant skills
        - Show enthusiasm
        - Be tailored to the company and role
        - Not exceed 400 words
    `;
  
    let aiResponse;
  
    try {
      if (settings.provider === "openai") {
        const client = new OpenAI({ apiKey });
  
        const response = await client.chat.completions.create({
          model: settings.preferredModel || "gpt-4o-mini",
          messages: [
            { role: "system", content: "You are a professional career assistant." },
            { role: "user", content: prompt }
          ],
        });
  
        aiResponse = response.choices[0].message.content;
      }
  
      else if (settings.provider === "claude") {
        const anthropic = new Anthropic({ apiKey });
  
        const response = await anthropic.messages.create({
          model: settings.preferredModel || "claude-3-haiku-20240307",
          max_tokens: 1200,
          messages: [
            { role: "user", content: prompt }
          ],
        });
  
        aiResponse = response.content[0].text;
      }
  
      else {
        throw new APIError(400, "Invalid AI provider");
      }
  
    } catch (error) {
      throw new APIError(500, "Failed to generate cover letter");
    }
  
    return res.status(200).json(
      new APIResponse(
        200,
        {
          coverLetter: aiResponse,
          applicationId: application._id
        },
        "Cover letter generated successfully"
      )
    );
});

export const testAIGeneration = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  // 🔍 Get saved AI settings
  const settings = await AISettings.findOne({ user: userId }).select("+encryptedApiKey");

  if (!settings) {
    throw new APIError(404, "AI credentials not found");
  }

  if (!settings.isActive) {
    throw new APIError(403, "AI integration is disabled");
  }

  const apiKey = settings.getDecryptedApiKey();

  // ✅ Static test prompt
  const prompt = `
    Write a short motivational message for a software developer 
    who is learning backend development with Node.js.
    Keep it under 100 words.
  `;

  let aiResponse;

  try {
    if (settings.provider === "openai") {
      const client = new OpenAI({ apiKey });

      const response = await client.chat.completions.create({
        model: settings.preferredModel || "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are an inspiring mentor." },
          { role: "user", content: prompt }
        ],
      });

      console.log("FULL OPENAI RESPONSE:", response);

      aiResponse = response.choices[0].message.content;
    }

    else if (settings.provider === "claude") {
      const anthropic = new Anthropic({ apiKey });

      const response = await anthropic.messages.create({
        model: settings.preferredModel || "claude-3-haiku-20240307",
        max_tokens: 300,
        messages: [
          { role: "user", content: prompt }
        ],
      });

      console.log("FULL CLAUDE RESPONSE:", response);

      aiResponse = response.content[0].text;
    }

    else {
      throw new APIError(400, "Invalid AI provider");
    }

  } catch (error) {
    console.error("AI ERROR:", error);
    throw new APIError(500, "AI generation failed");
  }

  return res.status(200).json(
    new APIResponse(
      200,
      {
        response: aiResponse
      },
      "AI response generated successfully"
    )
  );
});