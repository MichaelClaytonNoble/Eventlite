

export function debounce( func , wait){
  let timeout; 

  return function delayedFunc( ...args ){
    const after = () => {
      clearTimeout( timeout );
      func( ...args );
    };

    clearTimeout( timeout );
    timeout = setTimeout( after, wait ); 
  };
}

export function convertDateToLocalAsJSON(date){
    return (date.toJSON(), new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toJSON());
  }

export function getCurrentDateTime(){
    return convertDateToLocalAsJSON(new Date()).slice(0,16);
  }