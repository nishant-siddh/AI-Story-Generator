import React from 'react';

function StoryOutput({ generatedStory, prompt }) {

    async function handleSetStory() {
        const response = await fetch('http://localhost:3000/api/setStories', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                story: generatedStory,
                prompt: prompt,
                likes: 0,
                dislikes: 0,
            }),
        });
        const data = await response.json();
        console.log(data);
    }
    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold">Generated Story:</h2>
            <p className="text-gray-700 mt-2">{generatedStory}</p>
            {
                generatedStory.length !== 0 && (
                    <div className="flex gap-3 mt-4">
                        <button className='px-3 py-2 rounded bg-blue-500 hover:bg-blue-400 hover:shadow-sm text-white' onClick={handleSetStory}>Save Story</button>
                    </div>
                )
            }
        </div>
    );
}

export default StoryOutput;
