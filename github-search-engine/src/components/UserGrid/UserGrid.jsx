import { CircularProgress, Grid, Pagination } from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useGithubUsersStore } from "../../store/githubUsers";
import UserItem from "../UserItem/UserItem";

function UserGrid() {
  const [searchParams, setSearchParams] = useSearchParams({});
  const { users, totalCount, loading, searchUsers } = useGithubUsersStore();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const query = searchParams.get("q");
    const page = searchParams.get("page") ?? 1;
    if (!query) return;
    searchUsers(query, page);
  }, [searchParams, searchUsers]);

  const totalPageCount = useMemo(() => {
    const pageCount = Math.ceil(totalCount / 20);
    return pageCount > 50 ? 50 : pageCount;
  }, [totalCount]);

  const handleChangePage = useCallback(
    (e, number) => {
      setSearchParams({ q: searchParams.get("q"), page: number });
    },
    [searchParams, setSearchParams]
  );

  useEffect(() => {
    const page = searchParams.get("page") ?? 1;
    setCurrentPage(parseInt(page));
  }, [searchParams]);

  if (loading) {
    return (
      <CircularProgress
        sx={{ marginLeft: "auto", marginRight: "auto", marginTop: "200px" }}
        size={100}
      />
    );
  } else {
    return (
      <>
        <Grid
          container
          spacing={{ xs: 2, sm: 2, md: 2 }}
          columns={{ xs: 2, sm: 3, md: 4 }}
          style={{ padding: "10px" }}
        >
          {users.map((user, index) => (
            <Grid item xs={1} sm={1} md={1} key={index}>
              <UserItem user={user} />
            </Grid>
          ))}
        </Grid>
        {totalCount === 0 ? null : (
          <Pagination
            sx={{ margin: "auto" }}
            page={currentPage}
            count={totalPageCount}
            color="primary"
            onChange={handleChangePage}
          />
        )}
      </>
    );
  }
}

export default UserGrid;
