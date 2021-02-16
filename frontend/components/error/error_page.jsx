import React from 'react';
import {withRouter} from 'react-router-dom';

class PageNotFound extends React.Component{


  render(){
    return (
      <div id="page-not-found"> 
        <h1 id="page-not-found-header">This Page Does Not Exist </h1>
      </div>
    )
  }
}

export default PageNotFound;