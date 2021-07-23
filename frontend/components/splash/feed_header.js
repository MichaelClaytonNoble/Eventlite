import React from "react";
import { Link, withRouter } from "react-router-dom";

const FeedHeader = () => {
  return (
    <div id="feed-header">
      <div id="grey-box">
        <div id="feed">
          <h2 id="top-header" className="header">
            Connect through
          </h2>
          <h1 id="main-header" className="header">
            online events
          </h1>
          <Link to="/events/browse" className="header link">
            <span>Browse events →</span>
          </Link>
        </div>
      </div>
      <div id="feed-image">
        <img src={window.feedImage} />
      </div>
    </div>
  );
};

export default FeedHeader;
