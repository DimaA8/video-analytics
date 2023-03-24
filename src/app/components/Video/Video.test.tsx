import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store';
import { Video } from './Video';
import { setEvents, VideoEventType } from 'features/video/videoSlice';

const setup = (events?: VideoEventType[]) => {
  render(
    <Provider store={store}>
      <Video src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" />
    </Provider>
  )
  if (events) {
    act(() => {
      store.dispatch(setEvents(events))
    })
  }
}

describe("Тестирование видео", () => {
  const testEvent = {
    id: 1, 
    timestamp: 1000, 
    duration: 100, 
    zone: {
      top: 0,
      left: 0,
      width: 0,
      height: 0
    }
  }
  const initialEvents = [testEvent];
  test('События загружены', async () => {
    setup();
    await screen.findAllByTestId('event');
    const events = screen.getAllByTestId('event');
    expect(events.length).toBeGreaterThan(0);
  });

  test('Перемотка видео при клике на событие', () => {
    setup(initialEvents);
    const event = screen.getAllByTestId('event')[0];
    const video = screen.getByTestId('video') as HTMLVideoElement;
    fireEvent.click(event);    
    expect(video.currentTime).toEqual(testEvent.timestamp / 1000);
  })

  test('Отсутствие квадрата до события', async () => {
    setup(initialEvents);
    const zone = screen.queryByTestId('zone');
    expect(zone).toBeNull();
  })

  test('Отображение квадрата при достижении события', () => {
    setup(initialEvents);
    const event = screen.getAllByTestId('event')[0];
    fireEvent.click(event);
    const zone = screen.getAllByTestId('zone')[0];
    expect(zone).toBeVisible();
  })
})

