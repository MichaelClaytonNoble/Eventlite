

export const pullFeaturedCollections = () => {
  return $.ajax({
    method: "GET", 
    url: '/api/featured_collections'
  });
}