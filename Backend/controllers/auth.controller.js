import { asyncHandler } from "../utils/asyncHandler.js";
import { APIError } from "../utils/APIError.js";
import { User } from "../models/user.model.js";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { 
    uploadImage,
} from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";
import { APIResponse } from "../utils/APIResponse.js";
import { OAuth2Client } from "google-auth-library";
import { generateJWT } from "../utils/jwt.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


export const googleLogin = asyncHandler(async (req, res) => {
  console.log("HEADERS:", req.headers);
  console.log("BODY:", req.body);

  const idToken = req.body?.idToken;

  if (!idToken) {
    throw new APIError(400, "No Google token provided");
  }

  // Verify token with Google
  const ticket = await client.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();

  const { email, name: fullName, picture, sub } = payload;

  // Find existing user
  let user = await User.findOne({ email });

  if (!user) {
    user = await User.create({
      fullName,
      email,
      username: email.split("@")[0],
      avatar: picture,
      googleId: sub,
      password: sub,
    });
  }

  const token = generateJWT(user._id);

  res.status(200).json(
    new APIResponse(200, { user, token }, "Google login successful")
  );
});

export const registerUser = asyncHandler(async (req, res) => {

  let { username, password, fullName, email } = req.body;
  if (
    [username, password, fullName, email].some((field) => field?.trim() === "")
  ) {
    throw new APIError(400, `all fields are required!!!`);
  }
  const userExist = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (userExist) {
    return res
      .status(400)
      .json(new APIResponse(400, [], "User Already Exists..."));
  };

  const avatarLocalPath = req.file?.path;

    if (!avatarLocalPath) {
    throw new APIError(400, "avatar Image is Required");
    }

  let avatarRes = await uploadImage(avatarLocalPath);
  if (!avatarRes)
    throw new APIError(500, "Internal Server Error!!! Files Unable to Upload");

  const createdUser = await User.create({
    username: username.toLowerCase(),
    password,
    email,
    fullName,
    avatarUrl: avatarRes.url,
  });

  const userData = await User.findById(createdUser._id).select(
    "-password -refreshToken"
  );

  if (!userData) {
    throw new APIError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new APIResponse(200, userData, "Account Created Successfully"));
});

export const loginUser = asyncHandler(async (req, res) => {
    let { email, password, username } = req.body;
    console.log("🚀 ~ file: auth.controller.js:60 ~ loginUser ~ req.body:", req.body)
  
    if ((!email && !username) || !password) {
      throw new APIError(400, "Username or Email and Password are required");
    }

    if (email) email = email.toLowerCase();
    if(username) username = username.toLowerCase();
    const user = await User.findOne({ $or: [{ email }, { username }] });
    console.log("🚀 ~ file: auth.controller.js:63 ~ loginUser ~ user:", user)
    if (!user) {
      return res.status(404).json(new APIResponse(404, [], "User not Found"));
    }
  
    const isCredentialValid = await user.isPasswordCorrect(password);
    if (!isCredentialValid) {
      return res.status(401).json(new APIResponse(401, [], "Invalid Credentials"));
    }
  
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);
  
    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );
  
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
        maxAge: 15 * 60 * 1000
    });

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });
  
    return res.status(200).json(
      new APIResponse(200, { user: loggedInUser }, "Logged In Successfully")
    );
});
  
export const generateAccessAndRefreshToken = async (_id) => {
try {
    const user = await User.findById(_id);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
} catch (error) {
    throw new APIError(500, "Something went wrong while generating tokens");
}
};

export const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
      req.user?._id,
      {
        $unset: {
          refreshToken: 1,
        },
      },
      {
        new: true,
      }
    );
  
    const cookieOptions = {
      httpOnly: true,
      secure: false,
      sameSite: "None",
    };

    res.clearCookie('accessToken', cookieOptions);
    res.clearCookie('refreshToken', cookieOptions);
  
    return res
      .status(200)
      .json(new APIResponse(200, {}, "Logged out Successfully"));
});

export const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken =
      req.cookies.refreshToken || req.body.refreshToken;
  
    if (!incomingRefreshToken) {
      throw new APIError(401, "unauthorized request");
    }
  
    try {
      const decodedRefreshToken = jwt.verify(
        incomingRefreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
  
      const user = await User.findById(decodedRefreshToken?._id);
  
      if (!user) {
        throw new APIError(401, "Invalid Refresh Token");
      }
  
      if (incomingRefreshToken !== user.refreshToken) {
        throw new APIError(401, "Refresh token is expired or used");
      }
  
      const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
        user._id
      );
  
      const cookieOptions = {
        httpOnly: true,
        secure: true,
        sameSite: "None",
      };

        res.cookie("accessToken", accessToken, {
            ...cookieOptions,
            maxAge: 15 * 60 * 1000, // 15 minutes
        });

        res.cookie("refreshToken", refreshToken, {
            ...cookieOptions,
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
  
      return res
        .status(200)
        .json(
          new APIResponse(
            200,
            {},
            "Access Token Granted Successfully"
          )
        );
    } catch (error) {
      throw new APIError(401, error?.message || "Invalid refresh token");
    }
});

export const sendEmail = async (option) => {
  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: option.to,
    subject: option.subject,
    html: option.html,
  };

  await transport.sendMail(mailOptions);
}

export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email: email.toLowerCase() });
  if(!user) throw new APIError(404, "User not found with this email");
  const resetToken = crypto.randomBytes(32).toString("hex");

  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  
  user.passwordResetToken = hashedToken;
  user.passwordResetTokenExpiry = Date.now() + 15 * 60 * 1000;
  
  await user.save();

  const resetURL = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

  const message = `
  <h2>Password Reset Request</h2>
  <p> Click the link bellow to reset your password: </p>
  <a href="${resetURL}">${resetURL}</a>
  <p> This link will expire in 15 minutes. If you did not request a password reset, please ignore this email. </p>
`;
  
    try {
      await sendEmail({
        to: user.email,
        subject: "Password Reset Request",
        html: message,
      });
  
      return res.status(200).json(new APIResponse(200, { resetToken }, "Password reset email sent successfully"));
    } catch (error) {
      console.error("EMAIL ERROR:", error);
    
      user.passwordResetToken = undefined;
      user.passwordResetTokenExpiry = undefined;
      await user.save();
    
      throw new APIError(
        500,
        "Failed to send password reset email. Please try again later."
      );
    }
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    throw new APIError(400, "Token and new password are required");
  }

  // 🔐 Hash incoming token
  const hashedToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

    

  // 🔍 Find user with valid token + not expired
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetTokenExpiry: { $gt: Date.now() },
  });

  console.log("Incoming token:", token);
console.log("Hashed incoming token:", hashedToken);

const debugUser = await User.findOne({ passwordResetToken: hashedToken });
console.log("User found by token only:", debugUser);

  if (!user) {
    throw new APIError(400, "Invalid or expired token");
  }

  // ✅ Update password
  user.password = newPassword; // assuming pre-save hook hashes it

  // 🧹 Clear reset fields
  user.passwordResetToken = undefined;
  user.passwordResetTokenExpiry = undefined;

  await user.save();

  res.status(200).json(
    new APIResponse(200, {}, "Password reset successfully")
  );
});