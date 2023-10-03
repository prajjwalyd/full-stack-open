require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
});

const Blog = mongoose.model('Blog', blogSchema);

const mongoUrl = process.env.MONGODB_URI;

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

app.use(cors());
app.use(express.json());

app.get('/api/blogs', (request, response) => {
  Blog.find({})
    .then((blogs) => {
      response.json(blogs);
    })
    .catch((error) => {
      console.error('Error fetching blogs:', error.message);
      response.status(500).json({ error: 'Internal Server Error' });
    });
});

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body);

  blog
    .save()
    .then((result) => {
      response.status(201).json(result);
    })
    .catch((error) => {
      console.error('Error saving blog:', error.message);
      response.status(500).json({ error: 'Internal Server Error' });
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
