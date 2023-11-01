// Get references to the button and the createPostContainer
const showCreatePostButton = document.getElementById('showCreatePost');
const createPostContainer = document.getElementById('createPostContainer');

// Add a click event listener to the button
showCreatePostButton.addEventListener('click', () => {
    // Check if the container is currently hidden
    if (createPostContainer.style.display === 'none' || createPostContainer.style.display === '') {
        // Show the container
        createPostContainer.style.display = 'block';
    } else {
        // Hide the container
        createPostContainer.style.display = 'none';
    }
});
