import { Router } from 'express';

import contactsRouter from './contacts.js';
import authRouter from './auth.js';

const router = Router();
router.get('/', (req, res) => {
  res.json({
    status: 200,
    message: 'Welcome to the Home Page!',
  });
});
router.use('/contacts', contactsRouter);
router.use('/auth', authRouter);
export default router;
