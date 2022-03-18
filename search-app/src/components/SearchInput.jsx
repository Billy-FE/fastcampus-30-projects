import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function SearchInput() {
  const [searchText, setSearchText] = useState("");
  const [searchParams, setSerachParams] = useSearchParams();

  useEffect(() => {
    setSearchText(searchParams.get("q") ?? "");
  }, [searchParams]);

  const onChangeInput = useCallback((e) => {
    setSearchText(e.target.value);
  }, []);
  const onKeyUp = useCallback(
    (e) => {
      if (e.key === "Enter" && e.target.value.trim().length > 0) {
        setSerachParams({ q: e.target.value });
      }
    },
    [setSerachParams]
  );

  return (
    <input
      value={searchText}
      type="text"
      className="w-96 h-11 bg-slate-50 border outline-none p-6 text-black mt-10 shadow-md hover:shadow-lg"
      placeholder="검색어를 입력해 주세요."
      onChange={onChangeInput}
      onKeyUp={onKeyUp}
    />
  );
}

export default SearchInput;
