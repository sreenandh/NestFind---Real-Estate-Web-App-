import jwt from "jsonwebtoken";

export const verifyAdmin = (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({ message: "Not Authenticated!" });

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, payload) => {
    if (err || !payload.isAdmin) {
      return res.status(403).json({ message: "Not Authorized!" });
    }
    req.userId = payload.id;
    next();
  });
};
