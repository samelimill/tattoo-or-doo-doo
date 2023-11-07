const router = require('express').Router();
const { User, Tattoo, Comment } = require('../../models');


const postImage = async (data) => {
  const response = await fetch(`https://api.imgbb.com/1/upload?key=${key}`, {
      method: "POST",
      body: JSON.stringify(data),
  });
  return response.json();
};

router.put('/:id', async (req, res) => {
  console.log(req.body);
});
module.exports = router;