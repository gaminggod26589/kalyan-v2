import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Extracts and verifies the JWT token from the Request headers.
 * Returns the decoded payload (user info) if valid, or null if invalid/missing.
 */
export function verifyAuth(req) {
    try {
        // 1. Check for Authorization header (Bearer token)
        const authHeader = req.headers.get("authorization");
        if (authHeader && authHeader.startsWith("Bearer ")) {
            const token = authHeader.split(" ")[1];
            const decoded = jwt.verify(token, JWT_SECRET);
            return decoded;
        }
        return null;
    } catch (err) {
        return null; // Invalid token or expired
    }
}

/**
 * Checks if the request is from an Owner role.
 */
export function isOwner(decodedToken) {
    return decodedToken && decodedToken.role === "owner";
}
