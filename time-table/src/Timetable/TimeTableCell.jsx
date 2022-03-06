import { TableCell } from "@mui/material";
import React, { memo, useCallback, useMemo, useState } from "react";
import { useRecoilState } from "recoil";
import { timeTableState } from "../store/store";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
function TimeTableCell({ day, timeNum, Edit }) {
  const [timeTableData, settimeTableData] = useRecoilState(timeTableState);
  const [hover, sethover] = useState(false);
  const [open, setopen] = useState(false);
  const timeData = useMemo(
    () =>
      timeTableData[day].find(
        (time) => time.start <= timeNum && timeNum < time.end
      ),
    [day, timeNum, timeTableData]
  );
  const handleClose = useCallback(() => setopen(false), []);
  const handleConfirm = useCallback(() => setopen(true), []);
  const handleDelete = useCallback(() => {
    settimeTableData((oldtimeTableData) => {
      const newDayData = oldtimeTableData[day].filter(
        (data) => data.id !== timeData.id
      );
      return {
        ...oldtimeTableData,
        [day]: newDayData,
      };
    });
    setopen(false);
  }, [day, settimeTableData, timeData?.id]);
  const handleEdit = useCallback(
    () => Edit(day, timeData.id),
    [Edit, day, timeData?.id]
  );
  return (
    <>
      {timeData?.start === timeNum ? (
        <TableCell
          style={{ backgroundColor: timeData.color, position: "relative" }}
          align="center"
          rowSpan={timeData.end - timeData.start}
          onMouseOver={() => sethover(true)}
          onMouseLeave={() => sethover(false)}
        >
          {timeData.name}
          {hover ? (
            <div style={{ position: "absolute", top: 5, right: 5 }}>
              <EditIcon style={{ cursor: "pointer" }} onClick={handleEdit} />
              <DeleteIcon
                style={{ cursor: "pointer" }}
                onClick={handleConfirm}
              />
            </div>
          ) : null}
        </TableCell>
      ) : timeData?.start < timeNum && timeNum < timeData?.end ? null : (
        <TableCell />
      )}
      <ConfirmModal
        open={open}
        handleClose={handleClose}
        handleDelete={handleDelete}
      />
    </>
  );
}

export default memo(TimeTableCell);
