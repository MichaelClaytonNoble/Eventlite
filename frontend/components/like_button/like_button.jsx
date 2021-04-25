import React from 'react';


class LikeButton extends React.Component{
  constructor(props){
    super(props);
    this.toggleFollow = this.toggleFollow.bind(this);
  }

  toggleFollow(e){
    const chart = {
      "unfollow": "follow",
      "follow": "unfollow"
    };
    const chartAction = {
      "unfollow": this.props.follow,
      "follow": this.props.unfollow
    };
    let {followStatus, eventId} = this.props;
    e.currentTarget.classList.remove(followStatus);
    e.currentTarget.classList.add(chart[followStatus]);

    chartAction[followStatus](eventId);
  }
  render(){
    const {followStatus, eventId} = this.props;
    return (
        <div id="like-button" className={followStatus}
                        onClick={this.toggleFollow}>
          ♥
        </div>
    )
  }
};

export default LikeButton;