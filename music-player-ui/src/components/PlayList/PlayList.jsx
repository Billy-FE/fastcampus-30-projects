import React from 'react';
import QueueMusic from '@mui/icons-material/QueueMusic';
import Close from '@mui/icons-material/Close';
import PlayListItem from './PlayListItem';
import classNames from 'classnames';
import MusicList from '../../store/data'
import './PlayList.scss';


const PlayList = ({ showMusicList, setShowMusicList }) => {


  return (
    <div className={classNames('play-list')}>
      <div className="header">
        <div className="row">
          <QueueMusic className="list" />
          <span>Play list</span>
        </div>
        <Close
          sx={{ fontSize: 22, cursor: 'pointer' }}
        />
      </div>
      <ul>
      {MusicList.map((item,index)=>  <li key={index}><PlayListItem item={item} index={index} /></li>)}
      </ul>
    </div>
  );
};

export default PlayList;
