import React, { useState, useEffect } from "react";

const FeaturedCollections = (props) => {
  const [currentCollection, setCurrentCollection] = useState(0);

  const createFeaturedCollection = () => {
    if (props.featuredCollections.length === 0) {
      return <div></div>;
    }
    let collection = props.featuredCollections[currentCollection];
    return (
      <div id="content">
        <div id="content-background"></div>
        <div id="summary">
          <h2>
            <img
              id="collections-icon"
              src="https://cdn.evbuc.com/images/100912392/438776807040/1/original.20200513-210241"
              alt="creator"
            />
            {collection.title}
          </h2>
          <p>{collection.description}</p>
        </div>
        <img src={collection.imageUrl} />
      </div>
    );
  };

  const changeFeaturedCollections = (direction) => {
    return (e) => {
      if (direction === "forward") {
        if (currentCollection < props.featuredCollections.length - 1) {
          setCurrentCollection(currentCollection + 1);
        }
      }
      if (direction === "backward") {
        if (currentCollection > 0) {
          setCurrentCollection(currentCollection - 1);
        }
      }
    };
  };
  useEffect(() => {
    if (currentCollection - 1 < 0 || !currentCollection) {
      document.getElementById("left-arrow").classList.add("endArrow");
      document.getElementById("left-arrow").classList.remove("forwardArrow");
    } else {
      document.getElementById("left-arrow").classList.add("forwardArrow");
      document.getElementById("left-arrow").classList.remove("endArrow");
    }
    if (currentCollection + 1 >= props.featuredCollections.length) {
      document.getElementById("right-arrow").classList.add("endArrow");
      document.getElementById("right-arrow").classList.remove("forwardArrow");
    } else {
      document.getElementById("right-arrow").classList.add("forwardArrow");
      document.getElementById("right-arrow").classList.remove("endArrow");
    }
  }, [currentCollection]);

  return (
    <div id="favorite-collections">
      <div id="header">
        <span id="left">
          <h2>Our favorite collections</h2>
          <p>
            Browse through some of the best collections in Online Events hand
            picked by people who know the area best.
          </p>
        </span>
        <span id="right">
          {/* <span></span> */}
          <span id="buttons">
            <button
              className="endArrow"
              id="left-arrow"
              onClick={changeFeaturedCollections("backward")}
            >
              ←
            </button>
            <button
              className="forwardArrow"
              id="right-arrow"
              onClick={changeFeaturedCollections("forward")}
            >
              →
            </button>
          </span>
        </span>
      </div>
      {createFeaturedCollection()}
    </div>
  );
};

export default FeaturedCollections;
