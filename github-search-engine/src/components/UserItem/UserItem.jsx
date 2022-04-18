import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import React from "react";
import InfoIcon from "@mui/icons-material/Info";
import { Link, useSearchParams } from "react-router-dom";
function UserItem({ user: { login, avatar_url } }) {
  const [searchParams] = useSearchParams({});
  return (
    <Card variant="outlined">
      <CardContent>
        <Avatar
          alt={login}
          src={avatar_url}
          sx={{ width: "60px", height: "60px", margin: "auto" }}
        />
        <Typography sx={{ textAlign: "center" }}>{login}</Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          component={Link}
          endIcon={<InfoIcon />}
          to={`/user/${login}`}
          state={{
            previous: searchParams.get("page"),
            q: searchParams.get("q"),
          }}
          sx={{ margin: "auto" }}
        >
          Info
        </Button>
      </CardActions>
    </Card>
  );
}

export default UserItem;
