import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.status(401).send('Token is required'); // No token provided
    }

    console.log("Token received:", token);  // Log the token

    jwt.verify(token, process.env.SECRET_JWT, (err, decoded) => {   // Changed from ACCESS_TOKEN_SECRET to SECRET_JWT
        if (err) {
            console.log("Token verification failed:", err);  // Log error
            return res.sendStatus(403);  // Token verification failed
        }

        console.log("Decoded token:", decoded);  // Log decoded token

        req.email = decoded.email;
        next();
    });
};