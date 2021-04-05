
import CreateEventForm from './create_event_form';
import {connect} from 'react-redux'; 
import {createEvent, clearErrors, getEventsByType, updateEvent} from '../../actions/events'; 
import { CREATE_EVENT_FORM_ERROR_LIST } from '../../reducers/selectors/error_selectors';
import {pullCategories} from '../../actions/categories'; 
import {TIMEZONES} from '../../constants/constants'; 

const mSTP = (state, ownProps) =>{
  return ({
    errors: state.errors.events,
    errorList: CREATE_EVENT_FORM_ERROR_LIST,
    timezones: TIMEZONES,
    categories: Object.values(state.entities.categories),
    edit: (()=>{ if(ownProps.match.params.eventId){return true;} else{return false}})(),
    event: state.entities.events[ownProps.match.params.eventId]
  });
}

const mDTP = (dispatch, ownProps) =>{
  console.log(ownProps.match.params.eventId);
  return({
    createEvent: (formEvent)=>dispatch(createEvent(formEvent)),
    updateEvent: (formEvent)=>dispatch(updateEvent(formEvent)),
    clearErrors: ()=>dispatch(clearErrors()),
    getCategories: ()=>dispatch(pullCategories()),
    getEvent: ()=> dispatch(getEventsByType('id', ownProps.match.params.eventId))
  })
}

const CreateEventFormContainer = connect(mSTP, mDTP)(CreateEventForm);
export default CreateEventFormContainer;

