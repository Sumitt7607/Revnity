const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const Blog = require('../models/Blog');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Multer (Store file in memory, then upload stream to cloudinary)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// @route   GET /api/blogs
// @desc    Get all blogs
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ date: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   POST /api/blogs
// @desc    Create a new blog with image
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, category, content } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ error: 'Image file is required' });
    }

    // Upload image to Cloudinary using upload_stream
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: 'revnity_blogs' },
      async (error, result) => {
        if (error) return res.status(500).json({ error: 'Cloudinary upload failed' });

        // Save Blog to DB
        const newBlog = new Blog({
          title,
          category,
          content,
          image: result.secure_url,
        });

        await newBlog.save();
        res.status(201).json(newBlog);
      }
    );

    // Pass the buffer to the upload stream
    uploadStream.end(req.file.buffer);
    
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   DELETE /api/blogs/:id
// @desc    Delete a blog
router.delete('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });

    // Optional: Delete from Cloudinary here (would need public_id extraction)
    await blog.deleteOne();
    res.json({ message: 'Blog removed' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
