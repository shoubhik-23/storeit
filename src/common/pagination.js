import React from "react";
import { Pagination } from "@material-ui/lab";
function PaginationComponent(props) {
  return (
    <div>
      <Pagination
        onChange={() => alert(45)}
        count={props.totalPage}
        variant="outlined"
      />
    </div>
  );
}

export default PaginationComponent;
