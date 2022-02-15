import "./App.scss";
import Controls from "./components/Controls/Controls";
import PlayList from "./components/PlayList/PlayList";
import ProgressArea from "./components/ProgrssArea/ProgressArea";
import SongDetail from "./components/SongDetail/SongDetail";
import React from "react";

function App() {

  return (
    <div className="App">
      <div className="container" >
        <SongDetail />
        <ProgressArea />
        <Controls />
        <PlayList />
      </div>
    </div>
  );
}

export default App;
