
let defaultState = {};

export default (state=defaultState,action) => {

  let {type,payload} = action;

  switch(type) {

    case "SET_USER": {
        return payload.user;
    }
    
    default:
        return state;
  }

};