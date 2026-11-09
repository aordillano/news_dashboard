import express from 'express';
import getTopHeadlines from '../controllers/news.controller.js'; 

const router = express.Router();

router.get('/headlines', getTopHeadlines);

router.post('/', (req, res) => {
  res.send('Got a POST request');
});

export default router;