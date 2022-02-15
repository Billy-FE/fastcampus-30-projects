import React from 'react';
import classNames from 'classnames';

function PlayListItem({ item, index }) {
 
  return (
    <>
      <div className={classNames('row')}>
        <span>{item.name}</span>
        <p>{item.artist}</p>
      </div>
      <span
        className={classNames('music-duration')}>
        00:00
      </span>
    </>
  );
}

export default PlayListItem;
