//for user creating a new user 

const createUser = user => {
  return $.ajax({
    method: "POST",
    url: "/api/users",
    data: { user: user }
  });
}