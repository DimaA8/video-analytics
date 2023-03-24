import { takeEvery, call, put } from 'redux-saga/effects';
import { fetchEventsApi } from './videoApi';
import { fetchEventsSuccess, VideoEventType } from './videoSlice';

// Загрузить события
function* workFetchEvents() {
  const events: VideoEventType[] = yield call(fetchEventsApi);
  yield put(fetchEventsSuccess(events));
}

export function* videoSaga() {
  yield takeEvery('video/fetchEvents', workFetchEvents);
}