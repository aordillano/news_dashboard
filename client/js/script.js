async function getTopStories () {
    const url = "http://localhost:3000/";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        
        const topStories = document.querySelector(".top-stories");
        topStories.innerHTML = result.map(story => (
            `<div class="story">
                <h2>${story.title}</h2>
                <ul class="story-details">
                    <li><a href="${story.url}">Read here</a></li>
                    <li><p>By: ${story.by}</p></li>
                    <li><p>${story.score} points</p></li>
                </ul>
                <br/>
            </div>`
        )).join("");
        console.log(result);
    } catch (error) {
        console.log(error.message);
    }
}

getTopStories()