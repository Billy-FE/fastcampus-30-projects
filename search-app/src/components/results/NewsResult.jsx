import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import ReactPaginate from "react-paginate";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import NoResult from "../NoResult";
import SearchTermRequired from "../SearchTermRequired";

function NewsResult() {
  const location = useLocation();
  const search = new URLSearchParams(location.search).get("q");
  const itemsPerPage = 10;
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  const { data, isLoading } = useQuery(
    ["newsResult", search],
    () =>
      axios
        .get(
          `https://google-search3.p.rapidapi.com/api/v1/news/q=${search}&num=50`,
          {
            headers: {
              "x-rapidapi-host": "google-search3.p.rapidapi.com",
              "x-rapidapi-key": "API KEY 입력",
            },
          }
        )
        .then((data) => data.data),
    {
      refetchOnWindowFocus: false,
      enabled: !!search,
      cacheTime: 0,
    }
  );

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(data?.entries?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil((data?.entries?.length ?? 0) / itemsPerPage));
  }, [itemOffset, data?.entries]);

  const handlePageClick = useCallback(
    (e) => {
      setItemOffset((e.selected * itemsPerPage) % data?.entries?.length);
    },
    [data?.entries]
  );

  if (!search) return <SearchTermRequired />;
  if (isLoading)
    return (
      <Oval
        ariaLabel="loading-indicator"
        height={100}
        width={100}
        strokeWidth={5}
        color="#22C55E"
        secondaryColor="white"
        wrapperClass="flex justify-center mt-52"
      />
    );

  return (
    <>
      <div className="flex flex-col justify-between flex-wrap m-auto items-start w-[700px]">
        {data?.entries?.length > 0 ? (
          currentItems?.map(
            ({ links, source, title, published_parsed }, index) => (
              <div
                key={index}
                className="mt-10 border-2 rounded-lg p-8 w-[700px]"
              >
                <a
                  href={links?.[0].href}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline"
                >
                  <p className="text-lg text-blue-700">{title}</p>
                </a>
                <div className="flex gap-3">
                  <a
                    href={source?.href}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:underline hover:text-blue-400"
                  >
                    {source?.href}
                  </a>
                </div>
                <p className="text-xs mt-5">
                  {new Date(...published_parsed).toLocaleString()}
                </p>
              </div>
            )
          )
        ) : (
          <NoResult />
        )}
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">>"
        previousLabel="<<"
        pageRangeDisplayed={10}
        pageLinkClassName="-ml-[1] text-[#22C55E] bg-slate-50 block border-solid border border-[#dee2e6] px-[0.75rem] py-[0.375rem] hover:z-[2] hover:text-[#22C55E] hover:bg-[#e9ecef] hover:border-[#dee2e6]"
        previousLinkClassName="text-[#22C55E] bg-slate-50 block border-solid border border-[#dee2e6] px-[0.75rem] py-[0.375rem] hover:z-[2] hover:text-[#22C55E] hover:bg-[#e9ecef] hover:border-[#dee2e6]"
        nextLinkClassName="-ml-[1] text-[#22C55E] bg-slate-50 block border-solid border border-[#dee2e6] px-[0.75rem] py-[0.375rem] hover:z-[2] hover:text-[#22C55E] hover:bg-[#e9ecef] hover:border-[#dee2e6]"
        breakLinkClassName="-ml-[1] text-[#22C55E] bg-slate-50 block border-solid border border-[#dee2e6] px-[0.75rem] py-[0.375rem] hover:z-[2] hover:text-[#22C55E] hover:bg-[#e9ecef] hover:border-[#dee2e6]"
        containerClassName="flex ml-auto mr-auto w-fit mt-10 pb-10 select-none"
        activeLinkClassName="z-[3] text-slate-50 bg-[#22C55E] border-[#22C55E] focus:text-[#e9ecef] focus:z-[3] focus:bg-[#22C55E] focus:outline-0 hover:z-[2] hover:text-[#22C55E] hover:bg-[#e9ecef] hover:border-[#dee2e6]"
        disabledLinkClassName="text-[#6c757d] pointer-events-none bg-slate-50 border-[#dee2e6] hover:z-[2] hover:text-[#22C55E] hover:bg-[#e9ecef] hover:border-[#dee2e6]"
        renderOnZeroPageCount={null}
        onPageChange={handlePageClick}
        pageCount={pageCount}
      />
    </>
  );
}

export default NewsResult;
