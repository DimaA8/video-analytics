import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type VideoEventType = {
  id: number;
  timestamp: number;
  duration: number;
  zone: {
    left: number;
    top: number;
    width: number;
    height: number;
  }
}

export interface VideoState {
  events: VideoEventType[];
}

const initialState: VideoState = {
  events: [],
};

export const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    fetchEvents() {},

    // События получены
    fetchEventsSuccess(state, action: PayloadAction<VideoEventType[]>) {
      const sortedEvents = action.payload.sort((a, b) => {
        return a.timestamp - b.timestamp;
      })
      state.events = sortedEvents;
    },

    setEvents(state, action: PayloadAction<VideoEventType[]>) {
      state.events = action.payload;
    }
  },
});

export const { fetchEventsSuccess, fetchEvents, setEvents } = videoSlice.actions;

export default videoSlice.reducer;