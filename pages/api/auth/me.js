import { getUserFromReq } from "@/lib/auth";

export default function handler(req, res) {
  const user = getUserFromReq(req);
  if (!user) return res.status(401).json({ error: "Unauthorized" });
  res.status(200).json({ user });
}