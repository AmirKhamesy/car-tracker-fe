import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import peopleReducer from '../features/people/PersonSlice';
import carsReducer from '../features/cars/CarSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    people: peopleReducer,
    cars: carsReducer
    
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
