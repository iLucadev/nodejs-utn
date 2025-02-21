import sanitizeHtml from "sanitize-html";
import validator from "validator";

export const bodySanitizer = (req, res, next) => {
  // Sanitize all body fields
  Object.keys(req.body).forEach((key) => {
    if (typeof req.body[key] === "string") {
      req.body[key] = sanitizeHtml(req.body[key], {
        allowedTags: [], // Delete all HTML
        allowedAttributes: {},
      });

      // Sanitize emails
      if (key === "email") {
        req.body[key] = validator.normalizeEmail(req.body[key]);
      }
    }
  });
  next();
};
