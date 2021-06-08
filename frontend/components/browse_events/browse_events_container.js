

import {connect} from 'react-redux';
import { pullCategories } from '../../actions/categories';
import { getAllEvents } from '../../actions/events';
import BrowseEvents from './browse_events';
import {createFollow, deleteFollow, fetchFollows} from '../../actions/follows';
import { resetPage, incrementPage, decrementPage } from '../../actions/paginate';

const mSTP = (state, ownProps) => ({
  events: Object.values(state.entities.events).sort( (a, b)=> new Date(a.start) - new Date(b.start)),
  categories: Object.values(state.entities.categories),
  initialCategory: ownProps.match.params.category,
  modal: state.ui.modal,
  paginate: state.ui.paginate
});

const mDTP = dispatch => {

  let defaultSearch = {
    page: 1,
    per_page: 12,
  }
  return ({
    getEvents: ()=>dispatch(getAllEvents()),
    getCategories: ()=>dispatch(pullCategories()),
    getFollows: ()=>dispatch(fetchFollows()),
    searchEvents: (options)=> {
        options["page"] = options["page"] || defaultSearch["page"];
        options["per_page"] = options["per_page"] || defaultSearch["per_page"];
        return dispatch(searchEvents(options));
    },
    changePage: (option) => option === "prev" ? dispatch(decrementPage()) : dispatch(incrementPage()),
    resetPage: ()=> dispatch(resetPage())
  });
};

const BrowseEventsContainer = connect(mSTP, mDTP)(BrowseEvents);
export default BrowseEventsContainer; 

