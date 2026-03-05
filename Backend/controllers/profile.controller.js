import Profile from "../models/profile.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { APIError } from "../utils/APIError.js";
import { APIResponse } from "../utils/APIResponse.js";

export const createOrUpdateProfile = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;

  const {
    phone,
    dob,
    address,
    nationality,
    bio,
    socialMedia,
    skills,
    education,
    projects,
    certifications
  } = req.body;

  let profile = await Profile.findOne({ user: userId });

  if (profile) {
    profile.phone = phone ?? profile.phone;
    profile.dob = dob ?? profile.dob;
    profile.address = address ?? profile.address;
    profile.nationality = nationality ?? profile.nationality;
    profile.bio = bio ?? profile.bio;

    if (socialMedia) profile.socialMedia = socialMedia;
    if (skills) profile.skills = skills;
    if (education) profile.education = education;
    if (projects) profile.projects = projects;
    if (certifications) profile.certifications = certifications;

    await profile.save();

    return res.status(200).json(
      new APIResponse(
        200,
        profile,
        "Profile updated successfully"
      )
    );
  }

  profile = await Profile.create({
    user: userId,
    phone,
    dob,
    address,
    nationality,
    bio,
    socialMedia,
    skills,
    education,
    projects,
    certifications
  });

  return res.status(201).json(
    new APIResponse( 201, profile, "Profile created successfully" )
  );
  } catch (error) {
    return res.status(500).json(
        new APIError(
            500,
            null,
            "Failed to create a profile",
        )
    )
  }
});

export const getMyProfile = asyncHandler(async (req, res) => {
    const userId = req.user._id;
  
    const profile = await Profile.findOne({ user: userId });
  
    if (!profile) {
      throw new APIError(404, "Profile not found");
    }
  
    return res.status(200).json(
      new APIResponse(
        200,
        profile,
        "Profile fetched successfully"
      )
    );
});

export const deleteProfile = asyncHandler(async (req, res) => {
    const userId = req.user._id;
  
    const profile = await Profile.findOneAndDelete({ user: userId });
  
    if (!profile) {
      throw new APIError(404, "Profile not found");
    }
  
    return res.status(200).json(
      new APIResponse(
        200,
        null,
        "Profile deleted successfully"
      )
    );
});

export const getProfileByUserId = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const profile = await Profile
    .findOne({ user: userId })
    .populate("user", "name email");

  if (!profile) {
    throw new APIError(404, "Profile not found");
  }

  return res.status(200).json(
    new APIResponse(
      200,
      profile,
      "Profile fetched successfully"
    )
  );
});
  
export const updateBasicInfo = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { phone, dob, address, nationality, bio } = req.body;

  const profile = await Profile.findOne({ user: userId });

  if (!profile) {
    throw new APIError(404, "Profile not found");
  }

  profile.phone = phone ?? profile.phone;
  profile.dob = dob ?? profile.dob;
  profile.address = address ?? profile.address;
  profile.nationality = nationality ?? profile.nationality;
  profile.bio = bio ?? profile.bio;

  await profile.save();

  return res.status(200).json(
    new APIResponse(
      200,
      profile,
      "Basic info updated successfully"
    )
  );
});
  
  export const updateSocialMedia = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { socialMedia } = req.body;
  
    if (!socialMedia) {
      throw new APIError(400, "socialMedia field is required");
    }
  
    const profile = await Profile.findOne({ user: userId });
  
    if (!profile) {
      throw new APIError(404, "Profile not found");
    }
  
    profile.socialMedia = socialMedia;
  
    await profile.save();
  
    return res.status(200).json(
      new APIResponse(
        200,
        profile.socialMedia,
        "Social media updated successfully"
      )
    );
  });
  
  export const updateSkills = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { skills } = req.body;
  
    if (!skills) {
      throw new APIError(400, "skills field is required");
    }
  
    const profile = await Profile.findOne({ user: userId });
  
    if (!profile) {
      throw new APIError(404, "Profile not found");
    }
  
    profile.skills = skills;
  
    await profile.save();
  
    return res.status(200).json(
      new APIResponse(
        200,
        profile.skills,
        "Skills updated successfully"
      )
    );
  });
  
  export const addEducation = asyncHandler(async (req, res) => {
    const profile = await Profile.findOneAndUpdate(
      { user: req.user._id },
      { $push: { education: req.body } },
      { new: true, runValidators: true }
    );
    if (!profile) throw new APIError(404, "Profile not found");
  
    return res.status(201).json(new APIResponse(201, profile.education, "Education added successfully"));
  });
  
  export const updateEducation = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { education } = req.body;
  
    if (!education) {
      throw new APIError(400, "education field is required");
    }
  
    const profile = await Profile.findOne({ user: userId });
  
    if (!profile) {
      throw new APIError(404, "Profile not found");
    }
  
    profile.education = education;
  
    await profile.save();
  
    return res.status(200).json(
      new APIResponse(
        200,
        profile.education,
        "Education updated successfully"
      )
    );
  });
  
  export const addProject = asyncHandler(async (req, res) => {
    const userId = req.user._id;
  
    const profile = await Profile.findOne({ user: userId });
  
    if (!profile) {
      throw new APIError(404, "Profile not found");
    }
  
    profile.projects.push(req.body);
  
    await profile.save();
  
    return res.status(201).json(
      new APIResponse(
        201,
        profile.projects,
        "Project added successfully"
      )
    );
  });
  
  export const updateProjects = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { projects } = req.body;
  
    if (!projects) {
      throw new APIError(400, "projects field is required");
    }
  
    const profile = await Profile.findOne({ user: userId });
  
    if (!profile) {
      throw new APIError(404, "Profile not found");
    }
  
    profile.projects = projects;
  
    await profile.save();
  
    return res.status(200).json(
      new APIResponse(
        200,
        profile.projects,
        "Projects updated successfully"
      )
    );
  });
  
  export const addCertification = asyncHandler(async (req, res) => {
    const userId = req.user._id;
  
    const profile = await Profile.findOne({ user: userId });
  
    if (!profile) {
      throw new APIError(404, "Profile not found");
    }
  
    profile.certifications.push(req.body);
  
    await profile.save();
  
    return res.status(201).json(
      new APIResponse(
        201,
        profile.certifications,
        "Certification added successfully"
      )
    );
  });
  
  export const updateCertifications = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { certifications } = req.body;
  
    if (!certifications) {
      throw new APIError(400, "certifications field is required");
    }
  
    const profile = await Profile.findOne({ user: userId });
  
    if (!profile) {
      throw new APIError(404, "Profile not found");
    }
  
    profile.certifications = certifications;
  
    await profile.save();
  
    return res.status(200).json(
      new APIResponse(
        200,
        profile.certifications,
        "Certifications updated successfully"
      )
    );
  });