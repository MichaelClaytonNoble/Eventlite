

export const postRegistration = registration => {

  return $.ajax({
    method: 'POST',
    url: '/api/registrations',
    data: {registration}
  });
};

export const pullRegistration = registrationId => {

  return $.ajax({
    method: 'GET',
    url: `/api/registrations/${registrationId}`
  });
};

export const pullRegistrations = () =>{

  return $.ajax({
    method: 'GET',
    url: '/api/registrations'
  });
};

export const destroyRegistration = registrationId => {

  return $.ajax({
    method: 'DELETE',
    url: `/api/registrations/${registrationId}`
  });
};

export const patchRegistration = registration => {

  return $.ajax({
    method: 'PATCH',
    url: `/api/registrations/${registration.id}`,
    data: {registration}
  });
};