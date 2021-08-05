import React, { useEffect, useState, Component } from "react";
import EventList from "../display_events/event_list";

const ShowSuggestion = (props) => {
  const [page, setPage] = useState(1);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    props.getFollows();
    props.clearEvents();

    let searchData = {
      suggestionNumber: props.suggestionNumber,
      page
    };
    props.searchEvents(searchData);
  }, []);

  useEffect(() => {
    props.clearEvents();
    setPage(props.paginate.page);
    let searchData = {
      suggestionNumber: props.suggestionNumber,
      page
    };

    props.searchEvents(searchData);
  }, [props.suggestionNumber]);

  useEffect(() => {
    setEvents(props.events);
  }, [props.events]);

  let changePage = "";
  if (events.length >= 12) {
    changePage = (
      <div id="next-page-buttons">
        <button id="prev-page" onClick={() => props.changePage("prev")}>
          previous
        </button>
        <button id="next-page" onClick={() => props.changePage("next")}>
          next
        </button>
      </div>
    );
  }
  return (
    <div id="show-likes">
      <div id="header-title-page-num">
        Page {props.suggestionNumber + 1} of 4
      </div>
      <div id="header-title">Events you may like {props.changeSuggestion}</div>
      <div id="events-list-wrap">
        <EventList events={events} suggestion={true} />
      </div>
      {changePage}
    </div>
  );
};

export default ShowSuggestion;
