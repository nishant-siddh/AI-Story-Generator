import React from "react";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="w-[14%] border">
      <Link to='/allstories'>
        <button>All Stories</button>
      </Link>
    </div>
  );
};

export default SideBar;
