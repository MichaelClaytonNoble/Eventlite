

// for sessions logging in, and out, 
export const postSession = (user) =>{
  return $.ajax({
    method: "POST",
    url: '/api/sessions',
    data: { user: user}
  });
}

export const deleteSession = () =>{
  return $.ajax({
    method: "DELETE",
    url: '/api/sessions'
  });
}


