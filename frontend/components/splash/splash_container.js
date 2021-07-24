import React from "react";
import { connect } from "react-redux";
import Splash from "./splash";
import {
  getEventsByType,
  clearEvents,
  clearMyEvents,
  searchEvents
} from "../../actions/events";
import { pullCategories } from "../../actions/categories";
import { getFeaturedCollections } from "../../actions/featured_collections";
import { fetchFollows } from "../../actions/follows";

const mSTP = (state) => {
  return {
    events: Object.values(state.entities.events).sort(
      (a, b) => new Date(a.start) - new Date(b.start)
    ),
    categories: Object.values(state.entities.categories),
    myId: state.session.currentUser.id,
    featuredCollections: Object.values(state.entities.featuredCollections),
    modal: state.ui.modal
  };
};

const mDTP = (dispatch) => {
  let defaultSearch = {
    page: 1,
    per_page: 16,
    future: true,
  };
  return {
    getEvents: (col, val) => dispatch(getEventsByType(col, val)),
    getCategories: () => dispatch(pullCategories()),
    clearEvents: () => dispatch(clearEvents()),
    clearMyEvents: (id) => dispatch(clearMyEvents(id)),
    getFeaturedCollections: () => dispatch(getFeaturedCollections()),
    getFollows: () => dispatch(fetchFollows()),
    searchEvents: (options) => {
      options["page"] = options["page"] || defaultSearch["page"];
      options["per_page"] = options["per_page"] || defaultSearch["per_page"];
      options["future"] = true;
      options["logged_in"] = true;
      return dispatch(searchEvents(options));
    }
  };
};

const SplashContainer = connect(mSTP, mDTP)(Splash);
export default SplashContainer;
