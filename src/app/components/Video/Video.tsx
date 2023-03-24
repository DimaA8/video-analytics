import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks';
import { VideoEventType, fetchEvents } from 'features/video/videoSlice';
import { VideoEvent } from '../VideoEvent';
import { VideoZone } from '../VideoZone';
import './Video.scss';

const isActiveEvent = (currentTime: number, event: VideoEventType) => {
  return currentTime >= event.timestamp && currentTime <= event.timestamp + event.duration;
}

type VideoProps = {
  src: string;
}
export const Video = ({ src }: VideoProps) => {
  const [currentTime, setCurrentTime] = useState(0);
  const events = useAppSelector((state) => state.video.events);
  const dispatch = useAppDispatch();
  const player = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    dispatch(fetchEvents());
    const interval = setInterval(() => {
      if (!player.current || player.current.paused) return;
      const { currentTime } = player.current;
      setCurrentTime(currentTime * 1000);
    }, 1)

    return () => {
      clearInterval(interval);
    }
  }, [])

  const eventClick = useCallback((timestamp: number) => {
    setCurrentTime(timestamp);
    if (player.current) {
      player.current.currentTime = timestamp / 1000;
    }
  }, []);
  const videoEvents = events.map((event) => {
    return (
      <VideoEvent
        key={event.timestamp}
        timestamp={event.timestamp} 
        active={isActiveEvent(currentTime, event)}
        click={eventClick}
      />
    )
  })

  const videoZones = events.map((event) => {
    return isActiveEvent(currentTime, event) ?
      <VideoZone
        key={event.timestamp}
        {...event.zone}
      /> : null
  })

  return (
    <div className="video">
      <div className="video__player-wrapper">
        <video 
          data-testid="video"
          className="video__player"
          ref={player}
          src={src} 
          controls
        />
        {videoZones}
      </div>
      

      <div className="video__events" data-testid="events">
        {videoEvents}
      </div>
    </div>
  )
}