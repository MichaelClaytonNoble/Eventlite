import {pullFeaturedCollections } from '../util/featured_collections';

export const RECEIVE_FEATURED_COLLECTIONS ="RECEIVE_FEATURED_COLLECTIONS";


const receive_featured_collections = (collections) => ({
  type: RECEIVE_FEATURED_COLLECTIONS,
  collections
});

export const getFeaturedCollections = ()=> dispatch => {
  return pullFeaturedCollections()
    .then( collections => dispatch(receive_featured_collections(collections)), err => console.log(err.responseText));
}
