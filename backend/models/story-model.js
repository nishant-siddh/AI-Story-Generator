const mongoose = require('mongoose');

const Story = new mongoose.Schema({
    story: { type: String, required: true },
    prompt: { type: String, required: true },
    likes: Number,
    dislikes: Number,
}, { collection: 'stories' });

const model = mongoose.model('StoryData', Story);

module.exports = model;
