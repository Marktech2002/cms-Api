import express from 'express';
import passport from 'passport';
const router = express.Router();

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['email', 'profile'],
  })
);

router.get(
  '/google/callback',
  passport.authenticate('google', {}),
  (req, res) => {
      const { email, googleId } = req.user as { email: string; googleId: string };
      res.status(200).json({ email, googleId })
  }
);

export default router;
