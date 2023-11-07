const upVote = document.getElementById('score-up');
const downVote = document.getElementById('score-down');

// upVote.addEventListener("click", function () {
//     fetch('/api/tattoos/:id', {
//         method: 'PUT',
//         body: 'up',
//     })
//     .then
// });

// downVote.addEventListener("click", function () {
//     fetch('/api/tattoos/:id', {
//         method: 'PUT',
//         body: 'down',
//     })
//     .then
// });

  
  window.addEventListener('DOMContentLoaded', () => {
    
    const response = fetch('/api/users/hotornot', {
        method: 'POST',
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    }).then((data) => {
      const stuff = data;
      console.log(stuff);
      const tat = document.getElementById('tat');
      tat.innerHTML= `<h2 id='tat-head' class='text-lg font-bold'>${data.title}</h2>
        <img id='tat-img' src='${data.imgUrl}' class='h-96'></img>`
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
