const getTopHeadlines = async (req, res, next) => {
    var newsApiKey = process.env.NEWS_API_KEY;
    const url = "https://newsapi.org/v2/top-headlines?country=us";
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": newsApiKey
            }
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        const filteredResult = result.articles.filter(article => 
            article.urlToImage && article.description && article.author
        )
        res.json(filteredResult);
    } catch (error) {
        res.status(500).json(error.message);
    }
}

export default getTopHeadlines;