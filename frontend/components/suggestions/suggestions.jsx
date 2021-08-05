import React, {useState, useEffect} from 'react'; 
import EventList from "../display_events/event_list";

const Suggestions = (props)=> {

  const [suggestionNumber, setSuggestionNumber] = useState();
  const [page, setPage] = useState(1); 

   const changeSuggestionNumber = (change) => {
     let newSuggestionNumber = suggestionNumber + change;
     if (newSuggestionNumber < 0) newSuggestionNumber = 0;
     if (newSuggestionNumber > 3) newSuggestionNumber = 3;
     setSuggestionNumber(newSuggestionNumber);
   };

  useEffect( ()=> {
    let searchData = {
      suggestionNumber, page
    }; 
    props.searchEvents(searchData); 
  }, []); 

  useEffect( ()=> {
    props.clearEvents(); 
    setPage(props.paginate.page); 
    let searchData = {
      suggestionNumber,
      page
    }; 
    props.searchEvents(searchData); 
  }, [suggestionNumber]); 


  const buttons = (
    <div id="next-page-buttons-suggestions">
      <button
        id="prev-page-suggestions"
        onClick={() => changeSuggestionNumber(-1)}
      >
        prev suggestions
      </button>
      <button
        id="next-page-suggestions"
        onClick={() => changeSuggestionNumber(+1)}
      >
        more suggestions
      </button>
    </div>
  ); 


  let changePage = "";
  if (props.events.length >= 12) {
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
    <div id="show-suggestions">
      <div id="show-likes">
        <div id="header-title-page-num">
          Page {suggestionNumber + 1} of 4
        </div>
        <div id="header-title">
          Events you may like {buttons}
        </div>
        <div id="events-list-wrap">
          <EventList events={props.events} suggestion={true} />
        </div>
        {changePage}
      </div>
    </div>
  );

}; 

export default Suggestions; 


