

import {connect} from 'react-redux';
import { pullCategories } from '../../actions/categories';
import { getAllEvents } from '../../actions/events';
import BrowseEvents from './browse_events';


const mSTP = (state, ownProps) => ({
  events: Object.values(state.entities.events).sort( (a, b)=> new Date(a.start) - new Date(b.start)),
  categories: Object.values(state.entities.categories),
  initialCategory: ownProps.match.params.category
})

const mDTP = dispatch => ({
  getEvents: ()=>dispatch(getAllEvents()),
  getCategories: ()=>dispatch(pullCategories()),
})

const BrowseEventsContainer = connect(mSTP, mDTP)(BrowseEvents);
export default BrowseEventsContainer; 

