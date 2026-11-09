async function getTopHeadlines () {
    const url = "http://localhost:3000/headlines";
    try {
        const response = await fetch(url, {
            method: "GET"
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        
        const headlinerNews = document.querySelector(".headlinerNews");
        headlinerNews.innerHTML = result.map(article => (
            `<div class="article">
                <img src="${article.urlToImage}">
                <h1>${article.title}</h1>
                <h2>${article.description}</h2>
                <h3>By: ${article.author}</h3>
                <h3>${new Date(article.publishedAt).toLocaleString()}</h3>
                <p>${article.content}</p>
            </div>`
        )).join("");
    } catch (error) {
        console.log(error.message);
    }
}

getTopHeadlines()