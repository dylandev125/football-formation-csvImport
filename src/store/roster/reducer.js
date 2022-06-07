import { createReducer } from '@reduxjs/toolkit';
import { setRosterName, setPlayerData } from './action'

const nameState = {
    rostername : 'My Team',
    data: []
}

const roster = createReducer(nameState, (builder) => {
    builder.addCase(setRosterName, (state, { payload : { rostername } }) => {
      return {
        ...state,
        rostername,
      };
    });
    builder.addCase(setPlayerData, (state, { payload : { data } }) => {
      return {
        ...state,
        data,
      };
    })
})

export default roster;