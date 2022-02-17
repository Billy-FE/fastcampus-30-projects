import React, {
  useRef,
  useImperativeHandle,
  forwardRef,
  useState,
  useCallback,
  memo,
} from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  nextMusic,
  playMusic,
  stopMusic,
} from "../../store/musicPlayerReducer";
import "./ProgressArea.scss";
function ProgressArea(props, ref) {
  const audio = useRef();
  const progressBar = useRef();
  const dispatch = useDispatch();
  const { playList, currentIndex, repeat } = useSelector(
    (state) => ({
      playList: state.playList,
      currentIndex: state.currentIndex,
      repeat: state.repeat,
    }),
    shallowEqual
  );
  const [currentTime, setcurrentTime] = useState("00:00");
  const [duration, setduration] = useState("00:00");
  useImperativeHandle(ref, () => ({
    play: () => {
      audio.current.play();
    },
    pause: () => {
      audio.current.pause();
    },
    changeVolume: (volume) => {
      audio.current.volume = volume;
    },
    resetDuration: () => {
      audio.current.currentTime = 0;
    },
  }));

  const onPlay = useCallback(() => {
    dispatch(playMusic());
  }, [dispatch]);

  const getTime = useCallback((time) => {
    const minutes = `0${parseInt(time / 60, 10)}`;
    const seconds = `0${parseInt(time % 60)}`;
    return `${minutes}:${seconds.slice(-2)}`;
  }, []);

  const onClickProgress = useCallback((event) => {
    const progressBarWidth = event.currentTarget.clientWidth;
    const offsetX = event.nativeEvent.offsetX;
    const duration = audio.current.duration;
    audio.current.currentTime = (offsetX / progressBarWidth) * duration;
  }, []);

  const onTimeUpdate = useCallback(
    (event) => {
      if (event.target.readyState === 0) return;
      const currentTime = event.target.currentTime;
      const duration = event.target.duration;
      const progressBarWidth = (currentTime / duration) * 100;
      progressBar.current.style.width = `${progressBarWidth}%`;
      setcurrentTime(getTime(currentTime));
      setduration(getTime(duration));
    },
    [getTime]
  );

  const onPause = useCallback(() => {
    dispatch(stopMusic());
  }, [dispatch]);

  const onEnded = useCallback(() => {
    if (repeat === "ONE") {
      audio.current.currentTime = 0;
      audio.current.play();
    } else {
      dispatch(nextMusic());
    }
  }, [repeat, dispatch]);
  return (
    <div className="progress-area" onMouseDown={onClickProgress}>
      <div className="progress-bar" ref={progressBar}>
        <audio
          autoPlay
          onEnded={onEnded}
          onPlay={onPlay}
          onTimeUpdate={onTimeUpdate}
          onPause={onPause}
          src={playList[currentIndex].src}
          ref={audio}
        ></audio>
      </div>
      <div className="music-timer">
        <span>{currentTime}</span>
        <span>{duration}</span>
      </div>
    </div>
  );
}

export default memo(forwardRef(ProgressArea));
