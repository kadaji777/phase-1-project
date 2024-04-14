document.addEventListener("DOMContentLoaded", async function() {
    const memeContainer = document.getElementById("memeContainer");
    //const searchInput = document.getElementById("searchInput");
    let memes = await fetchMemes();
    renderMemes(memes);
    // searchInput.addEventListener("input", function() {
    // const searchTerm = searchInput.value.toLowerCase();
    // const filteredMemes = memes.filter(meme => meme.title.toLowerCase().includes(searchTerm));
    // renderMemes(filteredMemes);
    // });
    memeContainer.addEventListener("click", function(event) {
    if (event.target.classList.contains("upvote")) {
    const memeId = event.target.dataset.id;
    upvoteMeme(memeId);
    } else if (event.target.classList.contains("like")) {
    const memeId = event.target.dataset.id;
    likeMeme(memeId);
    } else if (event.target.classList.contains("add-comment")) {
    const memeId = event.target.dataset.id;
    const commentInput = document.getElementById(`comment-${memeId}`);
    const comment = commentInput.value.trim();
    if (comment !== "") {
    addComment(memeId, comment);
    commentInput.value = "";
    }
    }
    });
    function fetchMemes() {
    return fetch("db.json")
    .then(response => response.json())
    .then(data => data.memes);
    }
    function renderMemes(memes) {
    memeContainer.innerHTML = "";
    memes.forEach(meme => {
    const memeElement = document.createElement("div");
    memeElement.classList.add("meme");
    memeElement.innerHTML = `
    <h3>${meme.title}</h3>
    <img src="${meme.image}" alt="${meme.title}">
    <p>${meme.description}</p>
    <button class="upvote" data-id="${meme.id}">Upvote</button>
    <button class="like" data-id="${meme.id}">Like</button>
    <input type="text" id="comment-${meme.id}" placeholder="Add a comment...">
    <button class="add-comment" data-id="${meme.id}">Add Comment</button>
    <div class="comments" id="comments-${meme.id}"></div>
    `;
    memeContainer.appendChild(memeElement);
    });
    }
    function upvoteMeme(memeId) {
    // Implement upvoting logic
    console.log(`Upvoted meme with ID: ${memeId}`);
    }
    function likeMeme(memeId) {
    // Implement liking logic
    console.log(`Liked meme with ID: ${memeId}`);
    }
    function addComment(memeId, comment) {
    const commentList = document.getElementById(`comments-${memeId}`);
    const newComment = document.createElement("p");
    newComment.textContent = comment;
    commentList.appendChild(newComment);
    }
    });