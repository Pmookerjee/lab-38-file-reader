const emptyState = [];

export default (state=emptyState, {type, payload}) => {
  

  switch (type) {

    case "INIT": 
     return payload || emptyState;

     case "TOKEN_SET": {
      let {username} = payload.user;
      console.log('username is ', username)
      return {...state, [username]:[]};
     }

    case "COSTUME_ADD": {
      let username = Object.keys(state)   
      console.log('username is ', username) 
      return {...state, [username]: [...state[username], payload]}; 
    }   
    // let username = Object.keys(state)[0];

    case "COSTUME_UPDATE": {
      let username = Object.keys(state)  
      let updateList = state[username].map(item => item._id === _id ? payload : item );
      return {...state, [username]: updateList};     
    }

    case "COSTUME_DESTROY": {
      let username = Object.keys(state);
      let list = state[username].filter(item => item._id !== payload);
      return {...state, [username]: list};      
    }
      
    default:
        return state;

  }
};