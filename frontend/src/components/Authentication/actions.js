import request from 'superagent';
import cookie from 'react-cookies';

let API = `${__API_URL__}`;

const setToken = (auth) => ({
  type: 'TOKEN_SET',
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
    .then(res => { 
      console.log('res.body from auth actions signup is ', res.body)            
      dispatch(setToken(res.body)); return res}) 
    .catch(console.error);   
}

export const login = (user) => (dispatch) => {
  
  console.log('user is ', user)
  let token = cookie.load("auth");
  let authType = () => basicAuth(user);
  
  if(token) authType = () => bearerAuth(token);
  
  return authType()
    .then(res => {
      console.log('res.body from auth actions login is ', res.body)      
      dispatch(setToken(res.body));
      return res;
    })
    .catch( e => console.error('Authenticaton Error:', e.message) );
}

export const logout = () => ({
  type: 'TOKEN_REMOVE'
});

