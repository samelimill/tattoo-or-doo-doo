  document.addEventListener('DOMContentLoaded', function () {
    const likeButton = document.querySelector('#likeButton');
    const dislikeButton = document.querySelector('#dislikeButton');
    const likeCountElement = document.querySelector('#likeCount');
    const dislikeCountElement = document.querySelector('#dislikeCount');
    let liked = false;
    let disliked = false;


    let likeCount = 100;
    let dislikeCount = 50;

    likeCountElement.textContent = likeCount;
    dislikeCountElement.textContent = dislikeCount;

    likeButton.addEventListener('click', function () {
      if (!liked) {
        likeCount++;
        likeCountElement.textContent = likeCount;
        likeButton.style.backgroundColor = 'yellow';
        liked = true;
    
      } else {
        likeCount--;
        likeCountElement.textContent = likeCount;
        likeButton.style.backgroundColor = ''; 
        liked = false;
      }
    });

    dislikeButton.addEventListener('click', function () {
      if (!disliked) {
        dislikeCount++;
        dislikeCountElement.textContent = dislikeCount;
        dislikeButton.style.backgroundColor = 'yellow'; 
        disliked = true;
    
      } else {
       
        dislikeCount--;
        dislikeCountElement.textContent = dislikeCount;
        dislikeButton.style.backgroundColor = ''; 
        disliked = false;
    
      }
    });
  });