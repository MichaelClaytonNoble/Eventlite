

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