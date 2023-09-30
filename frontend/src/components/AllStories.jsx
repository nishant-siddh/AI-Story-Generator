import React, { useEffect, useState } from "react";
import axios from "axios";

const AllStories = () => {
  const [stories, setStories] = useState([]);
  useEffect(() => {
    (async () => {
      const response = await axios("http://localhost:3000/api/getStories");
      console.log(response.data);
      setStories(response.data);
    })();
  }, []);

  return (
    <>
      <div>
        <h2 className="text-2xl font-semibold">All stories:</h2>
        {stories.map((story, index) => (
          <div key={index} className="flex justify-between items-center mt-2">
            <span>{story.story}</span>
            <span>Likes: {story.likes}</span>
          </div>
        ))}
      </div>
    </>
  )
};

export default AllStories;
