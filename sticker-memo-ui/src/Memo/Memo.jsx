import React from "react";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import CloseIcon from "@mui/icons-material/Close";
import "./Memo.scss";

function Memo({ item, Delete, Edit, SetPosition, SetWidthHeight }) {
  return (
    <div
      className="memo-container"
      style={{ width: `${250}px`, height: `${300}px` }}
    >
      <div className="menu">
        <DragHandleIcon sx={{ cursor: "move", fontSize: "25px" }} />
        <CloseIcon
          sx={{ cursor: "pointer", fontSize: "25px", float: "right" }}
        />
      </div>
      <textarea
        className="memo-text-area"
        defaultValue={"Enter memo here"}
        name="txt"
        placeholder="Enter memo here"
      ></textarea>
    </div>
  );
}

export default Memo;
