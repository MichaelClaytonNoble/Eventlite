import { connect } from "react-redux";
import { getEventsByType, clearEvents } from "../../actions/events";
import ShowEvent from "./show_event";
import { fetchFollows } from "../../actions/follows";
import { fetchTickets, clearTickets } from "../../actions/tickets";
import { openModal, closeModal } from "../../actions/modal";

const mSTP = (state, ownProps) => ({
  modal: state.ui.modal,
  event: state.entities.events[ownProps.match.params.eventId],
  relevantEvents: Object.values(state.entities.events).filter((event) => {
    return event.id !== parseInt(ownProps.match.params.eventId);
  }),
  tickets: Object.values(state.entities.tickets),
  follows: state.entities.following
});

const mDTP = (dispatch, ownProps) => ({
  clearEvents: () => dispatch(clearEvents()),
  getEvent: () =>
    dispatch(getEventsByType("any_id", ownProps.match.params.eventId)),
  getRelevantEvents: (category_id) =>
    dispatch(getEventsByType("category_id", category_id)),
  getFollows: () => dispatch(fetchFollows()),
  getTickets: () => dispatch(fetchTickets(ownProps.match.params.eventId)),
  openTicketModal: () => dispatch(openModal("ticketMenu")),
  clearTickets: () => dispatch(clearTickets())
});

const ShowEventContainer = connect(mSTP, mDTP)(ShowEvent);
export default ShowEventContainer;
