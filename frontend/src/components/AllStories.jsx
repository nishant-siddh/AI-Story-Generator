import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineLike, AiOutlineDislike, AiFillDislike, AiFillLike } from "react-icons/ai";

const AllStories = () => {
  const [stories, setStories] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisLiked, setIsDisLiked] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await axios("https://ai-story-generator-backend.onrender.com/api/getStories");
      setStories(response.data);
    })();
  }, []);

  function handleLike(e) {
    if (isDisLiked) {
      setIsDisLiked(!isDisLiked);
    }
    setIsLiked(!isLiked);
  }

  function handleDislike(e) {
    if (isLiked) {
      setIsLiked(!isLiked);
    }
    setIsDisLiked(!isDisLiked);
  }

  return (
    <>
      <div>
        <h2 className="text-2xl font-semibold">All stories:</h2>
        <div className="flex flex-col gap-2">
          {stories.map((story, index) => (
            <div key={index} className="w-full p-3 border">
              <span>{story.story}</span>
              <div className="flex">
                <span onClick={handleLike}>{!isLiked ? <AiOutlineLike /> : <AiFillLike />}{story.likes}</span>
                <span onClick={handleDislike}>{!isDisLiked ? <AiOutlineDislike /> : <AiFillDislike />}{story.likes}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllStories;
