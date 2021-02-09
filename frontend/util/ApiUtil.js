

// for sessions logging in, and out, 
const login = (user) =>{
  return $.ajax({
    method: "POST",
    url: '/api/sessions',
    data: { user: user}
  });
}

const logout = () =>{
  return $.ajax({
    method: "DELETE",
    url: '/api/sessions'
  });
}

//for user creating a new user 

const createUser = user => {
  return $.ajax({
    method: "POST",
    url: "/api/users",
    data: {user: user}
  });
}