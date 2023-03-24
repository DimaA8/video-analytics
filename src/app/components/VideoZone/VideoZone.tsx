import React, { memo } from 'react'
import './VideoZone.scss';

type VideoZoneProps = {
  left: number;
  top: number;
  width: number;
  height: number;
}

export const VideoZone = memo(({
  top,
  left,
  width,
  height,
}: VideoZoneProps) => {
  return (
    <div 
      className="video-zone"
      data-testid="zone"
      style={{
        top,
        left,
        width,
        height,
      }}
    ></div>
  )
})