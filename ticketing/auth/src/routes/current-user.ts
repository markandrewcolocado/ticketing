import express from 'express';
import jwt from 'jsonwebtoken';
import { BadRequestError } from '../errors/bad-request-error';

const router = express.Router();

router.get('/api/users/currentuser', (req, res) => {
  if (!req.session?.jwt) {
    return res.send({ currentUser: null });
  }

  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!); // will throw an error if jwt is invalid
    res.send({ currentUser: payload });
  } catch (err) {
    res.send({ currentUser: null });
  }
});

export { router as currentUserRouter };
