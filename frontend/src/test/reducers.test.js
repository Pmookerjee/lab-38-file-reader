import React from 'react';
import Enzyme, {simulate, mount, shallow} from 'enzyme';

import uuid from 'uuid/v1';

import costumeReducer from '../components/Costume/reducer';

describe('Costume Reducer tests', () => {
  
  let costume = {name: 'Barney', description: 'Purple dinosaur with weird laughs', id: uuid()};
  let state =[];		

  test('add a new costume', () => {
    
    let action = {type: 'COSTUME_ADD', payload: costume};
    state = costumeReducer(state, action);

    expect(state.length).toEqual(1);
    expect(state[0].description).toEqual(costume.description);			
    expect(state[0].name).toEqual(costume.name);      
  });

  test('update a costume', () => {

    let newcostume = {name: 'Barney 2.0', description: 'Purple dinosaur with weird EVERYTHING' };			

      state = costumeReducer(state, {
      type: 'COSTUME_UPDATE',
      payload: {
        id: costume.id,
        name: newcostume.name,
        description: newcostume.description,
      }
    });

    expect(state[0].name).toEqual('Barney 2.0');
    expect(state[0].description).toEqual('Purple dinosaur with weird EVERYTHING');
    expect(state[0].id).toEqual(costume.id);
  });

  test('delete a costume', () => {
  
    let costume1 = {name: 'Wonder Woman', description: 'Bad ass', id: uuid()};
    let costume2 = {name: 'Batman', description: 'Meh', id: uuid()};
  
    state = [{...costume1}, {...costume2}];
    
    state = costumeReducer(state, {
      type: 'COSTUME_DESTROY', 
      payload: costume2.id
    });

    expect(state.length).toEqual(1);
    expect(state[0].name).toEqual('Wonder Woman');
    expect(state[0].description).toEqual('Bad ass');
  });
})


