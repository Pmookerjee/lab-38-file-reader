import request from 'superagent';
import cookie from 'react-cookies';

export const updateProfile = user => dispatch => {
    console.log('In profile actions PUT: user is ', user)    
  
  let token = cookie.load('auth');

  console.log(`__API_URL__is ${__API_URL__}`)

  request.put(`http://localhost:3000/api/user/${user._id}`)
    .set('Authorization', "Bearer ", token)
    .field('firstname', user.firstname)
    .field('lastname', user.lastname)
    .field('about', user.about)
    .attach('avatar', user.avatar)
    .then(res => {
        console.log('In profile actions PUT: res.body is ', res.body)
        dispatch(updateUser(res.body))})
    .catch(console.error);
}

const updateUser = user => ({
    type: 'UPDATE_USER',
    payload: user
})