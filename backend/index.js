const express = require('express')
const app = express()
const cors = require('cors');
const port = 3000
const mongoose = require('mongoose');
const Story = require('./models/story-model');

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://pilik56896:pilik56896@cluster0.x900tqm.mongodb.net/storiesDb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));


// Define a route to save a story
app.post('/api/setStories', async (req, res) => {
    console.log(req.body);
    try {
        // Extract the story data from the request body
        const { story, prompt, likes, dislikes } = req.body;

        const newStory = new Story({
            story: story,
            prompt: prompt,
            likes: likes,
            dislikes: dislikes,
        });
        console.log(newStory);
        await newStory.save();

        res.status(200).json({ message: 'Story saved successfully' });
    } catch (error) {
        console.error(error);
        console.log(error);
        res.status(500).json({ message: 'Error saving the story' });
    }
});

// Define a route to get stories
app.get('/api/getStories', async (req, res) => {
    try {
        // Use Mongoose to query the database for stories
        const stories = await Story.find({});

        res.status(200).json(stories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching stories' });
    }
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
