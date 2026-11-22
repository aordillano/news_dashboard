import { fetchStories } from "../services/stories.service.js";
import config from "../config/stories.config.js";

export async function getStories (req, res) {
    try {
        const feed = req.query.feed ?? "top";
        if (!(config.controllers.allowedFeed.includes(feed))) {
            res.status(400).json();
            return;
        }
        const topStories = await fetchStories(feed);
        res.json(topStories);
    } catch (error) {
        res.status(500).json(error.message);
    }
}