// var timezones = [
//   { "zone": "(GMT-12:00) International Date Line West", "locale": "Etc/GMT+12" },
//   { "zone": "(GMT-11:00) Midway Island, Samoa", "locale": "Pacific/Midway" },
//   { "zone": "(GMT-10:00) Hawaii", "locale": "Pacific/Honolulu" },
//   { "zone": "(GMT-09:00) Alaska", "locale": "US/Alaska" },
//   { "zone": "(GMT-08:00) Pacific Time (US & Canada)", "locale": "America/Los_Angeles" },
//   { "zone": "(GMT-08:00) Tijuana, Baja California", "locale": "America/Tijuana" },
//   { "zone": "(GMT-07:00) Arizona", "locale": "US/Arizona" },
//   { "zone": "(GMT-07:00) Chihuahua, La Paz, Mazatlan", "locale": "America/Chihuahua" },
//   { "zone": "(GMT-07:00) Mountain Time (US & Canada)", "locale": "US/Mountain" },
//   { "zone": "(GMT-06:00) Central America", "locale": "America/Managua" },
//   { "zone": "(GMT-06:00) Central Time (US & Canada)", "locale": "US/Central" },
//   { "zone": "(GMT-06:00) Guadalajara, Mexico City, Monterrey", "locale": "America/Mexico_City" },
//   { "zone": "(GMT-06:00) Saskatchewan", "locale": "Canada/Saskatchewan" },
//   { "zone": "(GMT-05:00) Bogota, Lima, Quito, Rio Branco", "locale": "America/Bogota" },
//   { "zone": "(GMT-05:00) Eastern Time (US & Canada)", "locale": "US/Eastern" },
//   { "zone": "(GMT-05:00) Indiana (East)", "locale": "US/East-Indiana" },
//   { "zone": "(GMT-04:00) Atlantic Time (Canada)", "locale": "Canada/Atlantic" },
//   { "zone": "(GMT-04:00) Caracas, La Paz", "locale": "America/Caracas" },
//   { "zone": "(GMT-04:00) Manaus", "locale": "America/Manaus" },
//   { "zone": "(GMT-04:00) Santiago", "locale": "America/Santiago" },
//   { "zone": "(GMT-03:30) Newfoundland", "locale": "Canada/Newfoundland" },
//   { "zone": "(GMT-03:00) Brasilia", "locale": "America/Sao_Paulo" },
//   { "zone": "(GMT-03:00) Buenos Aires, Georgetown", "locale": "America/Argentina/Buenos_Aires" },
//   { "zone": "(GMT-03:00) Greenland", "locale": "America/Godthab" },
//   { "zone": "(GMT-03:00) Montevideo", "locale": "America/Montevideo" },
//   { "zone": "(GMT-02:00) Mid-Atlantic", "locale": "America/Noronha" },
//   { "zone": "(GMT-01:00) Cape Verde Is.", "locale": "Atlantic/Cape_Verde" },
//   { "zone": "(GMT-01:00) Azores", "locale": "Atlantic/Azores" },
//   { "zone": "(GMT+00:00) Casablanca, Monrovia, Reykjavik", "locale": "Africa/Casablanca" },
//   { "zone": "(GMT+00:00) Greenwich Mean Time : Dublin, Edinburgh, Lisbon, London", "locale": "Etc/Greenwich" },
//   { "zone": "(GMT+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna", "locale": "Europe/Amsterdam" },
//   { "zone": "(GMT+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague", "locale": "Europe/Belgrade" },
//   { "zone": "(GMT+01:00) Brussels, Copenhagen, Madrid, Paris", "locale": "Europe/Brussels" },
//   { "zone": "(GMT+01:00) Sarajevo, Skopje, Warsaw, Zagreb", "locale": "Europe/Sarajevo" },
//   { "zone": "(GMT+01:00) West Central Africa", "locale": "Africa/Lagos" },
//   { "zone": "(GMT+02:00) Amman", "locale": "Asia/Amman" },
//   { "zone": "(GMT+02:00) Athens, Bucharest, Istanbul", "locale": "Europe/Athens" },
//   { "zone": "(GMT+02:00) Beirut", "locale": "Asia/Beirut" },
//   { "zone": "(GMT+02:00) Cairo", "locale": "Africa/Cairo" },
//   { "zone": "(GMT+02:00) Harare, Pretoria", "locale": "Africa/Harare" },
//   { "zone": "(GMT+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius", "locale": "Europe/Helsinki" },
//   { "zone": "(GMT+02:00) Jerusalem", "locale": "Asia/Jerusalem" },
//   { "zone": "(GMT+02:00) Minsk", "locale": "Europe/Minsk" },
//   { "zone": "(GMT+02:00) Windhoek", "locale": "Africa/Windhoek" },
//   { "zone": "(GMT+03:00) Kuwait, Riyadh, Baghdad", "locale": "Asia/Kuwait" },
//   { "zone": "(GMT+03:00) Moscow, St. Petersburg, Volgograd", "locale": "Europe/Moscow" },
//   { "zone": "(GMT+03:00) Nairobi", "locale": "Africa/Nairobi" },
//   { "zone": "(GMT+03:00) Tbilisi", "locale": "Asia/Tbilisi" },
//   { "zone": "(GMT+03:30) Tehran", "locale": "Asia/Tehran" },
//   { "zone": "(GMT+04:00) Abu Dhabi, Muscat", "locale": "Asia/Muscat" },
//   { "zone": "(GMT+04:00) Baku", "locale": "Asia/Baku" },
//   { "zone": "(GMT+04:00) Yerevan", "locale": "Asia/Yerevan" },
//   { "zone": "(GMT+04:30) Kabul", "locale": "Asia/Kabul" },
//   { "zone": "(GMT+05:00) Yekaterinburg", "locale": "Asia/Yekaterinburg" },
//   { "zone": "(GMT+05:00) Islamabad, Karachi, Tashkent", "locale": "Asia/Karachi" },
//   { "zone": "(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi", "locale": "Asia/Calcutta" },
//   { "zone": "(GMT+05:30) Sri Jayawardenapura", "locale": "Asia/Calcutta" },
//   { "zone": "(GMT+05:45) Kathmandu", "locale": "Asia/Katmandu" },
//   { "zone": "(GMT+06:00) Almaty, Novosibirsk", "locale": "Asia/Almaty" },
//   { "zone": "(GMT+06:00) Astana, Dhaka", "locale": "Asia/Dhaka" },
//   { "zone": "(GMT+06:30) Yangon (Rangoon)", "locale": "Asia/Rangoon" },
//   { "zone": "(GMT+07:00) Bangkok, Hanoi, Jakarta", "locale": "Asia/Bangkok" },
//   { "zone": "(GMT+07:00) Krasnoyarsk", "locale": "Asia/Krasnoyarsk" },
//   { "zone": "(GMT+08:00) Beijing, Chongqing, Hong Kong, Urumqi", "locale": "Asia/Hong_Kong" },
//   { "zone": "(GMT+08:00) Kuala Lumpur, Singapore", "locale": "Asia/Kuala_Lumpur" },
//   { "zone": "(GMT+08:00) Irkutsk, Ulaan Bataar", "locale": "Asia/Irkutsk" },
//   { "zone": "(GMT+08:00) Perth", "locale": "Australia/Perth" },
//   { "zone": "(GMT+08:00) Taipei", "locale": "Asia/Taipei" },
//   { "zone": "(GMT+09:00) Osaka, Sapporo, Tokyo", "locale": "Asia/Tokyo" },
//   { "zone": "(GMT+09:00) Seoul", "locale": "Asia/Seoul" },
//   { "zone": "(GMT+09:00) Yakutsk", "locale": "Asia/Yakutsk" },
//   { "zone": "(GMT+09:30) Adelaide", "locale": "Australia/Adelaide" },
//   { "zone": "(GMT+09:30) Darwin", "locale": "Australia/Darwin" },
//   { "zone": "(GMT+10:00) Brisbane", "locale": "Australia/Brisbane" },
//   { "zone": "(GMT+10:00) Canberra, Melbourne, Sydney", "locale": "Australia/Canberra" },
//   { "zone": "(GMT+10:00) Hobart", "locale": "Australia/Hobart" },
//   { "zone": "(GMT+10:00) Guam, Port Moresby", "locale": "Pacific/Guam" },
//   { "zone": "(GMT+10:00) Vladivostok", "locale": "Asia/Vladivostok" },
//   { "zone": "(GMT+11:00) Magadan, Solomon Is., New Caledonia", "locale": "Asia/Magadan" },
//   { "zone": "(GMT+12:00) Auckland, Wellington", "locale": "Pacific/Auckland" },
//   { "zone": "(GMT+12:00) Fiji, Kamchatka, Marshall Is.", "locale": "Pacific/Fiji" },
//   { "zone": "(GMT+13:00) Nuku'alofa", "locale": "Pacific/Tongatapu" }
// ]