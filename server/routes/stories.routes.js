import express from 'express';
import { getStories } from '../controllers/stories.controller.js'; 

const router = express.Router();

router.get('/', getStories);

router.post('/', (req, res) => {
  res.send('Got a POST request');
});

export default router;