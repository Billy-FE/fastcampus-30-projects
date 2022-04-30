import React, { useCallback, useState } from "react";
import {
  AppBar,
  Avatar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import TagIcon from "@mui/icons-material/Tag";
import { useSelector } from "react-redux";
import "../firebase";
import { signOut, getAuth } from "firebase/auth";
import ProfileModal from "./Modal/ProfileModal";
function Header() {
  const { user, theme } = useSelector((state) => state);
  const [anchorEl, setAnchorEl] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const handleOpenMenu = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);
  const handleCloseMenu = useCallback(() => setAnchorEl(null), []);

  const handleClickOepn = useCallback(() => {
    setShowProfileModal(true);
    handleCloseMenu();
  }, [handleCloseMenu]);

  const handleCloseProfileModal = useCallback(() => {
    setShowProfileModal(false);
  }, []);

  const handleLogout = useCallback(async () => {
    await signOut(getAuth());
  }, []);
  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          color: "#9A939B",
          backgroundColor: theme.mainTheme,
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            height: "50px",
          }}
        >
          <Box sx={{ display: "flex" }}>
            <TagIcon />
            <Typography variant="h6" component="div">
              SLACK
            </Typography>
          </Box>
          <Box>
            <IconButton onClick={handleOpenMenu}>
              <Typography
                variant="h6"
                component="div"
                sx={{ color: "#9A939B" }}
              >
                {user.currentUser?.displayName}
              </Typography>
              <Avatar
                sx={{ ml: "10px" }}
                alt="profileImage"
                src={user.currentUser?.photoURL}
              />
            </IconButton>
            <Menu
              sx={{ mt: "45px" }}
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem onClick={handleClickOepn}>
                <Typography textAlign="center">프로필이미지</Typography>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <Typography textAlign="center">Log Out</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <ProfileModal
        open={showProfileModal}
        handleClose={handleCloseProfileModal}
      />
    </>
  );
}

export default Header;
