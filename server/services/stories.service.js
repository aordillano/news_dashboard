async function fetchItem(id) {
    try {
        const url = `https://hacker-news.firebaseio.com/v0/item/${id}.json`;
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Response status: ${res.status}`);
        }
        const item = await res.json();
        return item;
    } catch (error) {
        throw new Error(error.message);
    };
}

function fetchStoryDetails (storyIds) {
    const fetchedStories = storyIds.map(async (storyId) => {
        return fetchItem(storyId);
    })
    return fetchedStories;
}

export async function fetchStories (feed) {
    const url = `https://hacker-news.firebaseio.com/v0/${feed}stories.json`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();

        const startIndex = 0;
        const endIndex = 30;

        const slicedStories = result.slice(startIndex, endIndex);

        const topStories = await Promise.all(fetchStoryDetails(slicedStories))

        const filteredStories = topStories.filter(story => 
            story && !(story.deleted) && !(story.dead)
        )
        
        return filteredStories;
    } catch (error) {
        throw new Error(error.message);
    }
}

