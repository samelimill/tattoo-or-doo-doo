const router = require('express').Router();
const { User, Tattoo, Comment } = require('../../models');
require('dotenv').config;
const key = process.env.API_KEY;

router.post('/post', async (req, res) => {
  console.log(req.body);
    try {
      const { title, description, baseImage, artist, userId } = req.body; // Adjust the fields according to your Tattoo model
      
      const imgbbUrl = await postImage(baseImage);
      
      const newTattoo = await Tattoo.create({
        title,
        description,
        imgUrl,
        artist,
        userId,
      });

      res.status(201).json(newTattoo); // Respond with the newly created tattoo post
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  const postImage = async (data) => {
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${key}`, {
        method: "POST",
        body: JSON.stringify(data),
    });
    return response.json();
};

// const getbbUrl = async (data) => {
//   await fetch(`https://api.imgbb.com/1/upload?expiration=600&key=${key}`, {
//     method: 'POST',
//     body: data,
//   })
//   .then(response => response.json())
//   .then(data => function async (data)  {
//     console.log(data);
//     return data;
//   }).catch((error) => {
//     console.error('Error:', error);
//   });
// }
  module.exports = router;