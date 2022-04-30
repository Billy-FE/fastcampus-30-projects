import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import "../../firebase";
import {
  child,
  getDatabase,
  onChildAdded,
  push,
  ref,
  update,
} from "firebase/database";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentChannel } from "../../store/channelReducer";
function ChannelMenu() {
  const { theme } = useSelector((state) => state);
  const [open, setOpen] = useState(false);
  const [channelName, setChannelName] = useState("");
  const [channelDetail, setChannelDetail] = useState("");
  const [channels, setChannels] = useState([]);
  const [activeChannelId, setActiveChannelId] = useState("");
  const [firstLoaded, setFirstLoaded] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onChildAdded(
      ref(getDatabase(), "channels"),
      (snapshot) => {
        setChannels((channelArr) => [...channelArr, snapshot.val()]);
      }
    );
    return () => {
      setChannels([]);
      unsubscribe();
    };
  }, []);

  const changeChannel = useCallback(
    (channel) => {
      if (channel.id === activeChannelId) return;
      setActiveChannelId(channel.id);
      dispatch(setCurrentChannel(channel));
    },
    [activeChannelId, dispatch]
  );

  const handleClickOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);
  const handleChangeChannelName = useCallback(
    (e) => setChannelName(e.target.value),
    []
  );

  const handleChangeChannelDetail = useCallback(
    (e) => setChannelDetail(e.target.value),
    []
  );

  const handleSubmit = useCallback(async () => {
    const db = getDatabase();
    const key = push(child(ref(db), "chennels")).key;
    const newChannel = {
      id: key,
      name: channelName,
      details: channelDetail,
    };
    const updates = {};
    updates["/channels/" + key] = newChannel;

    try {
      await update(ref(db), updates);
      setChannelName("");
      setChannelDetail("");
      handleClose();
    } catch (error) {
      console.error(error);
    }
  }, [channelDetail, channelName, handleClose]);

  useEffect(() => {
    if (channels.length > 0 && firstLoaded) {
      setActiveChannelId(channels[0].id);
      dispatch(setCurrentChannel(channels[0]));
      setFirstLoaded(false);
    }
  }, [channels, dispatch, firstLoaded]);

  return (
    <>
      <List
        sx={{ overflow: "auto", width: 240, backgroundColor: theme.mainTheme }}
      >
        <ListItem
          secondaryAction={
            <IconButton sx={{ color: "#9A939B" }} onClick={handleClickOpen}>
              <AddIcon />
            </IconButton>
          }
        >
          <ListItemIcon sx={{ color: "#9A939B" }}>
            <ArrowDropDownIcon />
          </ListItemIcon>
          <ListItemText
            primary="채널"
            sx={{ wordBreak: "break-all", color: "#9A939B" }}
          />
        </ListItem>
        <List component="div" disablePadding sx={{ pl: 3 }}>
          {channels.map((channel) => (
            <ListItem
              button
              selected={channel.id === activeChannelId}
              onClick={() => changeChannel(channel)}
              key={channel.id}
            >
              <ListItemText
                primary={`# ${channel.name}`}
                sx={{ wordBreak: "break-all", color: "#918890" }}
              />
            </ListItem>
          ))}
        </List>
      </List>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>채널 추가</DialogTitle>
        <DialogContent>
          <DialogContentText>
            생성할 채널명과 설명을 입력해주세요.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="채널명"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChangeChannelName}
            autoComplete="off"
          />
          <TextField
            margin="dense"
            label="설명"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChangeChannelDetail}
            autoComplete="off"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button onClick={handleSubmit}>생성</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ChannelMenu;
