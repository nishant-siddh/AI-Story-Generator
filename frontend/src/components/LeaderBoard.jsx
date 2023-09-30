import React from 'react';

function LeaderBoard({ stories }) {
  // Sort stories by likes in descending order
  const sortedStories = stories.sort((a, b) => b.likes - a.likes);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold">Leaderboard:</h2>
      {sortedStories.map((story, index) => (
        <div key={index} className="flex justify-between items-center mt-2">
          <span>{story.text}</span>
          <span>Likes: {story.likes}</span>
        </div>
      ))}
    </div>
  );
}

export default LeaderBoard;
