import {
  Avatar,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Link,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import React, { useCallback, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useGithubUserStore } from "../../store/githubUser";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
function UserInfo() {
  const {
    user: {
      avatar_url,
      name,
      html_url,
      company,
      blog,
      location: locationInfo,
      email,
      hireable,
      bio,
      public_repos,
      public_gists,
      followers,
      following,
      created_at,
      updated_at,
    },
    loading,
    getUser,
  } = useGithubUserStore();
  const { username } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    getUser(username);
  }, [username, getUser]);

  const onClickNavigateToList = useCallback(() => {
    if (!location.state) navigate("/");
    else {
      navigate({
        pathname: "/",
        search: !!location.state?.previous
          ? `?q=${location.state?.q}&page=${location.state?.previous}`
          : `?q=${location.state?.q}`,
      });
    }
  }, [location.state, navigate]);

  if (loading) {
    return (
      <CircularProgress
        sx={{ marginLeft: "auto", marginRight: "auto", marginTop: "200px" }}
      />
    );
  } else {
    return (
      <>
        <Button
          style={{ margin: "10px" }}
          onClick={onClickNavigateToList}
          startIcon={<ArrowBackIcon />}
        >
          Github User List로 돌아가기
        </Button>
        <Card variant="outlined" sx={{ margin: "10px" }}>
          <CardContent sx={{ textAlign: "center" }}>
            <Avatar
              alt={name}
              src={avatar_url}
              sx={{ width: "200px", height: "200px", margin: "auto" }}
            />
            <Typography variant="h4" sx={{ marginBottom: "50px" }}>
              {name}
            </Typography>
            <Button
              variant="contained"
              href={html_url}
              sx={{ marginBottom: "30px" }}
            >
              Github Page
            </Button>
            {bio ? (
              <Typography variant="subtitle1">자기소개 : {bio}</Typography>
            ) : null}
            {company ? (
              <Typography variant="subtitle1">Company : {company}</Typography>
            ) : null}
            {blog ? (
              <Typography variant="subtitle1">
                Blog : <Link href={blog}>{blog}</Link>
              </Typography>
            ) : null}
            {locationInfo ? (
              <Typography variant="subtitle1">위치 : {locationInfo}</Typography>
            ) : null}
            {email ? (
              <Typography variant="subtitle1">email : {email}</Typography>
            ) : null}
            <Typography variant="subtitle1">
              고용가능 여부 : {hireable ? "예" : "아니오"}
            </Typography>
            <Typography variant="subtitle1">
              public repository 개수 : {public_repos}
            </Typography>
            <Typography variant="subtitle1">
              public gist 개수 : {public_gists}
            </Typography>
            <Typography variant="subtitle1">
              followers 수 : {followers}
            </Typography>
            <Typography variant="subtitle1">
              following 수 : {following}
            </Typography>
            <Typography variant="subtitle1">
              Github 생성일 : {dayjs(created_at).format("YYYY.MM.DD h:mm A")}
            </Typography>
            <Typography variant="subtitle1">
              최근 Github 업데이트 시간 :{" "}
              {dayjs(updated_at).format("YYYY.MM.DD h:mm A")}
            </Typography>
          </CardContent>
        </Card>
      </>
    );
  }
}

export default UserInfo;
