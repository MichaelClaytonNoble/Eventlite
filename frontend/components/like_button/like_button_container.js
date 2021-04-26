import LikeButton from './like_button';
import {connect} from 'react-redux';
import {createFollow, deleteFollow} from '../../actions/follows';
const mSTP = (state, {eventId}) => ({
  followStatus: (()=>{
                      if(state.entities.following.includes(eventId)){
                        return "follow"
                      }
                      else{
                        return "unfollow"
                      }
                    })()

});

const mDTP = dispatch => ({
  follow: event_id=>dispatch(createFollow(event_id)),
  unfollow: event_id => dispatch(deleteFollow(event_id))
});

const LikeButtonContainer = connect(mSTP, mDTP)(LikeButton); 
export default LikeButtonContainer;


