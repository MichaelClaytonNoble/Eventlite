import React, { useState, useEffect, useRef } from "react";
import { Link, withRouter } from "react-router-dom";
import EventList from "../display_events/event_list";
import ModalContainer from "../modals/modal_container";
import FeedHeader from "./feed_header";
import FeaturedCollections from "./featured_collections";
const Splash = (props) => {
  let modal = "";
  if (props.modal) {
    modal = <ModalContainer />;
  }

  useEffect(() => {
    if (!props.follows) props.getFollows();
    if (!props.featuredCollections.length) props.getFeaturedCollections();
    if (!props.categories.length) props.getCategories();
  }, []);

  const [popularIn, setPopularIn] = useState("Online Events");
  const [featuredMessage, setFeaturedMessage] = useState(
    <h1>Popular in {popularIn}</h1>
  );
  const [featured, setFeatured] = useState(true);

  useEffect(() => {
    if (popularIn === "Online Events") {
      setFeatured(true);
    } else {
      setFeatured(false);
    }
    setFeaturedMessage(<h1>Popular in {popularIn}</h1>);
    props.clearEvents();

    let col = "category_id";
    let val,
      name = "";

    if (popularIn === "Online Events") {
      col = "location";
      val = "ONLINE";
      name = "Online Events";
    } else {
      let category = props.categories.find((cat) => {
        return cat.name === popularIn;
      });
      val = category.id;
      name = category.name;
    }
    props.getEvents(col, val);
  }, [popularIn]);
  return (
    <div id="splash">
      {modal}
      <FeedHeader />
      <div id="popular-events">
        {featuredMessage}
        <ul
          id="nav-bar"
          onClick={(e) => {
            if (e.target.innerText === "All") {
              setPopularIn("Online Events");
            } else {
              setPopularIn(e.target.innerText);
            }
          }}
        >
          <li>All</li>
          {props.categories.map((category, key) => {
            return <li key={key}>{category.name}</li>;
          })}
        </ul>
        {featured ? (
          <FeaturedCollections
            featuredCollections={props.featuredCollections}
          />
        ) : (
          ""
        )}
      </div>
      <div id="relevant-events">
        {featured ? <h1>Events in {popularIn}</h1> : ""}
        <EventList events={props.events.slice(0, 17)} card={true} />
      </div>
      <button
        id="see-more-button"
        onClick={() => props.history.push(`/events/browse/${popularIn}`)}
      >
        See more
      </button>
    </div>
  );
};

export default Splash;
