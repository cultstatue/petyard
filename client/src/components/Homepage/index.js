import React from "react";
import { Link } from "react-router-dom";
import "./index.css";
const Home = () => {
  return (
    <div className="flex-row homepage">
      <div>add status bar can go here or off to the side</div>
      <div className="map">
        <Link to={`/profile`}>
          <button className="player-btn">
            {/* <img src="./images/villager.png" /> */}
          </button>
        </Link>
        <Link to={`/profile`}>
          <button className="player-btn">
            {/* <img src="./images/villager.png" /> */}
          </button>
        </Link>
        <Link to={`/profile`}>
          <button className="player-btn">
            {/* <img src="./images/villager.png" /> */}
          </button>
        </Link>
        <Link to={`/profile`}>
          <button className="player-btn">
            {/* <img src="./images/villager.png" /> */}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
