import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function PaginationComponent(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Pagination
        shape="rounded"
        size="medium"
        page={props.page}
        count={props.totalPage}
        variant="outlined"
        onChange={props.pageChange}
      />
    </div>
  );
}
