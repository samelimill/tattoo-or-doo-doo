
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
      const oldPoint = document.getElementById('old-points');
      tat.innerHTML= `<h2 id='tat-head' class='text-lg font-bold'>${data.title}</h2>
        <img id='tat-img' src='${data.imgUrl}' class='h-96'></img>
        `
      oldPoint.innerHTML = `${data.points}`
    })
    .catch((error) => {
      console.error("Error:", error);
    });

    const upVote = document.getElementById('score-up');
    const downVote = document.getElementById('score-down');

    const scoreUp = () => {
      var oldScore = document.getElementById('old-points').textContent;
      console.log(oldScore)
      updatedScore = oldScore+1;
      console.log(updatedScore);
      const dataUpdate = {
        score: updatedScore
      };
    }
    const scoreDown = () => {

    };

    upVote.addEventListener('click', scoreUp);
    downVote.addEventListener('click', scoreDown);
});
