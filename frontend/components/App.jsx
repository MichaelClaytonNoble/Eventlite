import React from "react";
import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import { ProtectedRoute } from "../util/route_util.jsx";
import { AuthRoute } from "../util/route_util.jsx";

import HeaderNavBarContainer from "./header/header_nav_bar";
import SplashContainer from "./splash/splash_container";

import SessionLoginFormContainer from "./session/session_login_form_container";
import SessionSignupFormContainer from "./session/session_signup_form_container";
import SessionEmailFormContainer from "./session/session_email_form_container";
import FooterNavBar from "./footer/footer_nav_bar";
import CreateEventFormContainer from "./create_events/create_event_form_container";
import DetailsEventFormContainer from "./create_events/details_event_form_container";

import MyEventsContainer from "./my_events/my_events_container";

import PageNotFound from "./error/error_page";
import BrowseEventsContainer from "./browse_events/browse_events_container";
import ShowEventContainer from "./show_event/show_event_container.js";

import ShowLikesContainer from "./profile/show_likes_container.js";
import CreateTicketFormContainer from "./create_tickets/create_ticket_form_container.js";
import About from "./about/about.jsx";
import SuggestionsContainer from "./suggestions/suggestions_container";

// usePageViews(){
//   React.useEffect( ()=>{
//     let location = useLocation();
//     ReactGA.pageview(location.pathname);

//   }, [location]);
// }
class App extends React.Component {
  render() {
    return (
      <div id="App">
        <HeaderNavBarContainer />
        <div id="main-content">
          <Switch>
            <AuthRoute
              exact
              path="/signin"
              component={SessionEmailFormContainer}
            />
            <AuthRoute
              exact
              path="/signin/login"
              component={SessionLoginFormContainer}
            />
            <AuthRoute
              exact
              path="/signin/signup"
              component={SessionSignupFormContainer}
            />

            <Route exact path="/" component={SplashContainer} />

            <ProtectedRoute
              exact
              path="/events/create"
              component={CreateEventFormContainer}
            />
            <ProtectedRoute
              exact
              path="/events/:eventId/details"
              component={DetailsEventFormContainer}
            />
            <ProtectedRoute
              exact
              path="/events/:eventId/tickets/create"
              component={CreateTicketFormContainer}
            />

            <ProtectedRoute
              exact
              path="/events/:eventId/edit"
              component={CreateEventFormContainer}
            />
            <ProtectedRoute
              exact
              path="/:myId/events"
              component={MyEventsContainer}
            />
            <ProtectedRoute
              exact
              path="/:myId/likes/events"
              component={ShowLikesContainer}
            />

            <Route
              path="/events/browse/:category"
              component={BrowseEventsContainer}
            />
            <Route path="/events/browse/" component={BrowseEventsContainer} />
            <Route path="/events/:eventId" component={ShowEventContainer} />

            <Route path="/suggestions" component={SuggestionsContainer} />
            <Route path="/about" component={About} />
            <Route exact path="/404" component={PageNotFound} />
            <Redirect to="/404" />
          </Switch>
        </div>
        <FooterNavBar />
      </div>
    );
  }
}

export default App;
