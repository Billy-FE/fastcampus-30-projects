import React, { useCallback, useState} from 'react'
import SortableListItem from './SortableListItem'
import './SortableList.css'
function SortableList({data, onDropItem, onClickItem, renderItem}) {
    const [startIndex, setstartIndex] = useState(null)
    const [listData, setlistData] = useState(data)

    const onDragStart = (index) => setstartIndex(index)

    const onDrop = useCallback((dropIndex) =>{
        const dragItem = listData[startIndex]
        let list = [...listData];
        list.splice(startIndex,1);
        const newListData = startIndex < dropIndex ? [...list.slice(0, dropIndex-1), dragItem, ...list.slice(dropIndex -1, list.length)] : [...list.slice(0, dropIndex), dragItem, ...list.slice(dropIndex, list.length)]
        setlistData(newListData)
        onDropItem(newListData)
    },[startIndex,onDropItem,listData]);

  return (
    <ul className="sortable-list">
        {listData.map((item, index)=>(
            <SortableListItem
                key={index}
                index={index}
                draggable={true}
                onDragStart={onDragStart}
                onDropItem={onDrop}
                onClickItem={onClickItem}
            >
                {renderItem(item, index)}
            </SortableListItem>
        ))}
        <SortableListItem
            key={listData.length}
            index={listData.length}
            draggable={false}
            onDropItem={onDrop}
        />
    </ul>
  )
}

export default SortableList