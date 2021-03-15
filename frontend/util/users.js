export const postUser = user => {
  return $.ajax({
    method: "POST",
    url: "/api/users",
    data: { user }
  });
}

