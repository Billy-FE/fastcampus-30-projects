import {data} from './testItem/testData'
import SortableList from './lib/SortableList';
import TestItem from './testItem/TestItem';

function App() {
  const onClickItem = (index) => alert(index)
  const onDropItem = (newList) => console.log(newList)
  return (
    <SortableList
      data={data}
      renderItem={(item,index) => <TestItem data={item} index={index} />}
      onDropItem={onDropItem}
      onClickItem={onClickItem}
    />
  );
}

export default App;
