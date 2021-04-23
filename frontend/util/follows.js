
export const postFollow = (event_id) => {

  return $.ajax({
    method: "POST",
    url: "/api/follows",
    data: {event_id}
  });
}

export const getFollows = () => {
  return $.ajax({
    method: "GET",
    url: "/api/follows",
  });
}

export const destroyFollow = id => {
  return $.ajax({
    method: "DELETE",
    url: `/api/follows/${id}`,
  });
}

