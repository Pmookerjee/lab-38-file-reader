import request from 'superagent';
import cookie from 'react-cookies';

let API = `${__API_URL__}`;

const getToken = () => {
  return cookie.load('auth');
};

export const costumeInitialize = () => dispatch => {

  request.get(`${API}/costumes`)
    .set('Authorization', 'Bearer ' + getToken())
    .then(res => dispatch(initAction(res.body)))
    .catch(console.error);
}

export const createCostume = payload => dispatch => {

  console.log('payload is ', payload);
  request.post(`${API}/costumes`)
    .set('Authorization', 'Bearer ' + getToken())  
    .send(payload)
    .then(res => dispatch(create(res.body)))
    .catch(console.error);
  
};

export const updateCostume = payload => dispatch => {
  
  request.put(`${API}/costume/${payload._id}`)
    .set('Authorization', 'Bearer ' + getToken())  
    .send(payload)
    .then(res => {
      dispatch(update(res.body));
      location.reload();      
    })
    .catch(console.error);

};

export const deleteCostume = payload => dispatch => {

  let id = payload;

  request.delete(`${API}/costume/${payload}`)
  .set('Authorization', 'Bearer ' + getToken())  
  .send(id)
  .then(res => dispatch(destroy(id)))
  .catch(console.error)

}

const initAction = list => ({
  type: 'INIT',
  payload: list
});

const create = costume => ({
    type:"COSTUME_ADD",
    payload: costume
});
  
const update = costume => ({
    type: "COSTUME_UPDATE",
    payload: costume
});
  
const destroy = costume => ({
    type: "COSTUME_DESTROY",
    payload: costume
});