import request from 'superagent';
import cookie from 'react-cookies';

let API = `${__API_URL__}`;

const setToken = (auth) => ({
  type: 'TOKEN_SET',
  payload: auth
})

const removeToken = () => ({
  type: 'TOKEN_REMOVE',
  payload: auth
})

let basicAuth = user => {
  
  return request.get(`${__API_URL__}/login`)
    .withCredentials()
    .auth(user.username, user.password);
};

let bearerAuth = token => {
  
  return request.get(`${__API_URL__}/validate`)
    .set('Authorization', 'Bearer ' + token);
};

export const signup = user => (dispatch) => {

  return request.post(`${API}/signup`)
    .withCredentials()
    .send(user)
    .then(res => { dispatch(setToken(res.body.token)); return true}) 
    .catch(console.error);   
}

export const login = (user) => (dispatch) => {
  
  let token = cookie.load("auth");
  
  let authType = () => token ? basicAuth(user) : bearerAuth(token);
  
  return authType()
    .then(res => {
      dispatch(setUser(res.body.token));
      return res;
    })
    .catch( e => console.error('Authenticaton Error:', e.message) );
}

export const logout = () => dispatch(removeToken());

