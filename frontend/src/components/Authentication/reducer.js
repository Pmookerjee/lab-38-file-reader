export default(state=null, {type, payload}) => {

  switch(type) {

    case 'TOKEN_SET':
     return {...payload};

    case 'TOKEN_REMOVE':
      payload.token = null;
      return payload;

    case 'SET_USER':
    return {token:payload.token};
     
    default:
      return state;
    
  }
}