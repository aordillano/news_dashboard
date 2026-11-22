// Relative time formatter
const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

// Sidebar
const hamburgerBtn = document.getElementById('hamburger');
const closeMenuBtn = document.getElementById('close-menu');
const sidebar = document.querySelector('.sidebar');

// Sort (new, best, top)
const sortDiv = document.querySelector('.sort-buttons');

// Stories container
const storiesContainer = document.querySelector(".stories");

function getDomain(story) {
    return new URL(story.url ? story.url : "https://news.ycombinator.com").hostname;
}

function getTimeAgo(unixSeconds) {
    const seconds = Math.floor((Date.now() / 1000) - unixSeconds);
    if (seconds >= 86400) {
        const days = Math.floor(seconds / 86400);
        return rtf.format(-days, 'day');
    } else if (seconds >= 3600) {
        const hours = Math.floor(seconds / 3600);
        return rtf.format(-hours, 'hour');
    } else if (seconds >= 60) {
        const minutes = Math.floor(seconds / 60);
        return rtf.format(-minutes, 'minute');
    } else {
        return rtf.format(-seconds, 'second')
    }
}

function renderStories(fetchedStories) {
    storiesContainer.innerHTML = fetchedStories.map((story) => {
        const domain = getDomain(story);
        const timeAgo = getTimeAgo(story.time);
        
        return `<div class="story">
            <ul class="score">
                <li><i class="fa-solid fa-arrow-up"></i></li>
                <li>${story.score}</li>
            </ul>
            <div class="story-body">
                <a href="${story.url ?? `https://news.ycombinator.com/item?id=${story.id}`}"><h2>${story.title}</h2></a>
                <ul class="meta">
                    <li class="source">
                        <img src="https://www.google.com/s2/favicons?domain=${domain}&sz=32" width="16" height="16" alt="" loading="lazy">
                        ${domain}
                    </li>
                    <li>By: ${story.by}</li>
                    <li>${timeAgo}</li>
                    <li>${story.descendants ?? 0} comments</li>
                </ul>
            </div>
        </div>`
    }).join("");
}

async function getStories (feed = 'top') {
    const url = `http://localhost:3000?feed=${feed}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();

        renderStories(result);
    } catch (error) {
        console.log(error.message);
    }
};

function openMenu() {
    sidebar.classList.add('open');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    closeMenuBtn.focus();
};

function closeMenu() {
    sidebar.classList.remove('open');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    hamburgerBtn.focus();
};

sortDiv.addEventListener('click', (event) => {
    const button = event.target.closest('button');
    if (button) {
        const buttons = sortDiv.querySelectorAll('button');
        buttons.forEach(btn => {
            btn.classList.remove('active');
        })
        getStories(button.id);
        button.classList.add('active');
    }
})

hamburgerBtn.addEventListener('click', openMenu);
closeMenuBtn.addEventListener('click', closeMenu);

getStories()
