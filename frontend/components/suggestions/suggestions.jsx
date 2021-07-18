
import React, {useEffect, useState, Component} from 'react'
import ShowSuggestionContainer from './show_suggestion_container'

const Suggestions = () => {
  const [suggestionNumber, setSuggestionNumber] = useState(0);

  // useEffect( ()=> {
  //   console.log(suggestionNumber); 
  // }, [suggestionNumber])
  const changeSuggestionNumber = (change) => {
    let newSuggestionNumber = suggestionNumber + change;
    if( newSuggestionNumber < 0 ) suggestionNumber = 0;
    if( newSuggestionNumber > 3 ) suggestionNumber = 3;
    setSuggestionNumber(newSuggestionNumber); 
  }

  const buttons = <div id="next-page-buttons-suggestions">
        <button id="prev-page-suggestions" onClick={()=>changeSuggestionNumber(-1)}>prev suggestions</button>
        <button id="next-page-suggestions" onClick={()=>changeSuggestionNumber(+1)}>more suggestions</button>
      </div>
  return (
    <div id="show-suggestions">
      <ShowSuggestionContainer suggestionNumber={suggestionNumber} changeSuggestion={buttons}/>
    </div>
  )
}

export default Suggestions;