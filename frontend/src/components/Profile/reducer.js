
let defaultState = {};

export default (state=defaultState,action) => {

  let {type,payload} = action;

  switch(type) {

    case "SET_USER": {
        return payload.user;
    }

    case 'TOKEN_SET': {
    return payload;
    }

    case "UPDATE_USER": {
      return Object.assign({}, state, payload);
    }
    
    default:
        return state;
  }

};