

import {connect} from 'react-redux';
import { pullCategories } from '../../actions/categories';
import { getAllEvents, searchEvents, clearEvents } from '../../actions/events';

import BrowseEvents from './browse_events';
import {fetchFollows} from '../../actions/follows';
import { resetPage, incrementPage, decrementPage } from '../../actions/paginate'