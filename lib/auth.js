import jwt from "jsonwebtoken";

export function getUserFromReq(req) {
  const cookie = req.headers.cookie || "";
  const match = cookie.match(/token=([^;]+)/);
  if (!match) return null;
  try {
    return jwt.verify(match[1], process.env.JWT_SECRET);
  } catch {
    return null;
  }
}