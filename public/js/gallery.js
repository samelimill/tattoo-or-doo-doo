const logoutButton = document.getElementById("logoutButton");

logoutButton.addEventListener("click", function() {
// Display a confirmation prompt
const userConfirmation = confirm("Are you sure you want to log out?");

// If the user confirms, log them out by clearing the session storage
if (userConfirmation) {
    sessionStorage.clear();
    // Redirect the user to the "/login" route
    window.location.href = "/login"; 
}
});

const upVote = document.getElementById('score-up');
const downVote = document.getElementById('score-down');

upVote.addEventListener("click", function () {
    fetch('/api/tattoos/:id', {
        method: 'PUT',
        body: 'up',
    })
    .then
});

downVote.addEventListener("click", function () {
    fetch('/api/tattoos/:id', {
        method: 'PUT',
        body: 'down',
    })
    .then
});