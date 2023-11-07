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