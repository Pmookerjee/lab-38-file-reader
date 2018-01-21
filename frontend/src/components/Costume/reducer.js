const emptyState = [];

let validateData = (costume) => {

  if(costume.name.length < 1) { throw new Error('No costume name')};
  if(costume.description.length < 1) {throw new Error('No description given')};
  
}

export default (state=emptyState, {type, payload}) => {
  
  

  switch (type) {

    case "INIT": 
     return payload || emptyState;

     case "TOKEN_SET": {
      let {username} = payload.user;
      let user = state[username];
       return {...state, [username]:[]};
    }

    case "COSTUME_ADD": 
    //  validateData(payload); 
    let username = Object.keys(state)[0];
    return {[username]: [...state[username], payload]};    
    //  return Object.assign({}, state, ...payload);
    //  return [...state, payload];

    case "COSTUME_UPDATE":
     validateData(payload);        
     return state.map(item => item._id === payload.id ? payload : item );
      
    case "COSTUME_DESTROY":
     return state.filter(item => item._id !== payload);
      
    default:
        return state;

  }
};