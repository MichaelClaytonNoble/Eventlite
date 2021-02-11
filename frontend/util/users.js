//for user creating a new user 

export const postUser = user => {
  return $.ajax({
    method: "POST",
    url: "/api/users",
    data: { user }
  });
}

