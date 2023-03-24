import React, { memo, useMemo } from 'react'
import clsx from 'clsx';
import './VideoEvent.scss';

const timestampToTime = (timestamp: number): string => {
  const date = new Date(timestamp);
  const m = ('0' + date.getMinutes()).slice(-2);
  const s = ('0' + date.getSeconds()).slice(-2);
  const ms = ('00' + date.getMilliseconds()).slice(-3);
  return `${m}:${s}:${ms}`
}

type VideoEventProps = {
  timestamp: number;
  active: boolean;
  click: (timestamp: number) => void
};
export const VideoEvent = memo(({ timestamp, active, click }: VideoEventProps) => {
  
  const handleClick = () => {
    click(timestamp);
  }

  const time = useMemo(() => timestampToTime(timestamp), [timestamp])

  return (
    <button 
      data-testid="event"
      onClick={handleClick} 
      className={clsx("video-event", { active })}
    >
      { time }
    </button>
  )
})