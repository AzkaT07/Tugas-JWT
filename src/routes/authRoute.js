import express from 'express';
import { login, register } from '../controllers/authController.js';
import { verifyToken } from '../middleware/jwtMiddleware.js';

const router = express.Router();

router.post('/login', login);   // For logging in and obtaining a token
router.post('/register', register);   // For user registration
router.post('/token', (req, res) => {
    console.log('POST /auth/token route hit');  // Check if the route is being hit
    verifyToken(req, res, () => {
      console.log('Token verified');
      res.status(200).send('Token verified');
    });
  });

export default router;