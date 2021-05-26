import { Box } from "@material-ui/core";
import React, { useState } from "react";
import { style } from "./style";
const PaginationComponent = (props) => {
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(3);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
  const [currentPage, setcurrentPage] = useState(1);
  const pageNumberLimit = 3;
  const classes = style();
  const handleClick = (event) => {
    setcurrentPage(Number(event.target.id));
    props.pageChange(Number(event.target.id));
  };
  const pages = [];
  for (let i = 1; i <= props.totalPage; i++) {
    pages.push(i);
  }
  const renderPageNumbers = pages.map((number, k) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <Box display="flex" key={k}>
          <Box
            key={number}
            id={number}
            onClick={handleClick}
            className={currentPage === number ? classes.active : null}
            style={{ padding: "0 6px", fontSize: "10px", cursor: "pointer",display:'flex',placeItems:'center' }}
          >
            {number}
          </Box>
        </Box>
      );
    } else {
      return null;
    }
  });
  const handleNextbtn = () => {
    setcurrentPage(currentPage + 1);
    props.pageChange(currentPage + 1);
    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };
  const handlePrevbtn = () => {
    setcurrentPage(currentPage - 1);
    props.pageChange(currentPage - 1);
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };
  return (
    <Box display="flex" justifyContent="flex-end" padding="10px">
      <button
        className={classes.paginationButton}
        onClick={handlePrevbtn}
        disabled={currentPage === pages[0] ? true : false}
      >
        Prev
      </button>
      {renderPageNumbers}
      <button
        className={classes.paginationButton}
        onClick={handleNextbtn}
        disabled={currentPage === pages[pages.length - 1] ? true : false}
      >
        Next
      </button>
    </Box>
  );
};
export default PaginationComponent;
