window.addEventListener('DOMContentLoaded', () => {
  var tatId = '';
  const response = fetch('/api/users/hotornot', {
      method: 'POST',
  })
      .then((response) => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          if (response.headers.get('content-length') === '0') {
              return {};
          }
          return response.json();
      })
      .then((data) => {
          tatId = data.id;
          const tat = document.getElementById('tat');
          const oldPoint = document.getElementById('old-points');
          tat.innerHTML = `<h2 id='tat-head' class='text-lg font-bold'>${data.title}</h2>
    <img id='tat-img' src='${data.imgUrl}' class='h-96'></img>
    `;
          oldPoint.innerHTML = `${data.points}`;
      })
      .catch((error) => {
          console.error('Error:', error);
      });
  const upVote = document.getElementById('score-up');
  const downVote = document.getElementById('score-down');

  const scoreUp = () => {
      var oldScore = Number(
          document.getElementById('old-points').textContent
      );
      var updatedScore = oldScore + 1;
      updateRating(Number(tatId), updatedScore);
  };

  const scoreDown = () => {
      var oldScore = Number(
          document.getElementById('old-points').textContent
      );
      var updatedScore = oldScore - 1;
      updateRating(Number(tatId), updatedScore);
  };

const updateRating = (id, score) => {
fetch('/api/users/post', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ id, score }),
})
.then(response => {
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  location.reload();
})
.catch(error => {
  console.error('Error:', error);
});
};

upVote.addEventListener('click', scoreUp);
  downVote.addEventListener('click', scoreDown);
});