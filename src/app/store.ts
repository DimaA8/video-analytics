import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import videoReducer from '../features/video/videoSlice';
import createSagaMiddleware from 'redux-saga';
import { videoSaga } from '../features/video/videoSaga';

const saga = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    video: videoReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(saga);
  },
});
saga.run(videoSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
