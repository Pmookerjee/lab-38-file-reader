
let defaultState = {};

export default (state=defaultState,action) => {

  let {type,payload} = action;

  switch(type) {

    case "TOKEN_SET": {
      console.log('from profile reducer: TOKEN_SET payload is ', payload)
        return payload.user;
    }

    case "UPDATE_USER": {
      return Object.assign({}, state, payload);
    }
    
    default:
        return state;
  }

};