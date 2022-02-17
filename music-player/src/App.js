import "./App.scss";
import Controls from "./components/Controls/Controls";
import PlayList from "./components/PlayList/PlayList";
import ProgressArea from "./components/ProgrssArea/ProgressArea";
import SongDetail from "./components/SongDetail/SongDetail";
import React, { useCallback, useRef, useState } from "react";

function App() {
  const audioRef = useRef();
  const [showPlayList, setshowPlayList] = useState(false);
  const onPlay = useCallback(() => {
    audioRef.current.play();
  }, []);
  const onPause = useCallback(() => {
    audioRef.current.pause();
  }, []);
  const changeVolume = useCallback((volume) => {
    audioRef.current.changeVolume(volume);
  }, []);
  const resetDuration = useCallback(() => {
    audioRef.current.resetDuration();
  }, []);
  return (
    <div className="App">
      <div className="container">
        <SongDetail />
        <ProgressArea ref={audioRef} />
        <Controls
          setshowPlayList={setshowPlayList}
          play={onPlay}
          pause={onPause}
          changeVolume={changeVolume}
          resetDuration={resetDuration}
        />
        <PlayList
          setshowPlayList={setshowPlayList}
          showPlayList={showPlayList}
        />
      </div>
    </div>
  );
}

export default App;
