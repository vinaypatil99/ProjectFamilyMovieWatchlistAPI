export function authorizeModification(req, res, next) {
  const { id, role } = req.user;
  const userId = req.params.userId;

  // Parents can modify any watchlist
  if (role === "parent") {
    return next();
  }

  // Children can modify only their own watchlist
  if (role === "child" && String(id) === String(userId)) {
    return next();
  }

  // Deny access to everyone else
  return res.status(403).json({
    error: "Access denied",
  });
}