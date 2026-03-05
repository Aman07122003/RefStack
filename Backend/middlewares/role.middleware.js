import { APIError } from "../utils/APIError.js";

export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        throw new APIError(403, "Access Denied");
      }
      next();
    };
  };