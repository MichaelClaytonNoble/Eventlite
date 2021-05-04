import LikeButton from './like_button';
import {connect} from 'react-redux';
import {createFollow, deleteFollow} from '../../actions/follows';
import { openModal } from '../../actions/modal';

const mSTP = (state, {eventId}) => ({
  followStatus: (()=>{
                      if(state.entities.following.includes(eventId)){
                        return "follow"
                      }
                      else{
                        return "unfollow"
                      }
                    })(),
  loggedIn: state.session.currentUser.id,
  modal: state.ui.modal

});

const mDTP = dispatch => ({
  follow: event_id=>dispatch(createFollow(event_id)),
  unfollow: event_id => dispatch(deleteFollow(event_id)),
  openModal: (type)=>dispatch(openModal(type))
});

const LikeButtonContainer = connect(mSTP, mDTP)(LikeButton); 
export default LikeButtonContainer;


