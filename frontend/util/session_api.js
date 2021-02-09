

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

