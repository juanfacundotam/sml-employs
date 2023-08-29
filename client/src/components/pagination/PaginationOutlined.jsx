import * as React from "react";
import { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import style from "./PaginationOutlined.module.css";

export default function PaginationOutlined({
  pageStyle,
  setPageStyle,
  cardXPage,
  data,
  pages,
  current,
}) {
  const [currentPage, setCurrentPage] = useState(pageStyle);
  const pageNumbers = [];

  useEffect(() => {
    setCurrentPage(current);
  }, [currentPage]);

  useEffect(() => {
    if (currentPage !== current) {
      setCurrentPage(1);
    }
  }, [currentPage, current]);

  for (let i = 1; i <= Math.ceil(data.length / cardXPage); i++) {
    pageNumbers.push(i);
  }

  const handleChangePage = (e, p) => {
    setPageStyle(p);
    pages(p);
    setCurrentPage(p);
  };

  return (
    <div className={`${style.textPagination} flex items-center justify-center`}>
      <Stack spacing={2} className="bg-[#39394B] mt-3 p-1 flex rounded-xl">
        <Pagination
          count={pageNumbers.length}
          color="primary"
          onChange={handleChangePage}
          page={currentPage}
          sx={{
            "& .Mui-selected": {
              backgroundColor: "#ae2dff",
              bgcolor: "#ae2dff",
            },
          }}
        />
      </Stack>
    </div>
  );
}
