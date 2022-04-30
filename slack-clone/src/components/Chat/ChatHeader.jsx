import { CardContent, Grid, Paper, Typography } from "@mui/material";
import React from "react";

function ChatHeader({ channelInfo }) {
  return (
    <Grid container component={Paper} variant="outlined">
      <CardContent>
        <Typography variant="h5"># {channelInfo?.name}</Typography>
        <Typography variant="body1">{channelInfo?.details}</Typography>
      </CardContent>
    </Grid>
  );
}

export default ChatHeader;
