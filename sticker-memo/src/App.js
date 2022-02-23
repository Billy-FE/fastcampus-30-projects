import { observer } from "mobx-react";
import Memo from "./Memo/Memo";
import AddIcon from "@mui/icons-material/Add";
import { useCallback } from "react";
function App({ store }) {
  const AddMemo = useCallback(() => store.addMemo(), [store]);
  const Edit = useCallback(
    (id, content) => store.editMemo(id, content),
    [store]
  );
  const SetWidthHeight = useCallback(
    (id, width, height) => store.setWidthHeight(id, width, height),
    [store]
  );
  const SetPosition = useCallback(
    (id, x, y) => store.setPosition(id, x, y),
    [store]
  );
  const Delete = useCallback((id) => store.removeMemo(id), [store]);
  return (
    <>
      {store.memos.map((memo) => (
        <Memo
          key={memo.id}
          item={memo}
          Delete={Delete}
          Edit={Edit}
          SetWidthHeight={SetWidthHeight}
          SetPosition={SetPosition}
        />
      ))}
      <AddIcon
        sx={{
          float: "right",
          backgroundColor: "#e4e4e4",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "30px",
          border: "1px solid black",
        }}
        onClick={AddMemo}
      />
    </>
  );
}

export default observer(App);
