import { IconButton, TextField } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useSearchParams } from "react-router-dom";

function SearchInput() {
  const [text, setText] = useState("");
  const [searchParams, setSearchParams] = useSearchParams({});

  const onSubmit = useCallback(() => {
    if (text === "") return;
    setSearchParams({ q: text });
  }, [text, setSearchParams]);

  const onChange = useCallback((e) => {
    setText(e.target.value);
  }, []);

  const onKeyUp = useCallback(
    (e) => {
      if (e.key !== "Enter") return;
      onSubmit();
    },
    [onSubmit]
  );

  useEffect(() => {
    const query = searchParams.get("q");
    if (!query) return;
    setText(query);
  }, [searchParams]);

  return (
    <TextField
      label="Gihub User 입력"
      variant="outlined"
      sx={{ margin: "50px auto", width: "80%" }}
      value={text}
      onChange={onChange}
      onKeyUp={onKeyUp}
      InputProps={{
        endAdornment: (
          <IconButton type="button" onClick={onSubmit}>
            <SearchIcon />
          </IconButton>
        ),
      }}
    />
  );
}

export default SearchInput;
