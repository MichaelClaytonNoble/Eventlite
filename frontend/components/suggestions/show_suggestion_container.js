import {connect} from 'react-redux';
import { searchEvents, clearEvents } from '../../actions/events';


import ShowSuggestion from './show_suggestion';
import {fetchFollows} from '../../actions/follows';
import { resetPage, incrementPage, decrementPage } from '../../actions/paginate'

const mSTP = (state) => {
 return ({
  events: Object.values(state.entities.events).sort( (a, b)=> new Date(a.start) - new Date(b.start)),
  modal: state.ui.modal,
  paginate: state.ui.paginate
 })
}

const mDTP = (dispatch) => {

  let defaultSearch = {
    page: 1,
    per_page: 12,
    future: true
  }
  return ({
    getFollows: ()=>dispatch(fetchFollows()),
    searchEvents: (options)=> {
        options["page"] = options["page"] || defaultSearch["page"];
        options["per_page"] = options["per_page"] || defaultSearch["per_page"];
        options["future"] = true;
        options["suggestions"] = true;
        options["suggestionNumber"];
        return dispatch(searchEvents(options));
    },
    changePage: (option) => option === "prev" ? dispatch(decrementPage()) : dispatch(incrementPage()),
    resetPage: ()=> dispatch(resetPage()),
    clearEvents: ()=> dispatch(clearEvents()),
  });
}

const ShowSuggestionContainer = connect(mSTP, mDTP)(ShowSuggestion);
export default (ShowSuggestionContainer);