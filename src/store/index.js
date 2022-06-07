import { configureStore } from '@reduxjs/toolkit';
import roster from './roster/reducer';

const store = configureStore({
    reducer: {
        roster,
    },
  });

  export default store;
