

import {connect} from 'react-redux';
import { pullCategories } from '../../actions/categories';
import { getAllEvents } from '../../actions/events';
import BrowseEvents from './browse_events';


const mSTP = state => ({
  events: state.entities.events,
  categories: Object.values(state.entities.categories),
})

const mDTP = dispatch => ({
  getEvents: dispatch(getAllEvents()),
  getCategories: dispatch(pullCategories()),
})

const BrowseEventsContainer = connect(mSTP, mDTP)(BrowseEvents);
export default BrowseEventsContainer; 

