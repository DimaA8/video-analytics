import React, { SyntheticEvent, useCallback, useEffect, useRef, useState } from 'react'
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
  const [ratio, setRatio] = useState(0);
  const events = useAppSelector((state) => state.video.events);
  const dispatch = useAppDispatch();
  const player = useRef<HTMLVideoElement>(null);

  const calcRatio = () => {
    if (player.current) {
      setRatio(player.current.clientWidth / player.current.videoWidth);
    }
  }

  useEffect(() => {
    player.current?.addEventListener('canplay', calcRatio)
    window.addEventListener('resize', calcRatio);

    return () => {
      window.removeEventListener('resize', calcRatio);
    }
  }, [player])

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
  }, [dispatch])

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
        top={event.zone.top * ratio}
        left={event.zone.left * ratio}
        width={event.zone.width * ratio}
        height={event.zone.height * ratio}
      /> : null
  })

  const handleSeeking = (event: SyntheticEvent<HTMLVideoElement>) => {
    setCurrentTime(event.currentTarget.currentTime * 1000);
  }
  return (
    <div className="video">
      <div className="video__player-wrapper">
        <video 
          data-testid="video"
          className="video__player"
          ref={player}
          onSeeking={handleSeeking}
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