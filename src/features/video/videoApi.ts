import { VideoEventType } from "./videoSlice";

export function fetchEventsApi(): Promise<VideoEventType[]> {
  return fetch("https://www.mocky.io/v2/5e60c5f53300005fcc97bbdd", { method: 'GET' })
    .then((response) => response.json());
}