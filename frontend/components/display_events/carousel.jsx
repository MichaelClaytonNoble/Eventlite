import React from 'react';
import EventList from './event_list';

class Carousel extends React.Component{
  constructor(props){
    super(props);

  }

  moveCarousel(direction){
    return (e)=>{
      let element = document.getElementById('carousel-child');

      let left = window.getComputedStyle(element,null).getPropertyValue('left').replace(/[^-\d\.]/g, '');
      let width = window.getComputedStyle(element,null).getPropertyValue('width').replace(/[^-\d\.]/g, '');
      left = parseInt(left);
      let cellWidth = (parseInt(width)*.3 + parseInt(width)*.01);
      width = (cellWidth*this.props.events.length-parseInt(width))*-1;
      if(direction ==='left'){
        left += cellWidth;
        if(left > 0){left = 0;}
      }
      if(direction ==='right'){
        left -= cellWidth;
        if(left < width){
          left=width;
        }
      }
      element.style.left = left.toString()+'px';
    }
  }
  render(){
    return (
      <div id="carousel-wrap">
        <div id="title">Other Events You May Like</div>
        <div id="carousel">
          <div id="chevron-right" onMouseDown={this.moveCarousel('right')}><img className="chevron" src="https://img.icons8.com/ios-glyphs/30/000000/chevron-right.png"/></div>
          <div id="chevron-left" onMouseDown={this.moveCarousel('left')}><img className="chevron" src="https://img.icons8.com/ios-glyphs/30/000000/chevron-left.png"/></div>
          <div id="carousel-child">
            <EventList events={this.props.events} carousel={true} that={this.props.that}/>
          </div>
        </div>
      </div>
    )
  }
};

export default Carousel;