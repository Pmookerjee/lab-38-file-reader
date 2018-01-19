import request from 'superagent';
import cookie from 'react-cookies';

export const updateProfile = user => dispatch => {

    console.log('User in Profile actions is ', user);

  let token = cookie.load('auth');

  request.put(`${__API_URL__}/user/${user._id}`)
    .set('Authorization', "Bearer ", token)
    .field('firstname', user.firstname)
    .field('lastname', user.lastname)
    .field('about', user.about)
    .attach('avatar', user.file)
    .then(res => dispatch(updateUser(res.body)))
    .catch(console.error);
}

const updateUser = user => ({
    type: 'UPDATE_USER',
    payload: user
})