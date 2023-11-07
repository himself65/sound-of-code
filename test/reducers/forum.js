function submitPost() {
    const postArea = document.getElementById('userPost');
    const postText = postArea.value;

    if (postText) {
        const postsDiv = document.getElementById('posts');
        const newPost = document.createElement('div');
        newPost.className = "post";
        newPost.innerText = postText;
        postsDiv.appendChild(newPost);

        // Clear the post area for next time
        postArea.value = "";
    } else {
        alert("Post content cannot be empty!");
    }
}