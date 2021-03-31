import MyEvents from './my_events'; 
import {connect} from 'react-redux'; 
import {getEventsByType, clearEvents} from '../../actions/events';


const mSTP = state => {
  return ({
    myEvents: (()=>{
      if(state.entities.userEvents[state.session.currentUser.id]){
        return Object.values(state.entities.userEvents[state.session.currentUser.id]);
      }
      return []; 
    })(),
  })
}


const mDTP = (dispatch, ownProps) => {
  return ({
    getMyEvents: ()=>dispatch(getEventsByType('creator_id',ownProps.match.params.myId)),
  })
}

const MyEventsContainer = connect(mSTP, mDTP)(MyEvents); 
export default MyEventsContainer;