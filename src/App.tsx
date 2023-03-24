import React from 'react';
import { Video } from './app/components/Video';
import './App.css';

function App() {
  return (
    <div className="App">
      <Video src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" />
    </div>
  );
}

export default App;
