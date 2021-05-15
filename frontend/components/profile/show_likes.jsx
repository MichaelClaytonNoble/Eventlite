import React from 'react';
import EventList from '../display_events/event_list';


class ShowLikes extends React.Component{

  constructor(props){
    super(props);

  }

  componentDidMount(){
    window.scrollTo(0, 0);
    this.props.getFollowedEvents();
  }
  componentWillMount(){
    this.props.getFollows();
    this.props.clearEvents();
  }

  
  render(){
    return (
      <div id="show-likes">
        <div id="header-title">Likes</div>
        <div id="events-list-wrap">
          <EventList events={this.props.followedEvents} likes={true}/>
        </div>
      </div>
      
    )
  }
}

export default ShowLikes;